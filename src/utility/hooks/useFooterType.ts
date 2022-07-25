import { handleFooterType } from '../../redux/layout';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../redux/reducers/RootReducer';
import {FooterLayoutTypes} from '../../domains/enums/FooterLayoutTypes';
import {Layout} from '../../configs/interfaces/Layout';

export interface useFooterTypeInterface {
  footerType: FooterLayoutTypes;
  setFooterType: Function;
}

export const useFooterType = (): useFooterTypeInterface => {
  const dispatch = useDispatch();
  const store : Layout = useSelector((state: RootState) => state.layout);

  const setFooterType = (type: FooterLayoutTypes) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footer.type };
};
