import { Fragment, useState } from 'react';

import { Button, Tooltip } from 'reactstrap';

const TooltipControlled = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Fragment>
      <Button color='primary' id='ControlledExample'>
        Controlled
      </Button>
      <Tooltip
        placement='top'
        isOpen={tooltipOpen}
        target='ControlledExample'
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        Hello World !
      </Tooltip>
    </Fragment>
  );
};
export default TooltipControlled;
