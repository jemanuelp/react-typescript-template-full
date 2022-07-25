import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/reducers/RootReducer';
import {handleNavbarType} from '../../redux/layout';
import {NavbarLayoutTypes} from '../../domains/enums/NavbarLayoutTypes';
import {Layout} from '../../configs/interfaces/Layout';

export interface useNavbarTypeInterface {
    navbarType: NavbarLayoutTypes;
    setNavbarType: Function;
}

export const useNavbarType = (): useNavbarTypeInterface => {
  const dispatch = useDispatch();
  const store: Layout = useSelector((state: RootState) => state.layout);

  const setNavbarType = (type: any) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbar.type, setNavbarType };
};
