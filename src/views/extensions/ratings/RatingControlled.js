import { useState } from 'react';

import Rating from 'react-rating';
import { Star } from 'react-feather';

import { Card, Button, CardHeader, CardTitle, CardBody } from 'reactstrap';

const RatingControlled = ({ filledColor, dir }) => {
  const [value, setValue] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Controlled Ratings</CardTitle>
      </CardHeader>
      <CardBody>
        <Rating
          direction={dir}
          initialRating={value}
          onChange={e => setValue(e)}
          emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={32} fill={filledColor} stroke={filledColor} />}
        />
        <div className='demo-inline-spacing'>
          <Button color='primary' onClick={() => setValue(0)} outline>
            Reset
          </Button>
          <Button color='primary' onClick={() => alert(value)} outline>
            Get Ratings
          </Button>
          <Button color='primary' onClick={() => setValue(3)} outline>
            Set Ratings to 3
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default RatingControlled;
