import {lazy} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import BlankLayout from '../@core/layouts/BlankLayout';
import {useLayout} from '../utility/hooks/useLayout';
import {getHomeRouteForLoggedInUser, getUserData} from '../utility/Utils';
import {getRoutes} from './routes';

const Error = lazy(() => import('../views/pages/misc/Error'));
const Login = lazy(() => import('../views/pages/authentication/Login'));
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'));

const Router = () => {
    const {layout} = useLayout();

    const allRoutes = getRoutes(layout);
    const getHomeRoute = (): string => {
        const user = getUserData();
        if (user) {
            return getHomeRouteForLoggedInUser(user.role);
        } else {
            return '/login';
        }
    };

    return useRoutes([
        {
            path: '/',
            index: true,
            element: <Navigate replace to={getHomeRoute()}/>,
        },
        {
            path: '/login',
            element: <BlankLayout/>,
            children: [{path: '/login', element: <Login/>}],
        },
        {
            path: '/auth/not-auth',
            element: <BlankLayout/>,
            children: [{path: '/auth/not-auth', element: <NotAuthorized/>}],
        },
        {
            path: '*',
            element: <BlankLayout/>,
            children: [{path: '*', element: <Error/>}],
        }, ...allRoutes,
    ]);
};

export default Router;
