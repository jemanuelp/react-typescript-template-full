import { Fragment } from 'react';
import Cleave from 'cleave.js/react';
import { Label } from 'reactstrap';

const BlocksMask = () => {
  const options = { blocks: [4, 3, 3], uppercase: true };
  return (
    <Fragment>
      <Label for='blocks'>Blocks</Label>
      <Cleave className='form-control' placeholder='Blocks [4, 3, 3]' options={options} id='blocks' />
    </Fragment>
  );
};

export default BlocksMask;
