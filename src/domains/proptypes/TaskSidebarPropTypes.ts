import {ITaskState} from '../interfaces/tasks/ITaskState';
import {AnyAction, Dispatch} from 'redux';
import {addTask, deleteTask, selectTask, updateTask} from '../../views/apps/todo/store';
import {IFilter} from '../interfaces/IFilter';
import {AsyncThunkAction} from '@reduxjs/toolkit';

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