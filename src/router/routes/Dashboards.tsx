import { lazy } from 'react';
import {Route} from '../../domains/interfaces/Route';

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'));
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'));

const DashboardRoutes: Route[] = [
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />,
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />,
  },
];

export default DashboardRoutes;
