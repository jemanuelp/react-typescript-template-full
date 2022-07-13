import {Fragment} from 'react';
// import AppRoutes from './Apps';
// import FormRoutes from './Forms';
// import PagesRoutes from './Pages';
// import TablesRoutes from './Tables';
// import ChartsRoutes from './Charts';
import DashboardRoutes from './Dashboards';
// import UiElementRoutes from './UiElements';
import ExtensionsRoutes from './Extensions';
// import PageLayoutsRoutes from './PageLayouts';
import AuthenticationRoutes from './Authentication';

import BlankLayout from '../../@core/layouts/BlankLayout';
import LayoutWrapper from '../../@core/layouts/components/layout-wrapper';
import PrivateRoute from '../../@core/components/routes/PrivateRoute';
import PublicRoute from '../../@core/components/routes/PublicRoute';
import {RouteObject} from 'react-router/lib/router';
import {LayoutTypes} from '../../domains/enums/LayoutTypes';
import {isObjEmpty} from '../../utility/Utils';
import VerticalLayout from '../../layouts/VerticalLayout';
import HorizontalLayout from '../../layouts/HorizontalLayout';
import {Route} from '../../domains/interfaces/Route';

const getLayout = {
  blank: <BlankLayout/>,
  vertical: <VerticalLayout/>,
  horizontal: <HorizontalLayout/>,
};

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/dashboard/ecommerce';

// ** Merge Routes
const Routes: Route[] = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  // ...AppRoutes,
  // ...PagesRoutes,
  // ...UiElementRoutes,
  ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartsRoutes,
];

const getRouteMeta = (route: any) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return {routeMeta: route.meta};
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout: LayoutTypes, defaultLayout: LayoutTypes) => {
  const LayoutRoutes = new Array<RouteObject>();

  if (Routes) {
    Routes.filter((route: any) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
                (
                  (route.meta === undefined || route.meta.layout === undefined) &&
                    defaultLayout === layout
                )
      ) {
        let RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ?
            (isBlank = true) :
            (isBlank = false);
          RouteTag = route.meta.publicRoute ?
            PublicRoute :
            PrivateRoute;
        }
        if (route.element) {
          const Wrapper =
                        // eslint-disable-next-line multiline-ternary
                        isObjEmpty(route.element.props) && !isBlank ? // eslint-disable-next-line multiline-ternary
                          LayoutWrapper :
                          Fragment;

          route.element = (
            <Wrapper {...(!isBlank ?
              getRouteMeta(route) :
              {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout: LayoutTypes) => {
  const defaultLayout = layout || 'vertical';
  const layouts: LayoutTypes[] = ['vertical', 'horizontal', 'blank'];

  const AllRoutes = Array<RouteObject>();

  layouts.forEach((layoutItem: LayoutTypes) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export {DefaultRoute, TemplateTitle, Routes, getRoutes};
