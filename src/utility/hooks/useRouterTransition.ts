import { useDispatch, useSelector } from 'react-redux';
import {handleRouterTransition} from '../../redux/layout';
import {RootState} from '../../redux/reducers/RootReducer';
import {Layout} from '../../configs/interfaces/Layout';

export const useRouterTransition = () => {
  const dispatch = useDispatch();
  const store : Layout = useSelector((state: RootState) => state.layout);

  const setTransition = (type: any) => {
    dispatch(handleRouterTransition(type));
  };

  return { transition: store.routerTransition, setTransition };
};
