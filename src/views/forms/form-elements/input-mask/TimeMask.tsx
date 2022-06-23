import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';

const TimeMask = () => {
  const options = { time: true, timePattern: ['h', 'm', 's'] };
  return (
    <Fragment>
      <Label for='time'>Time</Label>
      <Cleave className='form-control' placeholder='12:00:00' options={options} id='time' />
    </Fragment>
  );
};

export default TimeMask;
