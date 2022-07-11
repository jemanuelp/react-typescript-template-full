import {ArrowDownCircle, CheckCircle, Info, PieChart, Save, Send} from 'react-feather';
import {ColorIcon} from './ColorIcon';

export const InvoiceStatus: {
  Sent: ColorIcon;
  Paid: ColorIcon;
  Draft: ColorIcon;
  Downloaded: ColorIcon;
  'Past Due': ColorIcon;
  'Partial Payment': ColorIcon;
} = {
  Sent: {color: 'light-secondary', icon: Send},
  Paid: {color: 'light-success', icon: CheckCircle},
  Draft: {color: 'light-primary', icon: Save},
  Downloaded: {color: 'light-info', icon: ArrowDownCircle},
  'Past Due': {color: 'light-danger', icon: Info},
  'Partial Payment': {color: 'light-warning', icon: PieChart},
};