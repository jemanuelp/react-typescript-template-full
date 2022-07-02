import {ITaskState} from '../interfaces/tasks/ITaskState';
import {IFilter} from '../interfaces/IFilter';
import {getTasks} from '../../views/apps/todo/store';
import {Dispatch, SetStateAction} from 'react';

export interface TodoSidebarProptypes {
    store: ITaskState;
    params: IFilter;
    getTasks: getTasks;
    dispatch: any;
    mainSidebar: boolean;
    urlFilter: string | undefined;
    setMainSidebar: Dispatch<SetStateAction<boolean>>;
    handleTaskSidebar: () => void;
}