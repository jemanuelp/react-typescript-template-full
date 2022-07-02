import {ISetting} from './ISetting';

export interface IProfileUser {
    id: number,
    avatar: string;
    fullName: string;
    role: string;
    about: string;
    status: string;
    settings: ISetting;
}