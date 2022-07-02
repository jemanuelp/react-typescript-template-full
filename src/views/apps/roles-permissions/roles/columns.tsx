import { Link } from 'react-router-dom';
import Avatar from '../../../../@core/components/avatar';
import { store } from '../../../../redux/store';
import { getUser } from '../../user/store';
import { Slack, User, Settings, Database, Edit2, Eye } from 'react-feather';
import { Badge } from 'reactstrap';

// ** Renders Client Columns
const renderClient = (row: any) => {
  if (row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />;
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        content={row.fullName || 'John Doe'}
        color={row.avatarColor || 'light-primary'}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row: any) => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User,
    },
    maintainer: {
      class: 'text-success',
      icon: Database,
    },
    editor: {
      class: 'text-info',
      icon: Edit2,
    },
    author: {
      class: 'text-warning',
      icon: Settings,
    },
    admin: {
      class: 'text-danger',
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role as keyof typeof roleObj] ?
    roleObj[row.role as keyof typeof roleObj].icon :
    Edit2;

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={
        `${roleObj[row.role as keyof typeof roleObj] ? 
          roleObj[row.role as keyof typeof roleObj].class : 
          ''
        } me-50`} />
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary',
};

export const columns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '297px',
    sortField: 'fullName',
    selector: (row: any) => row.fullName,
    cell: (row: any) => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bold'>{row.fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: (row: any) => row.role,
    cell: (row: any) => renderRole(row),
  },
  {
    name: 'Plan',
    sortable: true,
    minWidth: '138px',
    sortField: 'currentPlan',
    selector: (row: any) => row.currentPlan,
    cell: (row: any) => <span className='text-capitalize'>{row.currentPlan}</span>,
  },
  {
    name: 'Billing',
    sortable: true,
    minWidth: '230px',
    sortField: 'billing',
    selector: (row: any) => row.billing,
    cell: (row: any) => <span className='text-capitalize'>{row.billing}</span>,
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '138px',
    sortField: 'status',
    selector: (row: any) => row.status,
    cell: (row: any) => (
      <Badge className='text-capitalize' color={statusObj[row.status as keyof typeof statusObj]} pill>
        {row.status}
      </Badge>
    ),
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: (row: any) => (
      <Link to={`/apps/user/view/${row.id}`}>
        <Eye className='font-medium-3 text-body' />
      </Link>
    ),
  },
];
