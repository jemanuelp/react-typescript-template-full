import {ITaskState} from './ITaskState';
import {IFilter} from '../../../../domains/interfaces/IFilter';
import {getTasks} from '../store';
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