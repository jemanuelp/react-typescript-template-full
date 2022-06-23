import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';

const CreditCardMask = () => {
  const options = { creditCard: true };

  return (
    <Fragment>
      <Label for='credit-card'>Credit Card</Label>
      <Cleave className='form-control' placeholder='0000 0000 0000 0000' options={options} id='credit-card' />
    </Fragment>
  );
};

export default CreditCardMask;
