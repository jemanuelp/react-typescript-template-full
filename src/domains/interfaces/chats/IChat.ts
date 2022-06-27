import {IMessage} from "./IMessage";

export interface IChat {
    id?: number;
    senderId?: number;
    messages?: IMessage[];
    message?: string;
    time?: string | Date;
}