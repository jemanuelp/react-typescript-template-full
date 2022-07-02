import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import {NavMenuGroup} from '../interfaces/NavMenuGroup';

const HorizontalNavMenuLink = (
  { item, isChild, setMenuOpen }: NavMenuGroup,
) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag: any = item.externalLink ? 'a' : NavLink;

  const { t } = useTranslation();

  const handleClick = () => {
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={classnames('nav-item', {
        disabled: item.disabled,
      })}
    >
      <LinkTag
        className={classnames('d-flex align-items-center', {
          'dropdown-item': isChild,
          'nav-link': !isChild,
        })}
        target={item.newTab ? '_blank' : undefined}
        
        {...(item.externalLink === true ?
          {
            href: item.navLink || '/',
          } :
          {
            to: item.navLink || '/',
            className: ({ isActive }: any) => {
              const commonClass = 'd-flex align-items-center';
              if (isActive && !item.disabled && item.navLink !== '#') {
                if (isChild) {
                  return `${commonClass} dropdown-item active`;
                } else {
                  return `${commonClass} nav-link active`;
                }
              } else {
                if (isChild) {
                  return `${commonClass} dropdown-item`;
                } else {
                  return `${commonClass} nav-link`;
                }
              }
            },
          })}
      >
        {item.icon}
        <span>{t(item.title)}</span>
      </LinkTag>
    </li>
  );
};

export default HorizontalNavMenuLink;
