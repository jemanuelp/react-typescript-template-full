import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ItemFeatures from './ItemFeatures';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import BreadCrumbs from 'src/@core/components/breadcrumbs';
import { Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store';

import 'src/@core/scss/base/pages/app-ecommerce-details.scss';

const Details = () => {
  const params = useParams().product;
  const productId = params.substring(params.lastIndexOf('-') + 1);

  const dispatch = useDispatch();
  const store = useSelector(state => state.ecommerce);

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs title='Product Details' data={[{ title: 'eCommerce' }, { title: 'Details' }]} />
      <div className='app-ecommerce-details'>
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            <CardBody>
              <RelatedProducts />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
