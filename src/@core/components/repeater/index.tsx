import PropTypes from 'prop-types';
import {RepeaterProptypes} from '../../../domains/proptypes/RepeaterProptypes';

const Repeater = (props: RepeaterProptypes) => {
  const { count, tag, children, ...rest } = props;

  // ** Custom Tag
  const Tag = tag;

  // ** Default Items
  const items = [];

  // ** Loop passed count times and push it in items Array
  for (let i = 0; i < count; i++) {
    items.push(children(i));
  }

  // @ts-ignore
  return <Tag {...rest}>{items}</Tag>;
};

// ** Default Props
Repeater.defaultProps = {
  tag: 'div',
};

export default Repeater;
