import {ITask2} from './ITask2';
import {IFilter} from '../IFilter';

export interface ITaskState {
    tasks: ITask2[],
    selectedTask: ITask2,
    params: IFilter,
}