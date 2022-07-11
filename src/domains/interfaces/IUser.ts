import {IAbility} from './IAbility';
import {IExtra} from './IExtra';
import {IChats} from '../../views/apps/chat/interfaces/IChats';
import {IChatContact} from '../../views/apps/chat/interfaces/IChatContact';
import {ColorTypes} from '../../views/ui-elements/cards/models/ColorTypes';

export interface IUser {
    id?: number;
    fullName: string;
    username: string;
    password?: string;
    avatar?: string | null;
    avatarColor?: ColorTypes;
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