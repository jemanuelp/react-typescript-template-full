import {LayoutTypes} from '../../domains/enums/LayoutTypes';
import {SkinTypes} from '../../domains/enums/SkinTypes';
import {RouterTransitionTypes} from '../../domains/enums/RouterTransitionTypes';
import {TypeContentWidthTypes} from './ContentWidthTypes';
import {MenuLayout} from './MenuLayout';
import {NavbarLayout} from './NavbarLayout';
import {ToastPosition} from 'react-hot-toast';
import {FooterLayout} from './FooterLayout';

export interface Layout {
    isRTL: boolean;
    skin: SkinTypes,
    routerTransition: RouterTransitionTypes,
    type: LayoutTypes,
    contentWidth: TypeContentWidthTypes,
    menu: MenuLayout,
    navbar: NavbarLayout,
    footer: FooterLayout,
    customizer?: boolean,
    scrollTop?: boolean,
    toastPosition?: ToastPosition,
    lastLayout?: LayoutTypes
}