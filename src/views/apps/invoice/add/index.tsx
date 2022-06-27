import AddCard from './AddCard';
import AddActions from './AddActions';
import { Row, Col } from 'reactstrap';
import 'src/@core/scss/react/libs/flatpickr/flatpickr.scss';
import 'src/@core/scss/base/pages/app-invoice.scss';

const InvoiceAdd = () => {
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={9} md={8} sm={12}>
          <AddCard />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions />
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceAdd;
