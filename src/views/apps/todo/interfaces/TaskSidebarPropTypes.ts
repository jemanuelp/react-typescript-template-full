import {ITaskState} from './ITaskState';
import {addTask, deleteTask, selectTask, updateTask} from '../store';
import {IFilter} from '../../../../domains/interfaces/IFilter';

export interface TaskSidebarPropTypes {
    store: ITaskState,
    params: IFilter;
    addTask: addTask;
    dispatch: any;
    open: boolean;
    updateTask: updateTask;
    selectTask: selectTask;
    deleteTask: deleteTask;
    handleTaskSidebar: () => void;
}