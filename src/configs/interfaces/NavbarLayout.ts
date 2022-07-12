import {NavbarLayoutTypes} from '../../domains/enums/NavbarLayoutTypes';

export interface NavbarLayout {
    type: NavbarLayoutTypes,
    backgroundColor?: string;
}