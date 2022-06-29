import {LayoutTypes} from '../../enums/LayoutTypes';
import {SkinTypes} from '../../enums/SkinTypes';
import {TypeRouterTransitionTypes} from '../../enums/RouterTransitionTypes';
import {TypeContentWidthTypes} from '../../enums/ContentWidthTypes';
import {MenuLayout} from './MenuLayout';
import {NavbarLayout} from './NavbarLayout';
import {ToastPosition} from 'react-hot-toast';
import {FooterLayout} from '../FooterLayout';

export interface Layout {
    isRTL: boolean;
    skin: SkinTypes,
    routerTransition: TypeRouterTransitionTypes,
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