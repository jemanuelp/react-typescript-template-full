import { Fragment, useState, useEffect } from 'react';
import { Card, Input, Modal, Button, CardBody, CardText, CardTitle, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { BarChart2 } from 'react-feather';
import '../../../@core/scss/base/pages/page-pricing.scss';
import PricingCards from '../pricing/PricingCards';

const PricingExample = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [duration, setDuration] = useState('monthly');

  useEffect(() => {
    axios.get('/pricing/data').then(res => {
      const dataArr: any[] = [];

      Object.entries(res.data).forEach(([key, val]) => {
        if (key !== 'qandA') {
          dataArr.push(val);
          setData([...dataArr]);
        }
      });
    });
  }, []);

  const onChange = (e: any) => {
    if (e.target.checked) {
      setDuration('yearly');
    } else {
      setDuration('monthly');
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <BarChart2 className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Pricing</CardTitle>
          {/* eslint-disable-next-line max-len */}
          <CardText>Elegant pricing options modal popup example, easy to use in any page.</CardText>
          <Button color='primary' onClick={() => setShow(true)}>
            Show
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-xl'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>Subscription Plan</h1>
          <p className='text-center mb-3'>
            {/* eslint-disable-next-line max-len */}
            All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your
            needs.
          </p>
          <div className='d-flex align-items-center justify-content-center mb-2 pb-50'>
            <h6 className='me-50 mb-0'>Monthly</h6>
            <div className='form-switch'>
              <Input id='plan-switch' type='switch' checked={duration === 'yearly'} onChange={onChange} />
            </div>
            <h6 className='ms-50 mb-0'>Annually</h6>
          </div>
          <PricingCards
            bordered
            fullWidth
            data={data}
            duration={duration}
            cols={{
              lg: 4,
              xs: 12,
            }}
          />
          <div className='text-center'>
            <p>Still not convinced? Start with a 14-day FREE trial!</p>
            <Button color='primary'>Start your trial</Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default PricingExample;
