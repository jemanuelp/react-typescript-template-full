import {IOrdersBarChart} from './IOrdersBarChart';
import {IProfitLineChart} from './IProfitLineChart';
import {ISubscribersGained} from './ISubscribersGained';
import {IRevenueGenerated} from './IRevenueGenerated';
import {IQuarterlySales} from './IQuarterlySales';
import {IOrdersRecevied} from './IOrdersRecevied';
import {ISiteTraffic} from './ISiteTraffic';
import {IActiveUsers} from './IActiveUsers';
import {INewsletter} from './INewsletter';

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