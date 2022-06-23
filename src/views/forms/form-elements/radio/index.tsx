import { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import RadioBasic from './RadioBasic';
import RadioColors from './RadioColors';
import Breadcrumbs from "../../../../@core/components/breadcrumbs";

const Radio = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Radio' data={[{ title: 'Form Elements' }, { title: 'Radio' }]} />
      <Row>
        <Col sm='12'>
          <RadioBasic />
        </Col>
        <Col sm='12'>
          <RadioColors />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Radio;
