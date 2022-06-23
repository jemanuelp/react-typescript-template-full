import { Fragment, useEffect } from 'react';
import {Row, Col, Card} from 'reactstrap';
import Prism from 'prismjs';
import InputGroupBasic from './InputGroupBasic';
import InputGroupSizes from './InputGroupSizes';
import InputGroupMerged from './InputGroupMerged';
import InputGroupButtons from './InputGroupButtons';
import InputCbAndRadio from './InputGroupCbAndRadio';
import InputGroupDropdown from './InputGroupDropdown';

import {
  inputGroupBasic,
  inputGroupSizes,
  inputGroupMerged,
  inputGroupCBRadio,
  inputGroupButtons,
  inputGroupDropdowns
} from './InputGroupSourceCode';
import Breadcrumbs from "../../../../@core/components/breadcrumbs";

const InputGroups = () => {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <Fragment>
      <Breadcrumbs title='Input Groups' data={[{ title: 'Form Elements' }, { title: 'InputGroups' }]} />
      <Row className='match-height'>
        <Col md='6' sm='12'>
          <Card title='Basic' code={inputGroupBasic}>
            <InputGroupBasic />
          </Card>
        </Col>
        <Col md='6' sm='12'>
          <Card title='Merged' code={inputGroupMerged}>
            <InputGroupMerged />
          </Card>
        </Col>
        <Col md='6' sm='12'>
          <Card title='Sizing' code={inputGroupSizes}>
            <InputGroupSizes />
          </Card>
        </Col>
        <Col md='6' sm='12'>
          <Card title='Checkbox & Radio' code={inputGroupCBRadio}>
            <InputCbAndRadio />
          </Card>
        </Col>
        <Col sm='12'>
          <Card title='Input Group with Buttons' code={inputGroupButtons}>
            <InputGroupButtons />
          </Card>
        </Col>
        <Col sm='12'>
          <Card title='Input Group Dropdowns' code={inputGroupDropdowns}>
            <InputGroupDropdown />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default InputGroups;
