import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Badge } from 'reactstrap';
import {TableColumn} from 'react-data-table-component/dist/src/DataTable/types';
const colors = {
  support: 'light-info',
  user: 'light-success',
  manager: 'light-warning',
  administrator: 'light-primary',
  'restricted-user': 'light-danger',
};
export const columns: TableColumn<any>[] = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '350px',
    cell: ({ name }: any) => name,
    selector: (row: any) => row.name,
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'Assigned To',
    cell: ({ assignedTo }: any) => {
      if (assignedTo) {
        return assignedTo.map((assignee: any, index: any) => {
          const isLastBadge = assignedTo[assignedTo.length - 1] === index;
          return (
            <Link key={`${assignee}-${index}`} to='/apps/user/list' className={classnames({ 'me-50': !isLastBadge })}>
              <Badge pill color={colors[assignee as keyof typeof colors]} className='text-capitalize'>
                {assignee.replace('-', ' ')}
              </Badge>
            </Link>
          );
        });
      } else {
        return null;
      }
    },
  },
  {
    sortable: true,
    minWidth: '350px',
    name: 'Created Date',
    selector: (row: any) => row.createdDate,
    cell: ({ createdDate }: any) => createdDate,
    sortFunction: (rowA: any, rowB: any) => {
      return new Date(rowB.createdDate).getTime() - new Date(rowA.createdDate).getTime();
    },
  },
];
