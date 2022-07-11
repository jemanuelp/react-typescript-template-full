import { useState, Fragment } from 'react';
const Rating = require('react-rating').default;
import { Star } from 'react-feather';

const RatingsHover = ({ filledColor, dir }: {filledColor: string, dir : 'rtl' | 'ltr'}) => {
  const [value, setValue] = useState<number>(0);

  const onHover = (rate: number) => {
    if (rate !== undefined) {
      setValue(rate);
    }
  };

  return (
    <Fragment>
      <Rating
        direction={dir}
        initialRating={value}
        onHover={(rate: number) => onHover(rate)}
        onChange={(rate: number) => setValue(rate)}
        emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
        fullSymbol={<Star size={32} fill={filledColor} stroke={filledColor} />}
      />
      <div className='counter-wrapper mt-1'>
        <span className='fw-bold'>Ratings: {value}</span>
      </div>
    </Fragment>
  );
};

export default RatingsHover;
