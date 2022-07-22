import {ComponentClass} from 'react';

export class RepeaterProptypes {
  count: number = 0;
  tag: ComponentClass<any> | string = 'div';
  children?: any;
  rest?: any;
}

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

  return <Tag {...rest}>{items}</Tag>;
};

Repeater.defaultProps = {
  tag: 'div',
};

export default Repeater;
