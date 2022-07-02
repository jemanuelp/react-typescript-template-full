import {IAttachment} from '../../../../domains/interfaces/IAttachment';
import {IComment} from '../../../../domains/interfaces/IComment';
import {IAssignedTo} from '../../../../domains/interfaces/IAssignedTo';

export interface ITask {
    id: number;
    labels: string[],
    boardId: string;
    description: string;
    dueDate: number;
    title: string;
    attachments: IAttachment[];
    comments: IComment[];
    assignedTo: IAssignedTo[];
    coverImage?: string;
}