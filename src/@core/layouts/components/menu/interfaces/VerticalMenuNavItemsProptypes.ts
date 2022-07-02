import {IItems} from '../../../../../domains/interfaces/nav-menu-items/IItems';

export interface VerticalMenuNavItemsProptypes {
    activeItem: any;
    currentActiveGroup: any[];
    groupActive: any[];
    groupOpen: any[];
    items: IItems[];
    menuCollapsed: boolean;
    menuData: any[];
    menuHover: boolean;
    setActiveItem: Function;
    setCurrentActiveGroup: Function;
    setGroupActive: Function;
    setGroupOpen: Function;
}