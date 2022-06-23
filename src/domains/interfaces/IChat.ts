import {IMessage} from "./IMessage";

export interface IChat {
    senderId: number;
    messages: IMessage[];
}