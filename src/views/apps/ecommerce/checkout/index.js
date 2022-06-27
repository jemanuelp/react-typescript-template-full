import { Fragment, useEffect, useRef, useState } from 'react';

import Wizard from 'src/@core/components/wizard';
import BreadCrumbs from 'src/@core/components/breadcrumbs';

import Cart from './steps/Cart';
import Address from './steps/Address';
import Payment from './steps/Payment';

import { ShoppingCart, Home, CreditCard } from 'react-feather';

import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store';

import 'src/@core/scss/base/pages/app-ecommerce.scss';

const Checkout = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);

  const dispatch = useDispatch();
  const store = useSelector(state => state.ecommerce);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const steps = [
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      )
    },
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: <Address stepper={stepper} />
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: <Payment stepper={stepper} />
    }
  ];

  return (
    <Fragment>
      <BreadCrumbs title='Checkout' data={[{ title: 'eCommerce' }, { title: 'Checkout' }]} />
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
};

export default Checkout;
