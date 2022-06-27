import {Fragment} from 'react';
import AppRoutes from './Apps';
import FormRoutes from './Forms';
import PagesRoutes from './Pages';
import TablesRoutes from './Tables';
import ChartsRoutes from './Charts';
import DashboardRoutes from './Dashboards';
import UiElementRoutes from './UiElements';
import ExtensionsRoutes from './Extensions';
import PageLayoutsRoutes from './PageLayouts';
import AuthenticationRoutes from './Authentication';

import {isObjEmpty} from '../../utility/Utils';
import BlankLayout from "../../@core/layouts/BlankLayout";
import VerticalLayout from "../../@core/layouts/VerticalLayout";
import HorizontalLayout from "../../@core/layouts/HorizontalLayout";
import LayoutWrapper from "../../@core/layouts/components/layout-wrapper";
import PrivateRoute from "../../@core/components/routes/PrivateRoute";
import PublicRoute from "../../@core/components/routes/PublicRoute";
import {RouteObject} from "react-router/lib/router";
import {LayoutTypes} from "../../domains/enums/LayoutTypes";

const getLayout: Map<LayoutTypes, any[]> = new Map<LayoutTypes, any[]>();
getLayout.set(LayoutTypes.blank, [BlankLayout]);
getLayout.set(LayoutTypes.vertical, [VerticalLayout]);
getLayout.set(LayoutTypes.horizontal, [HorizontalLayout]);

const TemplateTitle = '%s - Vuexy React Admin Template';

const DefaultRoute = '/dashboard/ecommerce';

const Routes = [
    ...AuthenticationRoutes,
    ...DashboardRoutes,
    // ...AppRoutes,
    // ...PagesRoutes,
    // ...UiElementRoutes,
    // ...ExtensionsRoutes,
    // ...PageLayoutsRoutes,
    // ...FormRoutes,
    // ...TablesRoutes,
    // ...ChartsRoutes
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

const MergeLayoutRoutes = (layout: LayoutTypes, defaultLayout: LayoutTypes) => {
    const LayoutRoutes = new Array<RouteObject>();

    if (Routes) {
        Routes.filter((route: any) => {
            let isBlank = false;
            // ** Checks if Route layout or Default layout matches current layout
            if (
                (route.meta && route.meta.layout && route.meta.layout === layout) ||
                ((
                    route.meta === undefined ||
                    route.meta.layout === undefined
                ) && defaultLayout === layout)
            ) {
                let RouteTag = PrivateRoute;

                // ** Check for public or private route
                if (route.meta) {
                    route.meta.layout === 'blank'
                        ? (isBlank = true)
                        : (isBlank = false);
                    RouteTag = route.meta.publicRoute
                        ? PublicRoute
                        : PrivateRoute;
                }
                if (route.element) {
                    const Wrapper =
                        isObjEmpty(route.element.props) && !isBlank
                            ? LayoutWrapper
                            : Fragment;

                    route.element = (
                        <Wrapper {...(!isBlank
                            ? getRouteMeta(route)
                            : {})}>
                            <RouteTag route={route}>{route.element}</RouteTag>
                        </Wrapper>
                    );
                }

            }
            return LayoutRoutes;
        });
    }
    return LayoutRoutes;
};

const getRoutes = (layout: LayoutTypes) => {
    const defaultLayout = layout || LayoutTypes.vertical;
    const layouts: LayoutTypes[] = [
        LayoutTypes.vertical,
        LayoutTypes.horizontal,
        LayoutTypes.blank,
    ];

    const AllRoutes = Array<RouteObject>();

    layouts.forEach((layoutItem: LayoutTypes) => {
        const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

        AllRoutes.push({
            path: '/',
            element: getLayout.has(layoutItem)
                ? getLayout.get(layoutItem)
                : getLayout.get(defaultLayout),
            children: LayoutRoutes,
        });
    });
    return AllRoutes;
};

export {DefaultRoute, TemplateTitle, Routes, getRoutes};
