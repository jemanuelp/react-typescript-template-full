import { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import ExtensionsHeader from '../../../@core/components/extensions-header';
import ContextSubMenu from './ContextSubmenu';
import ContextMenuBasic from './ContextMenuBasic';
import ContextMenuLeftClick from './ContextMenuLeftClick';
import ContextMenuDoubleClick from './ContextMenuDoubleClick';
import ContextMenuAnimation from './ContextMenuAnimation';
import 'react-contexify/dist/ReactContexify.min.css';
import '../../../@core/scss/react/libs/context-menu/context-menu.scss';

const Contexify = () => {
  return (
    <Fragment>
      <ExtensionsHeader
        title='React Contexify'
        subTitle='Adds a context menu to your react app with ease'
        link='https://github.com/fkhadra/react-contexify'
      />
      <Row>
        <Col sm='12'>
          <ContextMenuBasic />
        </Col>
        <Col sm='12'>
          <ContextSubMenu />
        </Col>
        <Col sm='12'>
          <ContextMenuLeftClick />
        </Col>
        <Col sm='12'>
          <ContextMenuDoubleClick />
        </Col>
        <Col sm='12'>
          <ContextMenuAnimation />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Contexify;
