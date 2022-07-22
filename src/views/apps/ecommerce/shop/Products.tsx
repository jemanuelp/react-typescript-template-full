import {Dispatch, Fragment, SetStateAction} from 'react';
import ProductCards from './ProductCards';
import ProductsHeader from './ProductsHeader';
import ProductsSearchbar from './ProductsSearchbar';
import classnames from 'classnames';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {addToCart, addToWishlist, deleteCartItem, deleteWishlistItem, getCartItems, getProducts} from '../store';
import {InitialStateType} from '../models/InitialStateType';
import {ActionCreator} from '@reduxjs/toolkit';

export type ProductsPageProps = {
  store: InitialStateType;
  dispatch: ActionCreator<any>;
  addToCart: addToCart;
  activeView: string;
  getProducts: getProducts;
  sidebarOpen: boolean;
  getCartItems: getCartItems;
  setActiveView: Dispatch<SetStateAction<string>>;
  addToWishlist: addToWishlist;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  deleteCartItem: deleteCartItem;
  deleteWishlistItem: deleteWishlistItem;
}

const ProductsPage = (props: ProductsPageProps) => {
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem,
  } = props;

  // ** Handles pagination
  const handlePageChange = (val: string) => {
    if (val === 'next') {
      dispatch(getProducts({ ...store.params, page: (store.params.page ?? 0) + 1 }));
    } else if (val === 'prev') {
      dispatch(getProducts({ ...store.params, page: (store.params.page ?? 1) - 1 }));
    } else {
      dispatch(getProducts({ ...store.params, page: Number(val) }));
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.totalProducts !== 0 && store.products.length !== 0 ?
        Number(store.totalProducts) / store.products.length :
        3;

    return new Array(Math.trunc(arrLength)).fill(1).map((item, index: number) => {
      return (
        <PaginationItem
          key={index}
          active={store.params.page === index + 1}
          onClick={() => handlePageChange(String(index + 1))}
        >
          <PaginationLink href='/' onClick={e => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // ** handle next page click
  const handleNext = () => {
    if (store.params.page !== Number(store.totalProducts) / store.products.length) {
      handlePageChange('next');
    }
  };

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen,
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar dispatch={dispatch} getProducts={getProducts} store={store} />
        {store.products.length ?
          (<Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.products}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              <PaginationItem
                disabled={store.params.page === 1}
                className='prev-item'
                onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                disabled={
                  store.params.page === Number(store.totalProducts) /
                    store.products.length
                }
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
          ) :
          (
            <div className='d-flex justify-content-center mt-2'>
              <p>No Results</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductsPage;
