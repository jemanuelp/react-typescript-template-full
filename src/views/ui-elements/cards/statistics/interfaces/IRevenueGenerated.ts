import {IAnalyticsData} from './IAnalyticsData';
import {ISerie} from './ISerie';

export interface IRevenueGenerated {
    series: ISerie[];
    analyticsData: IAnalyticsData;
}