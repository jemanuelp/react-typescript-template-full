import { Card, CardHeader, Progress } from 'reactstrap';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import Avatar from '../../../../@core/components/avatar';
import '../../../../@core/scss/react/libs/tables/react-dataTable-component.scss';
import {IProject} from '../../../../domains/interfaces/IProject';

const projectsArr: IProject[] = [
  {
    progress: 60,
    hours: '210:30h',
    progressColor: 'info',
    totalTasks: '233/240',
    subtitle: 'React Project',
    title: 'BGC eCommerce App',
    img: require('../../../../../src/assets/images/icons/brands/react-label.png'),
  },
  {
    hours: '89h',
    progress: 15,
    totalTasks: '9/50',
    progressColor: 'danger',
    subtitle: 'UI/UX Project',
    title: 'Falcon Logo Design',
    img: require('../../../../../src/assets/images/icons/brands/xd-label.png'),
  },
  {
    progress: 90,
    hours: '129:45h',
    totalTasks: '100/190',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Dashboard Design',
    img: require('../../../../../src/assets/images/icons/brands/vue-label.png'),
  },
  {
    hours: '45h',
    progress: 49,
    totalTasks: '12/86',
    progressColor: 'warning',
    subtitle: 'iPhone Project',
    title: 'Foodista mobile app',
    img: require('../../../../../src/assets/images/icons/brands/sketch-label.png'),
  },
  {
    progress: 73,
    hours: '67:10h',
    totalTasks: '234/378',
    progressColor: 'info',
    subtitle: 'React Project',
    title: 'Dojo React Project',
    img: require('../../../../../src/assets/images/icons/brands/react-label.png'),
  },
  {
    progress: 81,
    hours: '108:39h',
    totalTasks: '264/537',
    title: 'HTML Project',
    progressColor: 'success',
    subtitle: 'Crypto Website',
    img: require('../../../../../src/assets/images/icons/brands/html-label.png'),
  },
  {
    progress: 78,
    hours: '88:19h',
    totalTasks: '214/627',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Vue Admin template',
    img: require('../../../../../src/assets/images/icons/brands/vue-label.png'),
  },
];

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Project',
    selector: (row: IProject) => row.title,
    cell: (row: IProject) => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
            <small className='text-muted'>{row.subtitle}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: 'Total Tasks',
    selector: (row: IProject) => row.totalTasks,
  },
  {
    name: 'Progress',
    selector: (row: IProject) => row.progress,
    sortable: true,
    cell: (row: IProject) => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      );
    },
  },
  {
    name: 'Hours',
    selector: (row: IProject) => row.hours,
  },
];

const UserProjectsList = () => {
  return (
    <Card>
      <CardHeader tag='h4'>User's Projects List</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
