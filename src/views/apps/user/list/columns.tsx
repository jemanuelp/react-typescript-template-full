import { Link } from 'react-router-dom';
import Avatar from '../../../../@core/components/avatar';
import { store } from '../../../../redux/store';
import { getUser, deleteUser } from '../store';
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather';

import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// ** Renders Client Columns
const renderClient = (row: any) => {
  if (row.avatar && row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />;
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={(row.avatarColor && row.avatarColor) || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row: any) => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  };

  const validRole =  row.role as keyof typeof roleObj;
  const Icon = roleObj[validRole] ? roleObj[validRole].icon : Edit2;

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[validRole] ? roleObj[validRole].class : ''} me-50`} />
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
};

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: (row: any) => row.fullName,
    cell: (row: any) => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id ?? 0))}
          >
            <span className='fw-bolder'>{row.fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: (row: any) => row.role,
    cell: (row: any) => renderRole(row)
  },
  {
    name: 'Plan',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: (row: any) => row.currentPlan,
    cell: (row: any) => <span className='text-capitalize'>{row.currentPlan}</span>
  },
  {
    name: 'Billing',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: (row: any) => row.billing,
    cell: (row: any) => <span className='text-capitalize'>{row.billing}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: (row: any) => row.status,
    cell: (row: any) => (
      <Badge className='text-capitalize' color={statusObj[row.status as keyof typeof statusObj]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row: any) => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id ?? 0))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(deleteUser(row.id ?? 0));
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
];
