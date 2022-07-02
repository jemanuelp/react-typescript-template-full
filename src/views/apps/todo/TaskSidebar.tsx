import {useState, Fragment} from 'react';
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import { Editor } from 'react-draft-wysiwyg';
import { X, Star, Trash } from 'react-feather';
import Select, { components } from 'react-select';
import {useForm, Controller} from 'react-hook-form';
import { EditorState, ContentState } from 'draft-js';
import { Modal, ModalBody, Button, Form, Input, Label, FormFeedback } from 'reactstrap';
import { isObjEmpty, selectThemeColors } from '../../../utility/Utils';
import img1 from '../../../../src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '../../../../src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '../../../../src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '../../../../src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '../../../../src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '../../../../src/assets/images/portrait/small/avatar-s-11.jpg';
import '../../../@core/scss/react/libs/editor/editor.scss';
import '../../../@core/scss/react/libs/flatpickr/flatpickr.scss';
import '../../../@core/scss/react/libs/react-select/_react-select.scss';
import {TaskSidebarPropTypes} from '../../../domains/proptypes/TaskSidebarPropTypes';
import {ISelectedOption} from '../../../domains/interfaces/ISelectedOption';
import {ITask2} from '../../../domains/interfaces/tasks/ITask2';

// ** Function to capitalize the first letter of string
const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

// ** Modal Header
const ModalHeader = (props: any) => {
  const {
    children,
    store,
    handleTaskSidebar,
    setDeleted,
    deleted,
    important,
    setImportant,
    deleteTask,
    dispatch,
  } = props;

  // ** Function to delete task
  const handleDeleteTask = () => {
    setDeleted(!deleted);
    dispatch(deleteTask(store.selectedTask.id));
    handleTaskSidebar();
  };

  return (
    <div className='modal-header d-flex align-items-center justify-content-between mb-1'>
      <h5 className='modal-title'>{children}</h5>
      <div className='todo-item-action d-flex align-items-center'>
        {store && !isObjEmpty(store.selectedTask) ?
          (
            <Trash className='cursor-pointer mt-25' size={16} onClick={() => handleDeleteTask()} />
          ) :
          null}
        <span className='todo-item-favorite cursor-pointer mx-75'>
          <Star
            size={16}
            onClick={() => setImportant(!important)}
            className={classnames({
              'text-warning': important === true,
            })}
          />
        </span>
        <X className='fw-normal mt-25' size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const TaskSidebar = (props: TaskSidebarPropTypes) => {
  const {
    open,
    handleTaskSidebar,
    store,
    dispatch,
    updateTask,
    selectTask,
    addTask,
    deleteTask,
  } = props;

  const [assignee, setAssignee] = useState<{
    value: string,
    label: string,
    img: string
  }>({
    value: 'pheobe',
    label: 'Pheobe Buffay',
    img: img1, 
  });
  const [tags, setTags] = useState<ISelectedOption[]>([]);
  const [desc, setDesc] = useState<EditorState | string>(EditorState.createEmpty());
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [dueDate, setDueDate] = useState<string | Date>(new Date());

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

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 },
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 'team', label: 'Team' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'update', label: 'Update' },
  ];

  // ** Custom Assignee Component
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

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Button
          outline
          size='sm'
          onClick={() => setCompleted(!completed)}
          color={completed ?
            'success' :
            'secondary'}
        >
          {completed ?
            'Completed' :
            'Mark Complete'}
        </Button>
      );
    } else {
      return 'Add Task';
    }
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    const { selectedTask } = store;
    if (!isObjEmpty(selectedTask)) {
      setValue('title', selectedTask.title);
      setCompleted(selectedTask.isCompleted);
      setImportant(selectedTask.isImportant);
      setAssignee({
        value: selectedTask.assignee.fullName,
        label: selectedTask.assignee.fullName,
        img: selectedTask.assignee.avatar,
      });
      setDueDate(selectedTask.dueDate);
      if (typeof selectedTask.description === 'string') {
        setDesc(EditorState.createWithContent(
          ContentState.createFromText(selectedTask.description),
        ));
      }

      if (selectedTask.tags.length) {
        const tags: ISelectedOption[] = [];
        selectedTask.tags.map(tag => {
          tags.push({ value: tag, label: capitalize(tag) });
        });
        setTags(tags);
      }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setTags([]);
    setDesc('');
    setValue('title', '');
    setAssignee({ value: 'pheobe', label: 'Pheobe Buffay', img: img1 });
    setCompleted(false);
    setImportant(false);
    setDueDate(new Date());
    selectTask({});
    clearErrors();
  };

  // ** Function to reset fields
  const handleResetFields = () => {
    if (typeof store.selectedTask.description === 'string') {
      const descValue = EditorState.createWithContent(
        ContentState.createFromText(store.selectedTask.description),
      );
      setDesc(descValue);
    }

    setValue('title', store.selectedTask.title);
    setCompleted(store.selectedTask.isCompleted);
    setImportant(store.selectedTask.isImportant);
    setDeleted(store.selectedTask.isDeleted);
    setDueDate(store.selectedTask.dueDate);
    if (store.selectedTask.assignee.fullName !== assignee.label) {
      setAssignee({
        value: store.selectedTask.assignee.fullName,
        label: store.selectedTask.assignee.fullName,
        img: store.selectedTask.assignee.avatar,
      });
    }
    if (store.selectedTask.tags.length) {
      const tags: ISelectedOption[] = [];
      store.selectedTask.tags.map(tag => {
        tags.push({ value: tag, label: capitalize(tag) });
      });
      setTags(tags);
    }
  };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Fragment>
          <Button color='primary' className='update-btn update-todo-item me-1'>
            Update
          </Button>
          <Button color='secondary' onClick={handleResetFields} outline>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button color='primary' className='add-todo-item me-1'>
            Add
          </Button>
          <Button color='secondary' onClick={handleTaskSidebar} outline>
            Cancel
          </Button>
        </Fragment>
      );
    }
  };

  const onSubmit = (data: any) => {
    const newTaskTag: string[] = [];

    const doesInclude = !isObjEmpty(store.selectedTask) &&
        assignee.label === store.selectedTask.assignee.fullName;

    if (tags.length) {
      tags.map(tag => newTaskTag.push(tag.value));
    }

    const newAssignee = {
      fullName: assignee.label,
      avatar: assignee.img,
    };
    const state: ITask2 = {
      id: 0,
      dueDate,
      title: data.title,
      tags: newTaskTag,
      description: desc,
      isCompleted: completed,
      isDeleted: deleted,
      isImportant: important,
      assignee: doesInclude ||
      assignee.label === undefined ?
        store.selectedTask.assignee :
        newAssignee,
    };

    if (data.title.length) {
      if (isObjEmpty(errors)) {
        if (
          isObjEmpty(store.selectedTask) ||
            (!isObjEmpty(store.selectedTask) &&
                !store.selectedTask.title.length)
        ) {
          dispatch(addTask(state));
        } else {
          dispatch(updateTask({ ...state, id: store.selectedTask.id }));
        }
        handleTaskSidebar();
      }
    } else {
      setError('title', {
        type: 'manual',
      });
    }
  };
  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName='modal-slide-in sidebar-todo-modal'
    >
      <Form id='form-modal-todo' className='todo-modal' onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          store={store}
          deleted={deleted}
          dispatch={dispatch}
          important={important}
          deleteTask={deleteTask}
          setDeleted={setDeleted}
          setImportant={setImportant}
          handleTaskSidebar={handleTaskSidebar}
        >
          {handleSidebarTitle()}
        </ModalHeader>
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
            {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='task-assignee'>
              Assignee
            </Label>
            <Select
              id='task-assignee'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={assigneeOptions}
              theme={selectThemeColors}
              value={assignee}
              onChange={(data: any) => setAssignee(data)}
              components={{ Option: AssigneeComponent }}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='due-date'>
              Due Date
            </Label>
            <Flatpickr
              id='due-date'
              name='due-date'
              className='form-control'
              onChange={date => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: 'Y-m-d' }}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='task-tags'>
              Tags
            </Label>
            <Select
              isMulti
              id='task-tags'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={tagOptions}
              theme={selectThemeColors}
              value={tags}
              onChange={data => {
                setTags(data !== null ? [...data] : []);
              }}
            />
          </div>
          <div className='mb-1'>
            <Label for='task-desc' className='form-label'>
              Description
            </Label>
            {
              desc instanceof EditorState && <Editor
                editorState={desc}
                wrapperClassName='toolbar-bottom'
                toolbar={{
                  options: ['inline', 'textAlign'],
                  inline: {
                    inDropdown: false,
                    options: ['bold', 'italic', 'underline'],
                  },
                }}
                onEditorStateChange={data => setDesc(data)}
              />
            }
          </div>
          <div>{renderFooterButtons()}</div>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default TaskSidebar;
