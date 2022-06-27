import {IAvgSessions} from '../interfaces/card-analytics/IAvgSessions';
import {ISupportTracker} from '../interfaces/card-analytics/ISupportTracker';
import {IRevenueReport} from '../interfaces/card-analytics/IRevenueReport';
import {IGoalOverview} from '../interfaces/card-analytics/IGoalOverview';
import {IRevenue} from '../interfaces/card-analytics/IRevenue';
import {IProductOrders} from '../interfaces/card-analytics/IProductOrders';
import {ISessionsDevice} from '../interfaces/card-analytics/ISessionsDevice';
import {ICustomers} from '../interfaces/card-analytics/ICustomers';

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