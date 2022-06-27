import {IOrdersBarChart} from "../interfaces/card-statistics/IOrdersBarChart";
import {IProfitLineChart} from "../interfaces/card-statistics/IProfitLineChart";
import {ISubscribersGained} from "../interfaces/card-statistics/ISubscribersGained";
import {IRevenueGenerated} from "../interfaces/card-statistics/IRevenueGenerated";
import {IQuarterlySales} from "../interfaces/card-statistics/IQuarterlySales";
import {IOrdersRecevied} from "../interfaces/card-statistics/IOrdersRecevied";
import {ISiteTraffic} from "../interfaces/card-statistics/ISiteTraffic";
import {IActiveUsers} from "../interfaces/card-statistics/IActiveUsers";
import {INewsletter} from "../interfaces/card-statistics/INewsletter";

export interface ICardStatistics {
    orders_bar_chart: IOrdersBarChart;
    profit_line_chart: IProfitLineChart;
    subscribers_gained: ISubscribersGained;
    revenueGenerated: IRevenueGenerated;
    quarterlySales: IQuarterlySales;
    ordersRecevied: IOrdersRecevied;
    siteTraffic: ISiteTraffic;
    activeUsers: IActiveUsers;
    newsletter: INewsletter;
}