import { Fragment, useEffect } from 'react';

import { Row, Col, CardText } from 'reactstrap';

import Prism from 'prismjs';

import Card from 'src/@core/components/card-snippet';
import BreadCrumbs from 'src/@core/components/breadcrumbs';

import TooltipPositions from './TooltipPositions';
import TooltipControlled from './TooltipControlled';
import TooltipUncontrolled from './TooltipUncontrolled';

// ** Source Code
import { tooltipControlled, tooltipUncontrolled, tooltipPosition } from './TooltipSourceCode';

const Tooltips = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Fragment>
      <BreadCrumbs title='Tooltips' data={[{ title: 'Components' }, { title: 'Tooltips' }]} />
      <Row>
        <Col xl='6' lg='12'>
          <Card title='Controlled Tooltip' code={tooltipControlled}>
            <CardText>
              For controlled tooltips you'll have to manage state of component.controlled tooltips require{' '}
              <code>isOpen</code> and <code>toggle</code> props to work.
            </CardText>
            <TooltipControlled />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Uncontrolled Tooltip' code={tooltipUncontrolled}>
            <CardText>
              UncontrolledTooltip does not require <code>isOpen</code> nor <code>toggle</code> props to work.All you
              have to do is provide a valid target to tooltip.
            </CardText>
            <TooltipUncontrolled />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <Card title='Tooltip Positions' code={tooltipPosition}>
            <CardText className='mb-0'>
              Use prop <code>placement</code> to change position of tooltip.
            </CardText>
            <TooltipPositions />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Tooltips;
