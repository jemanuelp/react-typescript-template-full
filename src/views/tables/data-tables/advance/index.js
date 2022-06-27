import { Fragment } from 'react';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import { Row, Col } from 'reactstrap';

import TableServerSide from './TableServerSide';
import TableAdvSearch from './TableAdvSearch';

import 'src/@core/scss/react/libs/tables/react-dataTable-component.scss';

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TableServerSide />
        </Col>
        <Col sm='12'>
          <TableAdvSearch />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Tables;
