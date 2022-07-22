import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import {Row, Col, Alert} from 'reactstrap';
import PreviewCard from './PreviewCard';
import PreviewActions from './PreviewActions';
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment';
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice';
import '../../../../@core/scss/base/pages/app-invoice.scss';
import {InvoicePaymentDetail} from '../models/InvoicePaymentDetail';

const InvoicePreview = () => {
  const {id} = useParams();
  const [data, setData] = useState<InvoicePaymentDetail | null>(null);
  const [sendSidebarOpen, setSendSidebarOpen] = useState<boolean>(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false);

  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

  useEffect(() => {
    axios.get(`/api/invoice/invoices/${id}`).then(response => {
      setData(response.data);
    });
  }, []);

  return data !== null && data.invoice !== undefined ?
    (<div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={data}/>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions
            id={id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}/>
        </Col>
      </Row>
      <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen}/>
      <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen}/>
    </div>
    ) :
    (
      <Alert color='danger'>
        <h4 className='alert-heading'>Invoice not found</h4>
        <div className='alert-body'>
              Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
          <Link to='/apps/invoice/list'>Invoice List</Link>
        </div>
      </Alert>
    );
};

export default InvoicePreview;
