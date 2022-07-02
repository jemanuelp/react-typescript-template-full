import VerticalNavMenuLink from './VerticalNavMenuLink';
import VerticalNavMenuGroup from './VerticalNavMenuGroup';
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader';
import {resolveVerticalNavMenuItemComponent as resolveNavItemComponent} from '../../../../layouts/utils';
import {CanViewMenuGroup} from '../../../utils';
import {VerticalMenuNavItemsProptypes} from '../interfaces/VerticalMenuNavItemsProptypes';
import {IItems} from '../../../../../domains/interfaces/nav-menu-items/IItems';

const VerticalMenuNavItems = (props: VerticalMenuNavItemsProptypes) => {
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  };

  // ** Render Nav Menu Items
  return <>{
    props.items && props.items.map((item: IItems, index: number) => {
      const TagName = Components[resolveNavItemComponent(item)];
      if (item.children && CanViewMenuGroup(item)) {
        return <TagName
          item={item}
          index={index}
          key={item.id}
          {...props}
        />;
      }
      return <TagName key={item.id || item.header} item={item} {...props} />;
    })
  }</>;
};

export default VerticalMenuNavItems;
