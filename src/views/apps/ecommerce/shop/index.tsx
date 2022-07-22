import { Fragment, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Products from './Products';
import Breadcrumbs from '../../../../@core/components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../store';
import '../../../../@core/scss/react/apps/app-ecommerce.scss';
import { ActionCreator } from '@reduxjs/toolkit';
import { RootState } from '../../../../redux/reducers/RootReducer';

const Shop = () => {
  const [activeView, setActiveView] = useState<string>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch<ActionCreator<any>>();
  const store = useSelector((state: RootState) => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1,
      }),
    );
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumbs title='Shop' data={[{ title: 'eCommerce' }, { title: 'Shop' }]} />
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      <Sidebar sidebarOpen={sidebarOpen} />
    </Fragment>
  );
};
export default Shop;
