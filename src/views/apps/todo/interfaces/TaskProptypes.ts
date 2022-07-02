import {ITaskState} from './ITaskState';
import {ITask2} from './ITask2';
import {IFilter} from '../../../../domains/interfaces/IFilter';
import {getTasks, reOrderTasks, selectTask, updateTask} from '../store';
import {MouseEventHandler} from 'react';

export interface TaskProptypes {
    store: ITaskState;
    tasks: ITask2[];
    sort: string;
    query: string;
    params: IFilter;
    setSort: Function;
    setQuery: Function;
    dispatch: any;
    getTasks: getTasks;
    paramsURL: any;
    updateTask: updateTask;
    selectTask: selectTask;
    reOrderTasks: reOrderTasks;
    handleMainSidebar: MouseEventHandler;
    handleTaskSidebar: MouseEventHandler;
}