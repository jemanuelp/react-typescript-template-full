import {IChat} from "./IChat";

export interface IChats {
    id: number;
    userId?: number;
    unseenMsgs: number;
    chat: IChat[];
    lastMessage?: IChat;
}