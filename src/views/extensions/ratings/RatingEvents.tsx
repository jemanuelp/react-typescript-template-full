const Rating = require('react-rating').default;
import { Star } from 'react-feather';
import RatingsHover from './RatingsHover';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';

const RatingEvents = ({ filledColor, dir }: {filledColor: string, dir : 'rtl' | 'ltr'}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Events</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md='6' className='d-flex flex-column align-items-start mb-md-0 mb-1'>
            <CardText className='fw-semibold mb-25'>On Change</CardText>
            <Rating
              direction={dir}
              onChange={(rate: any) => alert(rate)}
              emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
              fullSymbol={<Star size={32} fill={filledColor} stroke={filledColor} />}
            />
          </Col>
          <Col md='6' className='d-flex flex-column align-items-start'>
            <CardText className='fw-semibold mb-25'>On Hover</CardText>
            <RatingsHover filledColor={filledColor} dir={dir} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RatingEvents;
