import {ReactElement} from 'react';
import {ColorsArr} from './ColorArray';

export type CompanyTableDataType = {
  img: string;
  name: string;
  email: string;
  icon: ReactElement;
  category: ColorsArr;
  views: string;
  time: string;
  revenue: string;
  sales: string;
  salesUp?: boolean;
}