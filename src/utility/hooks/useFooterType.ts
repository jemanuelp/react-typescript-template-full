import { handleFooterType } from '../../redux/layout';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/reducers/RootReducer';
import {TypeFooterLayoutTypes} from '../../domains/enums/FooterLayoutTypes';

export interface useFooterTypeInterface {
  footerType: TypeFooterLayoutTypes;
  setFooterType: Function;
}

export const useFooterType = (): useFooterTypeInterface => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setFooterType = (type: TypeFooterLayoutTypes) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footer.type };
};
