import {IAttachment} from "../IAttachment";
import {IComment} from "../IComment";
import {IAssignedTo} from "../IAssignedTo";

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