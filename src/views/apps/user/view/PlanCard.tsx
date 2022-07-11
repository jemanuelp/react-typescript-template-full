import { Fragment, useState } from 'react';
import { Row, Col, Label, Card, CardBody, Badge, Progress, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';
import '../../../../@core/scss/react/libs/react-select/_react-select.scss';
import '../../../../@core/scss/base/plugins/extensions/ext-component-sweet-alerts.scss';
import {handleConfirmCancel} from '../hooks/HandleConfirmCancel';
import {PlanOptions} from '../interfaces/PlanOptions';

const PlanCard = () => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Card className='plan-card border-primary'>
        <CardBody>
          <div className='d-flex justify-content-between align-items-start'>
            <Badge color='light-primary'>Standard</Badge>
            <div className='d-flex justify-content-center'>
              <sup className='h5 pricing-currency text-primary mt-1 mb-0'>$</sup>
              <span className='fw-bolder display-5 mb-0 text-primary'>99</span>
              <sub className='pricing-duration font-small-4 ms-25 mt-auto mb-2'>/month</sub>
            </div>
          </div>
          <ul className='ps-1 mb-2'>
            <li className='mb-50'>10 Users</li>
            <li className='mb-50'>Up to 10 GB storage</li>
            <li>Basic Support</li>
          </ul>
          <div className='d-flex justify-content-between align-items-center fw-bolder mb-50'>
            <span>Days</span>
            <span>4 of 30 Days</span>
          </div>
          <Progress className='mb-50' value={85} style={{ height: '8px' }} />
          <span>4 days remaining</span>
          <div className='d-grid w-100 mt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Upgrade Plan
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-5 pb-2'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Upgrade Plan</h1>
            <p>Choose the best plan for user.</p>
          </div>
          <Row className='pt-50'>
            <Col sm={8}>
              <Label className='form-label'>Choose Plan</Label>
              <Select
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={PlanOptions}
                theme={selectThemeColors}
                defaultValue={PlanOptions[0]}
              />
            </Col>
            <Col sm={4} className='text-sm-end mt-2'>
              <Button color='primary'>Upgrade</Button>
            </Col>
          </Row>
        </ModalBody>
        <hr />
        <ModalBody className='px-5 pb-3'>
          <h6>User current plan is standard plan</h6>
          <div className='d-flex justify-content-between align-items-center flex-wrap'>
            <div className='d-flex justify-content-center me-1 mb-1'>
              <sup className='h5 pricing-currency pt-1 text-primary'>$</sup>
              <h1 className='fw-bolder display-4 mb-0 text-primary me-25'>99</h1>
              <sub className='pricing-duration font-small-4 mt-auto mb-2'>/month</sub>
            </div>
            <Button outline color='danger' className='mb-1' onClick={handleConfirmCancel}>
              Cancel Subscription
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PlanCard;
