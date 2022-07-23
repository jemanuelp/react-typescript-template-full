import { Badge, Card, CardBody } from 'reactstrap';
import AvatarGroup from '../../../@core/components/avatar-group';
import classnames from 'classnames';
import { Paperclip, MessageSquare } from 'react-feather';
import { useDispatch } from 'react-redux';
import { handleSelectTask } from './store';
import {ITask} from '../todo/interfaces/ITask';
import {LabelColors} from './models/LabelColors';

export type KanbanTaskProps = {
  task: ITask;
  index: number;
  labelColors: any;
  key: string;
  handleTaskSidebarToggle: Function;
}

const KanbanTasks = (props: KanbanTaskProps) => {
  const { task, labelColors, handleTaskSidebarToggle } = props;
  
  const dispatch = useDispatch();

  const handleTaskClick = () => {
    dispatch(handleSelectTask(task));
    handleTaskSidebarToggle();
  };

  const renderLabels = () => {
    if (task.labels.length) {
      return (
        <div className='mb-1'>
          {task.labels.map((label: LabelColors, index: number) => {
            const isLastChip = task.labels[task.labels.length - 1] === label;

            return (
              <Badge
                pill
                key={index}
                label={label}
                color={`light-${labelColors[label]}`}
                className={classnames({ 'me-75': !isLastChip })}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderAttachmentsComments = () => {
    if ((task.attachments && task.attachments.length) ||
        (task.comments && task.comments.length)) {
      return (
        <div className='d-flex align-items-center'>
          {task.attachments && task.attachments.length ?
            (
              <div className='d-flex align-items-center cursor-pointer me-75'>
                <Paperclip size={16} className='me-25' />
                <span>{task.attachments.length}</span>
              </div>
            ) :
            null}
          {task.comments && task.comments.length ?
            (
              <div className='d-flex align-items-center cursor-pointer'>
                <MessageSquare size={16} className='me-50' />
                <span>{task.comments.length}</span>
              </div>
            ) :
            null}
        </div>
      );
    } else {
      return null;
    }
  };

  const taskFooterClasses = () => {
    if (task.comments &&
        !task.comments.length &&
        task.attachments &&
        !task.attachments.length) {
      return 'justify-content-end';
    } else {
      return 'justify-content-between';
    }
  };

  const renderTaskFooter = () => {
    return (task.attachments && task.attachments.length) ||
      (task.comments && task.comments.length) ||
      (task.assignedTo && task.assignedTo.length) ?
      (
        <div className={`task-footer d-flex align-items-center mt-1 ${taskFooterClasses()}`}>
          {renderAttachmentsComments()}
          {task.assignedTo.length ?
            (
              <div>{task.assignedTo.length ?
                <AvatarGroup data={task.assignedTo} /> :
                null
              }</div>
            ) :
            null}
        </div>
      ) :
      null;
  };

  return (
    <Card onClick={handleTaskClick} className='task' data-board-id={task.boardId} data-task-id={task.id}>
      <CardBody data-task-id={task.id}>
        {renderLabels()}

        {task.coverImage ?
          (
            <img className='img-fluid rounded task-img mb-1' alt={task.title} src={task.coverImage} />
          ) :
          null}

        <span className='task-title'>{task.title}</span>

        {renderTaskFooter()}
      </CardBody>
    </Card>
  );
};

export default KanbanTasks;