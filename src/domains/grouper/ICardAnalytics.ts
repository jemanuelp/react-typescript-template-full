import {IAvgSessions} from "../interfaces/cards-analytics/IAvgSessions";
import {ISupportTracker} from "../interfaces/cards-analytics/ISupportTracker";
import {IRevenueReport} from "../interfaces/cards-analytics/IRevenueReport";
import {IGoalOverview} from "../interfaces/cards-analytics/IGoalOverview";
import {IRevenue} from "../interfaces/cards-analytics/IRevenue";
import {IProductOrders} from "../interfaces/cards-analytics/IProductOrders";
import {ISessionsDevice} from "../interfaces/cards-analytics/ISessionsDevice";
import {ICustomers} from "../interfaces/cards-analytics/ICustomers";

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