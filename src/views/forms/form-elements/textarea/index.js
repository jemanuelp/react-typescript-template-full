import { Fragment } from 'react';

import { Row, Col } from 'reactstrap';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import TextareaDefault from './TextareaDefault';
import TextareaCounter from './TextareaCounter';
import TextareaFloatingLabel from './TextareaFloatingLabel';

const Textarea = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Textarea' data={[{ title: 'Form Elements' }, { title: 'Textarea' }]} />
      <Row>
        <Col sm='12'>
          <TextareaDefault />
        </Col>
        <Col sm='12'>
          <TextareaFloatingLabel />
        </Col>
        <Col sm='12'>
          <TextareaCounter />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Textarea;
