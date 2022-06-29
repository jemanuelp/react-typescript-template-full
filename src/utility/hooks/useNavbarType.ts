import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/reducers/RootReducer';
import {handleNavbarType} from '../../redux/layout';
import {TypeNavbarLayoutTypes} from '../../domains/enums/TypeNavbarLayoutTypes';

export interface useNavbarTypeInterface {
    navbarType: TypeNavbarLayoutTypes;
    setNavbarType: Function;
}

export const useNavbarType = (): useNavbarTypeInterface => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setNavbarType = (type: any) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbar.type, setNavbarType };
};
