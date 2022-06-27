import { Fragment, useState } from 'react';

import { Label } from 'reactstrap';

import Flatpickr from 'react-flatpickr';

const PickerRangeDisabled = () => {
  const [picker, setPicker] = useState(new Date());
  return (
    <Fragment>
      <Label className='form-label' for='disabled-picker'>
        Disabled Range
      </Label>
      <Flatpickr
        value={picker}
        id='disabled-picker'
        className='form-control'
        onChange={date => setPicker(date)}
        options={{
          dateFormat: 'Y-m-d',
          disable: [
            {
              from: new Date(),
              to: new Date(new Date().getTime() + 120 * 60 * 60 * 1000)
            }
          ]
        }}
      />
    </Fragment>
  );
};

export default PickerRangeDisabled;
