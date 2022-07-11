import {ISender} from './ISender';
import {IAdressee} from '../../../../domains/interfaces/IAdressee';
import {IAttachment} from '../../../../domains/interfaces/IAttachment';
import {LabelColor} from './Colors';

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
    labels: LabelColor[];
    time: string | Date;
    replies: IEmail[];
    folder: string;
    isRead: boolean;
    isDeleted?: boolean;
    hasPreviousMail?: boolean;
    hasNextMail?: boolean;
}