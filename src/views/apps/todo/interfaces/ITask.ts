import {IAttachment} from '../../../../domains/interfaces/IAttachment';
import {IComment} from '../../../../domains/interfaces/IComment';
import {IAssignedTo} from '../../../../domains/interfaces/IAssignedTo';
import {LabelColors} from '../../kanban/models/LabelColors';

export interface ITask {
    id: number;
    labels: LabelColors[];
    boardId: string;
    description: string;
    dueDate: Date;
    title: string;
    attachments: IAttachment[];
    comments: IComment[];
    assignedTo: IAssignedTo[];
    coverImage?: string;
}