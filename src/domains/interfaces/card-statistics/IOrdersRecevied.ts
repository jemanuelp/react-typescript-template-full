import {ISerie} from "./ISerie";
import {IAnalyticsData} from "./IAnalyticsData";

export interface IOrdersRecevied {
    series: ISerie[];
    analyticsData: IAnalyticsData;
}