import {IAbility} from "./IAbility";
import {IExtra} from "./IExtra";

export interface IUser {
    id?: number;
    fullName: string;
    username: string;
    password?: string;
    avatar?: string | null;
    email: string;
    role: string;
    ability: IAbility[];
    extras?: IExtra;
}