import { Sun, Cloud, CloudLightning, CloudSnow, CloudDrizzle } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
const Rating = require('react-rating').default;

const RatingCustomSvg = ({ dir }: {dir : 'rtl' | 'ltr'}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Custom SVG</CardTitle>
      </CardHeader>
      <CardBody>
        <Rating
          emptySymbol={<Sun size={32} stroke='#babfc7' />}
          fullSymbol={[
            <Cloud size={32} stroke='#babfc7' />,
            <CloudLightning size={32} stroke='#babfc7' />,
            <CloudSnow size={32} stroke='#babfc7' />,
            <CloudDrizzle size={32} stroke='#babfc7' />,
          ]}
          stop={4}
          direction={dir}
        />
      </CardBody>
    </Card>
  );
};

export default RatingCustomSvg;
