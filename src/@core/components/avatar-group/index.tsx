import { Fragment } from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import Avatar from '../avatar';

const AvatarGroup = (props: any) => {
  const { data, tag, className } = props;

  // ** Conditional Tag
  const Tag = tag ? tag : 'div';

  // ** Render Data
  const renderData = () => {
    return data.map((item: any, i: any) => {
      const ItemTag = item.tag ? item.tag : 'div';
      return (
        <Fragment key={i}>
          {item.title ?
            (
              <UncontrolledTooltip placement={item.placement} target={item.title.split(' ').join('-')}>
                {item.title}
              </UncontrolledTooltip>
            ) :
            null}
          {!item.meta ?
            (
              <Avatar
                tag={ItemTag}
                className={classnames('pull-up', {
                  [item.className]: item.className,
                })}
                {...(item.title ? { id: item.title.split(' ').join('-') } : {})}
                {...item}
                title={undefined}
                meta={undefined}
              />
            ) :
            null}
          {item.meta ? <ItemTag className='d-flex align-items-center ps-1'>{item.meta}</ItemTag> : null}
        </Fragment>
      );
    });
  };

  return (
    <Tag
      className={classnames('avatar-group', {
        [className]: className,
      })}
    >
      {renderData()}
    </Tag>
  );
};

export default AvatarGroup;

AvatarGroup.propTypes = {
  data: Proptypes.array.isRequired,
  tag: Proptypes.oneOfType([Proptypes.func, Proptypes.string]),
};
