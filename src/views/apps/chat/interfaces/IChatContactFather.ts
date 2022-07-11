import {StatusTypes} from '../../../ui-elements/cards/models/StatusTypes';

export interface IChatContactFather {
    id: number;
    fullName: string;
    avatar: string;
    status: StatusTypes;
}