import {IChat} from './IChat';
import {StatusTypes} from '../../../ui-elements/cards/models/StatusTypes';

export interface IChats {
    id: number;
    userId?: number;
    unseenMsgs: number;
    chat: IChat[];
    lastMessage?: IChat;
    avatar?: string;
    status?: StatusTypes;
}