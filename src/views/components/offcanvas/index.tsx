import { Fragment, useEffect } from 'react';
import Prism from 'prismjs';
import {Row, Col, Card} from 'reactstrap';
import { offCanvasPlacement, offCanvasOptions } from './OffCanvasSourceCode';

import OffCanvasOptions from './OffCanvasOptions';
import OffCanvasPlacement from './OffCanvasPlacement';
import BreadCrumbs from "../../../@core/components/breadcrumbs";

const OffCanvas = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Fragment>
      <BreadCrumbs title='Offcanvas' data={[{ title: 'Components' }, { title: 'OffCanvas' }]} />
      <Row className='match-height'>
        <Col sm='12'>
          <Card title='Placement' code={offCanvasPlacement}>
            <OffCanvasPlacement />
          </Card>
        </Col>
        <Col sm='12'>
          <Card title='Options' code={offCanvasOptions}>
            <OffCanvasOptions />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default OffCanvas;
