import {ComponentClass, Fragment} from 'react';
import classnames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import Avatar from '../avatar';
import {CardBrowserType} from '../../../views/ui-elements/cards/models/CardMeetupType';

export type AvatarGroupType = {
  data: CardBrowserType[];
  tag?: ComponentClass<any> | string;
  className?: string;
}

const AvatarGroup = (props: AvatarGroupType) => {
  const { data, tag, className } = props;

  // ** Conditional Tag
  const Tag = tag ? tag : 'div';

  // ** Render Data
  const renderData = () => {
    return data.map((item: CardBrowserType, i: any) => {
      const ItemTag = item.tag ? item.tag : 'div';
      const classNameTag = item.className ?
        {[item.className]: item.className} :
        {};
      const className = classnames('pull-up', classNameTag);
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
                {...(item.title ? { id: item.title.split(' ').join('-') } : {})}
                meta={undefined}
                {...item}
                className={className}
              />
            ) :
            null}
          {item.meta ? <ItemTag className='d-flex align-items-center ps-1'>{item.meta}</ItemTag> : null}
        </Fragment>
      );
    });
  };

  const classNameTag = className ?
    {
      [className]: className,
    } :
    {};
  return (
    <Tag
      className={classnames('avatar-group', classNameTag)}
    >
      {renderData()}
    </Tag>
  );
};

export default AvatarGroup;
