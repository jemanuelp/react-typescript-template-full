import {IAbility} from './IAbility';
import {IExtra} from './IExtra';
import {IChats} from '../grouper/IChats';
import {IChatContact} from './chats/IChatContact';

export interface IUser {
    id?: number;
    fullName: string;
    username: string;
    password?: string;
    avatar?: string | null;
    avatarColor?: string;
    email: string;
    role: string;
    ability?: IAbility[];
    extras?: IExtra;
    currentPlan?: string;
    billing?: string;
    status?: string;
    company?: string;
    contact?: IChatContact | string;
    country?: string | null;
    chat?: IChats[];
}