import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';
import {CleaveOptions} from "cleave.js/options";

const NumeralFormattingMask = () => {
  const options: CleaveOptions = { numeral: true, numeralThousandsGroupStyle: 'thousand' };

  return (
    <Fragment>
      <Label for='numeral-formatting'>Numeral Formatting</Label>
      <Cleave className='form-control' placeholder='10,000' options={options} id='numeral-formatting' />
    </Fragment>
  );
};

export default NumeralFormattingMask;
