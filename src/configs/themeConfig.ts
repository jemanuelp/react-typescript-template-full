import {ToastPosition} from 'react-hot-toast';
import {LayoutTypes} from '../domains/enums/LayoutTypes';
import {ThemeConfig} from './interfaces/ThemeConfig';

const toastPosition: ToastPosition = 'top-right';

//Template config options
const themeConfig: ThemeConfig = {
  app: {
    appName: 'Vuexy',
    appLogoImage: require('../../src/assets/images/logo/logo.svg').default,
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white', // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static', // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition,
  },
};

export default themeConfig;
