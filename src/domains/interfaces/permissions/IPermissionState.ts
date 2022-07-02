import {IPermission} from './IPermission';

export interface IPermissionState {
    data: IPermission[];
    total: number;
    params: {};
    allData: [];
    selected: IPermission | null;
}