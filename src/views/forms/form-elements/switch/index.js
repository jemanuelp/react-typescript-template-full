import { Fragment } from 'react';

import { Row, Col } from 'reactstrap';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import SwitchIcons from './SwitchIcons';
import SwitchColors from './SwitchColors';
import SwitchReactstrap from './SwitchBasic';

const Switch = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Switch' data={[{ title: 'Form Elements' }, { title: 'Switch' }]} />
      <Row>
        <Col sm='12'>
          <SwitchReactstrap />
        </Col>
        <Col sm='12'>
          <SwitchColors />
        </Col>
        <Col sm='12'>
          <SwitchIcons />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Switch;
