import { Fragment, useEffect } from 'react';

import Prism from 'prismjs';

import { Row, Col } from 'reactstrap';

import Card from 'src/@core/components/card-snippet';
import BreadCrumbs from 'src/@core/components/breadcrumbs';

import PillsEnd from './PillsEnd';
import PillsBasic from './PillsBasic';
import PillThemes from './PillThemes';
import PillsFilled from './PillsFilled';
import PillsCentered from './PillsCentered';
import PillsVertical from './PillsVertical';
import PillsJustified from './PillsJustified';

// ** Source Code
import {
  pillsEnd,
  pillBasic,
  pillThemes,
  pillsFilled,
  pillsCentered,
  pillsJustified,
  pillsVertical,
} from './TabPillsSourceCode';

const PillTabs = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Fragment>
      <BreadCrumbs title='Pills' data={[{ title: 'Components' }, { title: 'Pills' }]} />
      <Row className='match-height'>
        <Col xl='6' lg='12'>
          <Card title='Basic' code={pillBasic}>
            <PillsBasic />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Vertical Stacked' code={pillsVertical}>
            <PillsVertical />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Filled' code={pillsFilled}>
            <PillsFilled />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Justified' code={pillsJustified}>
            <PillsJustified />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Centered' code={pillsCentered}>
            <PillsCentered />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='End' code={pillsEnd}>
            <PillsEnd />
          </Card>
        </Col>
        <Col sm='12'>
          <Card title='Themes' code={pillThemes}>
            <PillThemes />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default PillTabs;
