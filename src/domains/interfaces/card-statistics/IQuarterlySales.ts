import {ISerie} from './ISerie';
import {IAnalyticsData} from './IAnalyticsData';

export interface IQuarterlySales {
    series: ISerie[];
    analyticsData: IAnalyticsData;
}