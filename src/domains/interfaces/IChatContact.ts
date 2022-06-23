import {IChats} from "./IChats";

export interface IChatContact {
    id: number;
    fullName: string;
    role: string;
    about: string;
    avatar: string;
    status: string;
    chat?: IChats;
}