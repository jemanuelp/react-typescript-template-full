import {IItem} from './IItem';

export interface INavbar {
    groupTitle: string;
    searchLimit: number;
    data: IItem[];
}