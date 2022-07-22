import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../../../../@core/components/avatar';
import {store} from '../../../../redux/store';
import {deleteInvoice} from '../store';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from 'reactstrap';
import {
  Eye,
  Send,
  Edit,
  Copy,
  Trash,
  Download,
  TrendingUp,
  MoreVertical,
} from 'react-feather';
import {ColorTypes} from '../../../ui-elements/cards/models/ColorTypes';
import {InvoiceStatus} from '../../user/interfaces/InvoiceStatus';
import {IInvoice} from '../models/IInvoice';

// ** renders client column
const renderClient = (row: IInvoice) => {
  const stateNum = Math.floor(Math.random() * 6),
    states: ColorTypes[] = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum];

  if (row.avatar.length) {
    return <Avatar className='me-50' img={row.avatar} width={32} height={32}/>;
  } else {
    return <Avatar color={color} className='me-50' content={row.client ?
      row.client.name :
      'John Doe'} initials/>;
  }
};

export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    minWidth: '107px',
    selector: (row: IInvoice) => row.id,
    cell: (row: IInvoice) => <Link to={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Link>,
  },
  {
    sortable: true,
    minWidth: '102px',
    sortField: 'invoiceStatus',
    name: <TrendingUp size={14}/>,
    selector: (row: IInvoice) => row.invoiceStatus,
    cell: (row: IInvoice) => {
      const color = InvoiceStatus[
                    row.invoiceStatus as keyof typeof InvoiceStatus
        ] ?
          InvoiceStatus[
                        row.invoiceStatus as keyof typeof InvoiceStatus
          ].color :
          'primary',
        Icon = InvoiceStatus[
                    row.invoiceStatus as keyof typeof InvoiceStatus
        ] ?
          InvoiceStatus[
                        row.invoiceStatus as keyof typeof InvoiceStatus
          ].icon :
          Edit;
      return (
        <>
          <Avatar color={color} icon={<Icon size={14}/>} id={`av-tooltip-${row.id}`}/>
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <span className='fw-bold'>{row.invoiceStatus}</span>
            <br/>
            <span className='fw-bold'>Balance:</span> {row.balance}
            <br/>
            <span className='fw-bold'>Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </>
      );
    },
  },
  {
    name: 'Client',
    sortable: true,
    minWidth: '350px',
    sortField: 'client.name',
    selector: (row: IInvoice) => row.client.name,
    cell: (row: IInvoice) => {
      const name = row.client ?
          row.client.name :
          'John Doe',
        email = row.client ?
          row.client.companyEmail :
          'johnDoe@email.com';
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Total',
    sortable: true,
    minWidth: '150px',
    sortField: 'total',
    selector: (row: IInvoice) => row.total,
    cell: (row: IInvoice) => <span>${row.total || 0}</span>,
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Issued Date',
    sortField: 'dueDate',
    cell: (row: IInvoice) => row.dueDate,
    selector: (row: IInvoice) => row.dueDate,
  },
  {
    sortable: true,
    name: 'Balance',
    minWidth: '164px',
    sortField: 'balance',
    selector: (row: IInvoice) => row.balance,
    cell: (row: IInvoice) => {
      return row.balance !== 0 ?
        (
          <span>{row.balance}</span>
        ) :
        (
          <Badge color='light-success' pill>
                        Paid
          </Badge>
        );
    },
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: (row: IInvoice) => (
      <div className='column-action d-flex align-items-center'>
        <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.id}`}/>
        <UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>
                    Send Mail
        </UncontrolledTooltip>
        <Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1'/>
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
                    Preview Invoice
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer'/>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Download size={14} className='me-50'/>
              <span className='align-middle'>Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50'/>
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(deleteInvoice(row.id));
              }}
            >
              <Trash size={14} className='me-50'/>
              <span className='align-middle'>Delete</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Copy size={14} className='me-50'/>
              <span className='align-middle'>Duplicate</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
