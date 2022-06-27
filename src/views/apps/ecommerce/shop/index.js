import { Fragment, useState, useEffect } from 'react';

// ** Shop Components
import Sidebar from './Sidebar';
import Products from './Products';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../store';

import 'src/@core/scss/react/apps/app-ecommerce.scss';

const Shop = () => {
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const dispatch = useDispatch();
  const store = useSelector(state => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
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
