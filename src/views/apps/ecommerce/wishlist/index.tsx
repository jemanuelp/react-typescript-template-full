import {Link} from 'react-router-dom';
import {Fragment, useEffect} from 'react';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
import classnames from 'classnames';
import {Star, X, ShoppingCart, Info} from 'react-feather';
import {Card, CardBody, CardText, Button, Alert} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getWishlistItems, deleteWishlistItem, addToCart, getCartItems} from '../store';
import '../../../../@core/scss/base/pages/app-ecommerce.scss';
import {ActionCreator} from '@reduxjs/toolkit';
import {RootState} from '../../../../redux/reducers/RootReducer';
import {InitialStateType} from '../models/InitialStateType';
import {UserWishlist} from '../models/UserWishlist';

const Wishlist = () => {
  const dispatch = useDispatch<ActionCreator<any>>();
  const store: InitialStateType = useSelector((state: RootState) => state.ecommerce);

  useEffect(() => {
    dispatch(getWishlistItems());
  }, []);

  // ** Handle Move/Add to cart
  const handleCartBtn = (id: number, val: boolean) => {
    if (!val) {
      dispatch(addToCart(id));
    }
    dispatch(getWishlistItems());
    dispatch(getCartItems());
  };

  // ** Renders wishlist products
  const renderWishlist = () => {
    return store.wishlist.map((item: UserWishlist) => {
      const CartBtnTag = item.isInCart ? Link : 'button';
      return (
        <Card className='ecommerce-card' key={item.name}>
          <div className='item-img text-center mx-auto'>
            <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
              <img className='img-fluid' src={item.image} alt={item.name}/>
            </Link>
          </div>
          <CardBody>
            <div className='item-wrapper'>
              <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill(1).map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item me-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating,
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='item-cost'>
                <h6 className='item-price'>$ {item.price}</h6>
              </div>
            </div>
            <div className='item-name'>
              <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>{item.name}</Link>
            </div>
            <CardText className='item-description'>{item.description}</CardText>
          </CardBody>
          <div className='item-options text-center'>
            <Button
              className='btn-wishlist remove-wishlist'
              color='light'
              onClick={() => {
                dispatch(deleteWishlistItem(item.id));
              }}
            >
              <X className='me-25' size={14}/>
              <span>Remove</span>
            </Button>
            <Button
              color='primary'
              tag={CartBtnTag}
              className='btn-cart move-cart'
              onClick={() => handleCartBtn(item.id, item.isInCart)}

              {...(item.isInCart ?
                {
                  to: '/apps/ecommerce/checkout',
                } :
                {})}
            >
              <ShoppingCart className='me-50' size={14}/>
              <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
            </Button>
          </div>
        </Card>
      );
    });
  };

  return (
    <Fragment>
      <BreadCrumbs title='Wishlist' data={[{title: 'eCommerce'}, {title: 'Wishlist'}]}/>
      {store.wishlist.length ?
        (
          <section className='grid-view wishlist-items'>{renderWishlist()}</section>
        ) :
        (
          <Alert color='info'>
            <div className='alert-body'>
              <Info size={14}/>
              <span className='align-middle ms-50'>Your Wishlist is empty</span>
            </div>
          </Alert>
        )}
    </Fragment>
  );
};

export default Wishlist;
