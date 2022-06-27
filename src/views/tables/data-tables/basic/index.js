import { Fragment } from 'react';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import { Row, Col } from 'reactstrap';

import TableExpandable from './TableExpandable';
import TableZeroConfig from './TableZeroConfig';
import TableWithButtons from './TableWithButtons';
import TableMultilingual from './TableMultilingual';
import DataTablesReOrder from './TableColumnReorder';

import 'src/@core/scss/react/libs/tables/react-dataTable-component.scss';

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Datatables Basic' data={[{ title: 'Datatables' }, { title: 'Datatables Basic' }]} />
      <Row>
        <Col sm='12'>
          <TableZeroConfig />
        </Col>
        <Col sm='12'>
          <DataTablesReOrder />
        </Col>
        <Col sm='12'>
          <TableWithButtons />
        </Col>
        <Col sm='12'>
          <TableExpandable />
        </Col>
        <Col sm='12'>
          <TableMultilingual />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Tables;
