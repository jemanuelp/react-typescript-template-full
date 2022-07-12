import { useDispatch, useSelector } from 'react-redux';
import { handleLayout, handleLastLayout } from '../../redux/layout';
import {RootState} from '../../redux/reducers/RootReducer';
import {LayoutTypes, layoutTypes} from '../../domains/enums/LayoutTypes';
import {useCallback, useEffect} from 'react';
import {Layout} from '../../configs/interfaces/Layout';

export const useLayout = () => {
  const dispatch = useDispatch();
  const store: Layout = useSelector((state: RootState) => state.layout);

  const setLayout = (value: LayoutTypes) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value: LayoutTypes) => {
    dispatch(handleLastLayout(value));
  };

  const handleLayoutUpdate = useCallback(() => {
    // ** If layout is horizontal & screen size is equals to or below 1200
    if (store.type === layoutTypes.horizontal && window.innerWidth <= 1200) {
      setLayout('vertical');
      setLastLayout(layoutTypes.horizontal);
    }
    // ** If lastLayout is horizontal & screen size is equals to or above 1200
    if (store.lastLayout === layoutTypes.horizontal && window.innerWidth >= 1200) {
      setLayout(layoutTypes.horizontal);
    }
  }, []);

  // ** ComponentDidMount
  useEffect(() => {
    handleLayoutUpdate();
  }, []);

  useEffect(() => {
    // ** Window Resize Event
    window.addEventListener('resize', handleLayoutUpdate);
  }, [store.type, store.lastLayout]);

  if (window) {
    const breakpoint = 1200;

    if (window.innerWidth < breakpoint) {
      setLayout('vertical');
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= breakpoint && store.lastLayout !== 'vertical' && store.type !== 'vertical') {
        setLayout('vertical');
      }
      if (
        window.innerWidth >= breakpoint &&
          store.lastLayout &&
          store.lastLayout !== store.type
      ) {
        setLayout(store.lastLayout);
      }
    });
  }

  return {
    layoutType: store.type,
    setLayout,
    lastLayoutType: store.lastLayout,
    setLastLayout,
  };
};
