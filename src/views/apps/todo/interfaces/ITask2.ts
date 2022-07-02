import {EditorState} from 'draft-js';
import {ItemInterface} from 'react-sortablejs';

export interface ITask2 extends ItemInterface {
    title: string;
    dueDate: string | Date;
    description: string | EditorState;
    assignee: {
        fullName: string;
        avatar: string;
    };
    tags: string[];
    isCompleted: boolean;
    isDeleted: boolean;
    isImportant: boolean;
}