import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ItemFeatures from './ItemFeatures';
import ProductDetails from './ProductDetails';
import RelatedProducts from './RelatedProducts';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
import { Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store';
import '../../../../@core/scss/base/pages/app-ecommerce-details.scss';
import { RootState } from '../../../../redux/reducers/RootReducer';
import {InitialStateType} from '../models/InitialStateType';

const Details = () => {
  const params: any = useParams().product;
  const productId = Number(params.substring(params.lastIndexOf('-') + 1) ?? 0);

  const dispatch = useDispatch();
  const store: InitialStateType = useSelector((state: RootState) => state.ecommerce);

  useEffect(() => {
    dispatch<any>(getProduct(productId));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs title='Product Details' data={[{ title: 'eCommerce' }, { title: 'Details' }]} />
      <div className='app-ecommerce-details'>
        {Object.keys(store.productDetail).length ?
          (<Card>
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
          ) :
          null}
      </div>
    </Fragment>
  );
};

export default Details;
