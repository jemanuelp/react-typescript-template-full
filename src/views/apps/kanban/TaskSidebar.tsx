import {MouseEventHandler, useState} from 'react';
import { Badge, Modal, ModalBody, Button, Form, Input, Label, FormFeedback } from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { useDropzone } from 'react-dropzone';
import { X, DownloadCloud } from 'react-feather';
import Select, { components } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { updateTask, handleSelectTask } from './store';
import { selectThemeColors } from '../../../utility/Utils';
import '../../../@core/scss/react/libs/flatpickr/flatpickr.scss';
import '../../../@core/scss/react/libs/react-select/_react-select.scss';
import '../../../@core/scss/react/libs/file-uploader/file-uploader.scss';
import {SelectedOption} from '../../../domains/interfaces/SelectedOption';
import {LabelColorClass, LabelColors} from './models/LabelColors';
import {ITask} from '../todo/interfaces/ITask';
import {assigneeOptions} from './models/AsigneeOptions';
import {labelOptions} from './models/LabelOptions';
import {SelectedOptionImg} from '../../../domains/interfaces/SelectedOptionImg';
import {InitialStateKanban} from './models/InitialStateKanban';
import {RootState} from '../../../redux/reducers/RootReducer';
import {SelectedOptionLabelColors} from '../../../domains/interfaces/SelectedOptionLabelColors';

export type TaskSidebarProps = {
  sidebarOpen: boolean;
  labelColors: LabelColorClass;
  selectedTask: ITask | null;
  handleTaskSidebarToggle: any;
}

const TaskSidebar = (props: TaskSidebarProps) => {
  const { sidebarOpen, labelColors, selectedTask, handleTaskSidebarToggle } = props;

  const store: InitialStateKanban = useSelector((state: RootState) => state.kanban);
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<({ name: string } | File | string)[]>([]);
  const [labels, setLabels] = useState<SelectedOptionLabelColors[]>([]);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [assignedTo, setAssignedTo] = useState<SelectedOptionImg[]>([]);
  
  const dispatch = useDispatch<any>();
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles([...acceptedFiles.map(file => Object.assign(file))]);
    },
  });

  const {
    control,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
  });

  // ** Custom Select Components
  const LabelOptions = ({ data, ...props }: any) => {
    return (
      <components.Option {...props}>
        <Badge color={`light-${labelColors[data.label as LabelColors]}`}>{data.label}</Badge>
      </components.Option>
    );
  };

  const AssigneeComponent = ({ data, ...props }: any) => {
    return (
      <components.Option {...props}>
        <div className='d-flex align-items-center'>
          <img className='d-block rounded-circle me-50' src={data.img} height='26' width='26' alt={data.label} />
          <p className='mb-0'>{data.label}</p>
        </div>
      </components.Option>
    );
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    if (selectedTask !== null) {
      setValue('title', selectedTask.title);
      setDueDate(selectedTask.dueDate);
      setDesc(selectedTask.description);
      if (selectedTask.coverImage) {
        setFiles([selectedTask.coverImage]);
      }
      if (selectedTask.assignedTo.length) {
        const arr: SelectedOptionImg[] = [];
        selectedTask.assignedTo.map(assignee => {
          arr.push({ value: assignee.title, label: assignee.title, img: assignee.img });
        });
        setAssignedTo(arr);
      }
      if (selectedTask.labels.length) {
        const labelsArr: SelectedOptionLabelColors[] = [];
        selectedTask.labels.map(label => {
          labelsArr.push({ value: label, label });
        });
        setLabels(labelsArr);
      }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setDesc('');
    setFiles([]);
    setLabels([]);
    setValue('title', '');
    setDueDate(new Date());
    clearErrors();
    dispatch(handleSelectTask({}));
    setAssignedTo([]);
  };

  const onSubmit = (data: { title: string }) => {
    if (data.title.length) {
      const labelsArr: string[]  = [];
      const assignedArr: { title: string, img: string }[] = [];

      if (assignedTo.length) {
        assignedTo.map(item => {
          assignedArr.push({ title: item.label, img: item.img });
        });
      }

      if (labels.length) {
        labels.map(label => {
          labelsArr.push(labelColors[label.label]);
        });
      }

      dispatch(
        updateTask({
          ...selectedTask,
          ...data,
          dueDate,
          labels: labelsArr,
          description: desc,
          assignedTo: assignedArr,
          ...(files.length && files[0] instanceof File ?
            {
              coverImage: URL.createObjectURL(files[0]),
            } :
            {}),
        }),
      );
      handleTaskSidebarToggle();
    } else {
      setError('title', {});
    }
  };

  const renderUploadedImage = () => {
    if (files.length && typeof files[0] !== 'string') {
      return files.map((file: any) => (
        <img key={file.name} alt={file.name} className='single-file-image img-fluid' src={URL.createObjectURL(file)} />
      ));
    } else {
      if (typeof files[0] === 'string') {
        return <img alt='task-img' className='single-file-image img-fluid' src={files[0]} />;
      }
    }
  };

  const handleResetFields = () => {
    setDesc('');

    if (store.selectedTask) {
      setValue('title', store.selectedTask.title);
      setDueDate(store.selectedTask.dueDate);
    }
    if (selectedTask && selectedTask.assignedTo.length) {
      const arr: SelectedOptionImg[] = [];
      selectedTask.assignedTo.map(assignee => {
        arr.push({ value: assignee.title, label: assignee.title, img: assignee.img });
      });

      setAssignedTo(arr);
    }
    if (selectedTask && selectedTask.labels.length) {
      const labels: SelectedOptionLabelColors[] = [];
      selectedTask.labels.map(label => {
        labels.push({ value: label, label });
      });
      setLabels(labels);
    }

    if (selectedTask && selectedTask.coverImage) {
      setFiles([selectedTask.coverImage]);
    } else {
      setFiles([]);
    }
  };

  return (
    <Modal
      isOpen={sidebarOpen}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      toggle={handleTaskSidebarToggle}
      modalClassName='modal-slide-in sidebar-kanban-modal'
    >
      <Form id='form-modal-kanban' className='kanban-task-modal' onSubmit={handleSubmit(onSubmit)}>
        <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
          <h5 className='modal-title'>Update Task</h5>
          <X className='fw-normal mt-25' size={16} onClick={handleTaskSidebarToggle} />
        </div>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
            <div className='mb-1'>
              <Label className='form-label' for='task-title'>
                Title <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Input
                    id='task-title'
                    placeholder='Title'
                    className='new-todo-item-title'
                    invalid={errors.title && true}
                    {...field}
                  />
                )}
              />
              {
                errors.title &&
                  <FormFeedback>Please enter a valid task title</FormFeedback>
              }
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='due-date'>
                Due Date
              </Label>
              <Flatpickr
                id='due-date'
                name='due-date'
                value={dueDate}
                className='form-control'
                options={{ dateFormat: 'Y-m-d' }}
                onChange={date => setDueDate(date[0])}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='task-labels'>
                Labels
              </Label>
              <Select
                isMulti
                value={labels}
                id='task-labels'
                isClearable={false}
                options={labelOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                components={{ Option: LabelOptions }}
                onChange={data => {
                  setLabels(data !== null ?
                    [...data] :
                    [],
                  );
                }}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='task-assignee'>
                Assignee
              </Label>
              <Select
                isMulti
                id='task-assignee'
                value={assignedTo}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={assigneeOptions}
                theme={selectThemeColors}
                onChange={data => setAssignedTo(data.map(item => (
                  { value: item.value, label: item.label, img: item.img }
                )))}
                components={{ Option: AssigneeComponent }}
              />
            </div>
            <div className='mb-1'>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className='d-flex align-items-center justify-content-center flex-column text-center'>
                  <DownloadCloud size={64} />
                  <h5>Drop Files here or click to upload</h5>
                </div>
                {files.length ?
                  renderUploadedImage() :
                  null}
              </div>
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='task-desc'>
                Description
              </Label>
              <Input
                type='textarea'
                value={desc}
                name='text'
                id='task-desc'
                rows='3'
                placeholder='Description...'
                onChange={e => setDesc(e.target.value)}
              />
            </div>
            <div>
              <Button type='submit' color='primary' className='me-1'>
                Update
              </Button>
              <Button outline color='secondary' onClick={handleResetFields}>
                Reset
              </Button>
            </div>
          </ModalBody>
        </PerfectScrollbar>
      </Form>
    </Modal>
  );
};

export default TaskSidebar;
