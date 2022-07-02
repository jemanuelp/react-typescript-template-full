import {IAvgSessions} from './IAvgSessions';
import {ISupportTracker} from './ISupportTracker';
import {IRevenueReport} from './IRevenueReport';
import {IGoalOverview} from './IGoalOverview';
import {IRevenue} from './IRevenue';
import {IProductOrders} from './IProductOrders';
import {ISessionsDevice} from './ISessionsDevice';
import {ICustomers} from './ICustomers';

export interface ICardAnalytics {
    support_tracker: ISupportTracker;
    avg_sessions: IAvgSessions;
    revenue_report: IRevenueReport;
    goal_overview: IGoalOverview;
    revenue: IRevenue;
    product_orders: IProductOrders;
    sessions_device: ISessionsDevice;
    customers: ICustomers;
}