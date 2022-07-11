import { useContext } from 'react';
import { List } from 'react-feather';
import Avatar from '../../../@core/components/avatar';
import Timeline from '../../../@core/components/timeline';
import AvatarGroup from '../../../@core/components/avatar-group';
import { kFormatter } from '../../../utility/Utils';
import { ThemeColors } from '../../../utility/context/ThemeColors';
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import InvoiceList from '../../apps/invoice/list';
import Sales from '../../ui-elements/cards/analytics/Sales';
import AvgSessions from '../../ui-elements/cards/analytics/AvgSessions';
import CardAppDesign from '../../ui-elements/cards/advance/CardAppDesign';
import SupportTracker from '../../ui-elements/cards/analytics/SupportTracker';
import OrdersReceived from '../../ui-elements/cards/statistics/OrdersReceived';
import SubscribersGained from '../../ui-elements/cards/statistics/SubscribersGained';
import CardCongratulations from '../../ui-elements/cards/advance/CardCongratulations';
import jsonImg from '../../../../src/assets/images/icons/json.png';
import ceo from '../../../../src/assets/images/portrait/small/avatar-s-9.jpg';
import '../../../@core/scss/react/libs/charts/apex-charts.scss';
import {CardBrowserType} from '../../ui-elements/cards/models/CardMeetupType';

const AnalyticsDashboard = () => {
  const { colors } = useContext(ThemeColors);

  const avatarGroupArr: CardBrowserType[] = [
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('../../../../src/assets/images/portrait/small/avatar-s-9.jpg'),
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Amy Carson',
      placement: 'bottom',
      img: require('../../../../src/assets/images/portrait/small/avatar-s-6.jpg'),
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Brandon Miles',
      placement: 'bottom',
      img: require('../../../../src/assets/images/portrait/small/avatar-s-8.jpg'),
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Daisy Weber',
      placement: 'bottom',
      img: require('../../../../src/assets/images/portrait/small/avatar-s-7.jpg'),
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Jenny Looper',
      placement: 'bottom',
      img: require('../../../../src/assets/images/portrait/small/avatar-s-20.jpg'),
    },
  ];
  const data = [
    {
      title: '12 Invoices have been paid',
      content: 'Invoices have been paid to the company.',
      meta: '',
      metaClassName: 'me-1',
      customContent: (
        <div className='d-flex align-items-center'>
          <img className='me-1' src={jsonImg} alt='data.json' height='23' />
          <span>data.json</span>
        </div>
      ),
    },
    {
      title: 'Client Meeting',
      content: 'Project meeting with john @10:15am.',
      meta: '',
      metaClassName: 'me-1',
      color: 'warning',
      customContent: (
        <div className='d-flex align-items-center'>
          <Avatar img={ceo} />
          <div className='ms-50'>
            <h6 className='mb-0'>John Doe (Client)</h6>
            <span>CEO of Infibeam</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'info',
      meta: '',
      metaClassName: 'me-1',
      customContent: <AvatarGroup data={avatarGroupArr} />,
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'danger',
      meta: '',
      metaClassName: 'me-1',
    },
  ];

  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='6' sm='12'>
          <CardCongratulations />
        </Col>
        <Col lg='3' sm='6'>
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg='3' sm='6'>
          <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' xs='12'>
          <AvgSessions primary={colors.primary.main} />
        </Col>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='4' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <List className='user-timeline-title-icon' />
                <CardTitle tag='h4'>User Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
              <Timeline className='ms-50 mb-0' data={data} />
            </CardBody>
          </Card>
        </Col>
        <Col lg='4' md='6' xs='12'>
          <Sales primary={colors.primary.main} info={colors.info.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardAppDesign />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <InvoiceList />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
