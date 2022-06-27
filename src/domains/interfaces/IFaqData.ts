import {IQandA} from "./IQandA";
import {FC} from "react";
import {IconProps} from "react-feather";

export interface IFaqData {
    icon: string | FC<IconProps>;
    title: string;
    subtitle: string;
    qandA: IQandA[];
}