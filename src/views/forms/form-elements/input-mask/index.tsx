import { Fragment } from 'react';
import DateMask from './DateMask';
import TimeMask from './TimeMask';
import PhoneMask from './PhoneMask';
import BlocksMask from './BlocksMask';
import PrefixMask from './PrefixMask';
import DelimitersMask from './DelimitersMask';
import CreditCardMask from './CreditCardMask';
import CustomDelimitersMask from './CustomDelimitersMask';
import NumeralFormattingMask from './NumeralFormattingMask';
import { Row, Col, Card, CardBody, CardTitle, CardHeader } from 'reactstrap';
import Breadcrumbs from "../../../../@core/components/breadcrumbs";

const InputMask = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Input Mask' data={[{ title: 'Form Elements' }, { title: 'Input Mask' }]} />
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Input Masks</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <CreditCardMask />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <PhoneMask />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <DateMask />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <TimeMask />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <NumeralFormattingMask />
                </Col>
                <Col className='mb-2' xl='4' md='6' sm='12'>
                  <BlocksMask />
                </Col>
                <Col xl='4' md='6' sm='12'>
                  <DelimitersMask />
                </Col>
                <Col xl='4' md='6' sm='12'>
                  <CustomDelimitersMask />
                </Col>
                <Col xl='4' md='6' sm='12'>
                  <PrefixMask />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default InputMask;
