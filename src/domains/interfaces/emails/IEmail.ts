import {ISender} from './ISender';
import {IAdressee} from '../IAdressee';
import {IAttachment} from '../IAttachment';

export interface IEmail {
    id: number;
    from: ISender;
    to: IAdressee[];
    subject: string;
    cc: string[];
    bcc: string[];
    message: string;
    attachments: IAttachment[];
    isStarred: boolean;
    labels: string[];
    time: string | Date;
    replies: IEmail[];
    folder: string;
    isRead: boolean;
    isDeleted?: boolean;
    hasPreviousMail?: boolean;
    hasNextMail?: boolean;
}