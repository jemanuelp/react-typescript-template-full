import { Star } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {createElement} from 'react';
import {RatingComponentProps} from 'react-rating';
const Rating = require('react-rating').default;

const RatingBasic = ({ filledColor, dir }: {filledColor: string, dir : 'rtl' | 'ltr'}) => {
  const RatingComponent = () => {
    return createElement<RatingComponentProps>(Rating, {
      direction: dir,
      initialRating: 2,
      emptySymbol: <Star size={32} fill='#babfc7' stroke='#babfc7' />,
      fullSymbol: <Star size={32} fill={filledColor} stroke={filledColor} />,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <RatingComponent />
      </CardBody>
    </Card>
  );
};

export default RatingBasic;
