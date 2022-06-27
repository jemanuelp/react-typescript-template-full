import {ISerie} from "./ISerie";

export interface IProfitLineChart {
    title: string;
    statistics: string;
    series: ISerie[],
}