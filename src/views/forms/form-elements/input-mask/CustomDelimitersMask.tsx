import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';

const CustomDelimitersMask = () => {
  const options = { delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2], uppercase: true };
  return (
    <Fragment>
      <Label for='custom-delimiters'>Custom Delimiters</Label>
      <Cleave
        className='form-control'
        placeholder="Delimiter: ['.', '.', '-']"
        options={options}
        id='custom-delimiters'
      />
    </Fragment>
  );
};

export default CustomDelimitersMask;
