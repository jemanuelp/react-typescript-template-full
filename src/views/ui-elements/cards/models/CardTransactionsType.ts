import {FC} from 'react';
import {IconProps} from 'react-feather';
import {ColorTypes} from './ColorTypes';

export type CardBrowserType = {
  title: string;
  color: ColorTypes;
  subtitle: string;
  amount: string;
  Icon: FC<IconProps>;
  down?: boolean;
}