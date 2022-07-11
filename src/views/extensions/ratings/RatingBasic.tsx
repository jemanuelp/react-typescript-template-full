import { Star } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
const Rating = require('react-rating');

const RatingBasic = ({ filledColor, dir }: {filledColor: string, dir : 'rtl' | 'ltr'}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <Rating
          direction={dir}
          initialRating={2}
          emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={32} fill={filledColor} stroke={filledColor} />}
        />
      </CardBody>
    </Card>
  );
};

export default RatingBasic;
