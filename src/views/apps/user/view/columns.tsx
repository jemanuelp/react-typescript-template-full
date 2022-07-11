import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../../../../src/@core/components/avatar';
import { UncontrolledTooltip } from 'reactstrap';
import {
  Eye,
  Send,
  Edit,
  Download,
  TrendingUp,
} from 'react-feather';
import {InvoiceStatus} from '../interfaces/InvoiceStatus';

export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: (row: any) => row.id,
    cell: (row: any) => <Link className='fw-bolder' to={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Link>,
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: '102px',
    sortable: true,
    sortField: 'invoiceStatus',
    selector: (row: any) => row.invoiceStatus,
    cell: (row: any) => {
      const color = InvoiceStatus[row.invoiceStatus as keyof typeof InvoiceStatus] ?
          InvoiceStatus[row.invoiceStatus as keyof typeof InvoiceStatus].color :
          'primary',
        Icon = InvoiceStatus[row.invoiceStatus as keyof typeof InvoiceStatus] ?
          InvoiceStatus[row.invoiceStatus as keyof typeof InvoiceStatus].icon :
          Edit;
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />}/>
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>{row.invoiceStatus}</span>
            <br />
            <span className='fw-bold'>Balance:</span> {row.balance}
            <br />
            <span className='fw-bold'>Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },

  {
    name: 'Total Paid',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    selector: (row: any) => row.total,
    cell: (row: any) => <span>${row.total || 0}</span>,
  },
  {
    minWidth: '200px',
    name: 'Issued Date',
    cell: (row: any) => row.dueDate,
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: (row: any) => (
      <div className='column-action d-flex align-items-center'>
        <Send className='text-body cursor-pointer' size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link className='text-body' to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download className='text-body cursor-pointer' size={17} id={`download-tooltip-${row.id}`} />
        <UncontrolledTooltip placement='top' target={`download-tooltip-${row.id}`}>
          Download Invoice
        </UncontrolledTooltip>
      </div>
    ),
  },
];
