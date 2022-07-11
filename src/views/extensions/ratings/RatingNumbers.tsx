import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
const Rating = require('react-rating');

const RatingNumbers = (props: {filledColor: string, dir : 'rtl' | 'ltr'}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Numbers</CardTitle>
      </CardHeader>
      <CardBody>
        <Rating
          direction={props.dir}
          emptySymbol={<span className='font-medium-3 me-50'>-</span>}
          fullSymbol={[1, 2, 3, 4, 5].map(n => (
            <span className='font-medium-3 me-50'>{n}</span>
          ))}
        />
      </CardBody>
    </Card>
  );
};

export default RatingNumbers;