import {ITask} from '../../todo/interfaces/ITask';
import {IBoard} from './IBoard';
import {SelectedOption} from '../../../../domains/interfaces/SelectedOption';

export type InitialStateKanban = {
  tasks: ITask[];
  boards: IBoard[];
  selectedTask: ITask | null;
}