import {ComponentClass, forwardRef, ReactNode} from 'react';
import classnames from 'classnames';
import {Badge} from 'reactstrap';
import {SizeTypes} from '../../../domains/enums/SizeTypes';
import {StatusTypes} from '../../../views/ui-elements/cards/models/StatusTypes';
import {ColorTypes} from '../../../views/ui-elements/cards/models/ColorTypes';

const initialsDefault = (props: any) => {
  if (props['initials'] && props['content'] === undefined) {
    return new Error('content prop is required with initials prop.');
  }
  if (props['initials'] && typeof props['content'] !== 'string') {
    return new Error('content prop must be a string.');
  }
  if (typeof props['initials'] !== 'boolean' && props['initials'] !== undefined) {
    return new Error('initials must be a boolean!');
  }
  return null;
};

export type AvatarProps = {
  id?: string;
  img?: string;
  icon?: ReactNode;
  src?: string;
  badgeUp?: boolean;
  content?: string;
  badgeText?: string;
  className?: string;
  imgClassName?: string;
  contentStyles?: object;
  size?: SizeTypes;
  tag?: ComponentClass<any> | string;
  status?: StatusTypes,
  imgHeight?: string | number;
  imgWidth?: string | number;
  badgeColor?: ColorTypes;
  color?: ColorTypes;
  initials?: Function | boolean;
  title?: string;
  meta?: string;
  alt?: string;
  style?: {
    height: string;
    width: string;
  };
  width?: number;
  height?: number;
  onClick?: any;
}

const Avatar = forwardRef((props: AvatarProps, ref) => {
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag = 'div',
    initials = initialsDefault,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  const getImgClassName = (imgClassName?: string) => {
    if (imgClassName) {
      return {
        [imgClassName]: imgClassName,
      };
    }
    return '';
  };

  const getInitials = (str?: string) => {
    if (!str) {
      return '';
    }
    const results: any[] = [];
    const wordArray = str.split(' ');
    wordArray.forEach(e => {
      results.push(e[0]);
    });
    return results.join('');
  };

  const classNameTag = className ?
    { [className]: className } :
    {};
  return (
    <Tag
      className={classnames('avatar', {
        ...classNameTag,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {!img ?
        (
          <span
            className={classnames('avatar-content', {
              'position-relative': badgeUp,
            })}
            style={contentStyles}
          >
            <>
              {
                initials ?
                  getInitials(content) :
                  content
              }
              {icon ? icon : null}
              {badgeUp ?
                (
                  <Badge color={badgeColor ? badgeColor : 'primary'} className='badge-sm badge-up' pill>
                    {badgeText ? badgeText : '0'}
                  </Badge>
                ) :
                null}
            </>
          </span>
        ) :
        (
          <img
            className={classnames(getImgClassName(imgClassName))}
            src={String(img)}
            alt='avatarImg'
            height={imgHeight && !size ? imgHeight : 32}
            width={imgWidth && !size ? imgWidth : 32}
          />
        )}
      {status ?
        (
          <span
            className={classnames({
              [`avatar-status-${status}`]: status,
              [`avatar-status-${size}`]: size,
            })}
          ></span>
        ) :
        null}
    </Tag>
  );
});

export default Avatar;
