import {IChartInfoSessionsDevice} from "./IChartInfoSessionsDevice";

export interface ISessionsDevice {
    last_days: string[];
    chart_info: IChartInfoSessionsDevice[];
}