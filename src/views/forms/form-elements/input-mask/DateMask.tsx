import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';

const DateMask = () => {
  const options = { date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] };
  return (
    <Fragment>
      <Label for='date'>Date</Label>
      <Cleave className='form-control' placeholder='2001-01-01' options={options} id='date' />
    </Fragment>
  );
};

export default DateMask;
