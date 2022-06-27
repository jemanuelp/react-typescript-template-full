import { Fragment } from 'react';

import { Row, Col } from 'reactstrap';

import BasicTimeline from './BasicTimeline';
import IconsTimeline from './IconsTimeline';

import BreadCrumbs from 'src/@core/components/breadcrumbs';

const Timeline = () => {
  return (
    <Fragment>
      <BreadCrumbs title='Timeline' data={[{ title: 'Components' }, { title: 'Timeline' }]} />
      <Row>
        <Col lg='6'>
          <BasicTimeline />
        </Col>
        <Col lg='6'>
          <IconsTimeline />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Timeline;
