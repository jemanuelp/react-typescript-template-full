import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';
import { Navbar, NavItem, Button } from 'reactstrap';
import NavbarComponent from './components/navbar';
import FooterComponent from './components/footer';
import MenuComponent from './components/menu/horizontal-menu';
import '../../@core/scss/base/core/menu/menu-types/horizontal-menu.scss';
import {useSkin} from '../../utility/hooks/useSkin';
import {useRTL} from '../../utility/hooks/useRTL';
import {useNavbarType} from '../../utility/hooks/useNavbarType';
import {useFooterType} from '../../utility/hooks/useFooterType';
import {useNavbarColor} from '../../utility/hooks/useNavbarColor';
import {useLayout} from '../../utility/hooks/useLayout';
import {RootState} from '../../redux/reducers/RootReducer';
import {handleContentWidth, handleMenuHidden} from '../../redux/layout';
import ScrollToTop from '../../@core/components/scrolltop';
import themeConfig from '../../configs/themeConfig';
import Customizer from '../components/customizer';
import {useRouterTransition} from '../../utility/hooks/useRouterTransition';
import {Layout} from '../../configs/interfaces/Layout';
import navigation from '../../navigation/horizontal';
import {ActionCreator} from '@reduxjs/toolkit';

export type HorizontalLayoutProps = {
  menuData: typeof navigation;
}

const HorizontalLayout = (props: any) => {
  const {
    navbar,
    menuData,
    footer,
    children,
    menu,
    routerProps,
    currentActiveItem,
  } = props;
  const { skin, setSkin } = useSkin();
  const { isRtl, setIsRtl } = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layoutType, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);
  const dispatch = useDispatch<ActionCreator<any>>();
  const layoutStore : Layout = useSelector((state: RootState) => state.layout);
  const contentWidth = layoutStore.contentWidth;
  const isHidden = layoutStore.menu.isHidden;
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val));
  const setIsHidden = (val: any) => dispatch(handleMenuHidden(val));

  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 65 && !navbarScrolled) {
        setNavbarScrolled(true);
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false);
      }
    });
    return () => cleanup();
  }, []);

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden',
  };

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden',
  };

  const navbarClasses = {
    floating: contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
  };

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper horizontal-layout horizontal-menu ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${
          footerClasses[footerType] || 'footer-static'
        } menu-expanded`,
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      <Navbar
        expand='lg'
        container={false}
        className={classnames('header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center', {
          'navbar-scrolled': navbarScrolled,
        })}
      >
        {!navbar && (
          <div className='navbar-header d-xl-block d-none'>
            <ul className='nav navbar-nav'>
              <NavItem>
                <Link to='/' className='navbar-brand'>
                  <span className='brand-logo'>
                    <img src={themeConfig.app.appLogoImage} alt='logo' />
                  </span>
                  <h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}

        <div className='navbar-container d-flex content'>
          {
            navbar ?
              navbar({ skin, setSkin }) :
              <NavbarComponent skin={skin} setSkin={setSkin}
              />
          }
        </div>
      </Navbar>
      {!isHidden ?
        (
          <div className='horizontal-menu-wrapper'>
            <Navbar
              tag='div'
              expand='sm'
              light={skin !== 'dark'}
              dark={skin === 'dark' || bgColorCondition}
              className={classnames('header-navbar navbar-horizontal navbar-shadow menu-border', {
                [navbarClasses[navbarType as keyof typeof navbarClasses]]: navbarType !== 'static',
                'floating-nav': (!navbarClasses[navbarType as keyof typeof navbarClasses] && navbarType !== 'static') || navbarType === 'floating',
              })}
            >
              {
                menu ?
                  menu({ menuData, routerProps, currentActiveItem }) :
                  <MenuComponent menuData={menuData}/>
              }
            </Navbar>
          </div>
        ) :
        null}

      {children}
      {themeConfig.layout.customizer === true ?
        (
          <Customizer
            skin={skin}
            setSkin={setSkin}
            isRTL={isRtl}
            setIsRtl={setIsRtl}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            layoutType={layoutType}
            setLayout={setLayout}
            setLastLayout={setLastLayout}
            footerType={footerType}
            setFooterType={setFooterType}
            navbarType={navbarType}
            setNavbarType={setNavbarType}
            contentWidth={contentWidth}
            setContentWidth={setContentWidth}
            navbarColor={navbarColor}
            setNavbarColor={setNavbarColor}
            transition={transition}
            setTransition={setTransition}
            themeConfig={themeConfig}
          />
        ) :
        null}
      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
          'd-none': footerType === 'hidden',
        })}
      >
        {
          footer ?
            footer :
            <FooterComponent />
        }
      </footer>

      {themeConfig.layout.scrollTop === true ?
        (
          <div className='scroll-to-top'>
            <ScrollToTop showOffset={300} className='scroll-top d-block'>
              <Button className='btn-icon' color='primary'>
                <ArrowUp size={14} />
              </Button>
            </ScrollToTop>
          </div>
        ) :
        null}
    </div>
  );
};

export default HorizontalLayout;
