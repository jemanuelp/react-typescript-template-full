import { data, basicColumns } from '../data';

import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

import { Card, CardHeader, CardTitle } from 'reactstrap';

const DataTablesBasic = () => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle tag='h4'>Zero Configuration</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={data}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  );
};

export default DataTablesBasic;
