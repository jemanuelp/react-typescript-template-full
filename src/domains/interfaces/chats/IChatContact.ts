import {IChats} from "../../grouper/IChats";
import {IChatContactFather} from "./IChatContactFather";

export interface IChatContact extends IChatContactFather{
    role: string;
    about: string;
    chat?: IChats;
}