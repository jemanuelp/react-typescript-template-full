import {ISerie} from "./ISerie";

export interface ISubscribersGained {
    series: ISerie[];
    analyticsData: {
        subscribers: number;
    },
}