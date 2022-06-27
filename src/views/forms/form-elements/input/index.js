import { Fragment } from 'react';

import { Row, Col } from 'reactstrap';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import InputFile from './InputFile';
import InputBasic from './InputBasic';
import InputSizes from './InputSizes';
import InputState from './InputStates';
import InputFloating from './InputFloating';
import InputHorizontalSize from './InputHorizontalSize';

const Input = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Input' data={[{ title: 'Form Elements' }, { title: 'Input' }]} />
      <Row className='match-height'>
        <Col sm='12'>
          <InputBasic />
        </Col>
        <Col md='6' sm='12'>
          <InputSizes />
        </Col>
        <Col md='6' sm='12'>
          <InputHorizontalSize />
        </Col>
        <Col sm='12'>
          <InputFloating />
        </Col>
        <Col sm='12'>
          <InputFile />
        </Col>
        <Col sm='12'>
          <InputState />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Input;
