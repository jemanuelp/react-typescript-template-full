import {SizeTypes} from '../enums/SizeTypes';

export interface SidebarPropTypes {
    className?: string;
    bodyClassName?: string;
    open: boolean,
    title: string;
    contentClassName?: string;
    wrapperClassName?: string;
    children: any;
    size?: SizeTypes;
    toggleSidebar: Function;
    width?: string | number;
    closeBtn?: string;
    headerClassName?: string;
    onClosed?: () => void;
}