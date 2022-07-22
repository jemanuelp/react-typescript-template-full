import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IEcommerce} from '../models/IEcommerce';
import {ISearch} from '../../../../domains/interfaces/ISearch';
import {ProductType} from '../models/ProductType';
import {InitialStateType} from '../models/InitialStateType';

export const getProducts = createAsyncThunk('appEcommerce/getProducts', async(params: Partial<ISearch>) => {
  const response = await axios.get<IEcommerce>('/apps/ecommerce/products', { params });
  return { params, data: response.data };
});

export const addToCart = createAsyncThunk('appEcommerce/addToCart', async(id: number, { dispatch, getState }: any) => {
  const response = await axios.post('/apps/ecommerce/cart', { productId: id });
  await dispatch(getProducts(getState().ecommerce.params));
  return response.data;
});

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async() => {
  const response = await axios.get('/apps/ecommerce/wishlist');
  return response.data;
});

export const deleteWishlistItem = createAsyncThunk('appEcommerce/deleteWishlistItem', async(id: number, { dispatch }) => {
  const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`);
  dispatch(getWishlistItems());
  return response.data;
});

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async() => {
  const response = await axios.get('/apps/ecommerce/cart');
  return response.data;
});

export const getProduct = createAsyncThunk('appEcommerce/getProduct', async(slug: number) => {
  const response = await axios.get(`/apps/ecommerce/products/${slug}`);
  return response.data;
});

export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async(id: number) => {
  await axios.post('/apps/ecommerce/wishlist', { productId: id });
  return id;
});

export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async(id: number, { dispatch }) => {
  await axios.delete(`/apps/ecommerce/cart/${id}`);
  dispatch(getCartItems());
  return id;
});

const initialState: InitialStateType = {
  cart: [],
  params: {} as ISearch,
  products: [],
  wishlist: [],
  totalProducts: 0,
  productDetail: {} as ProductType,
};

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.params = action.payload.params;
        state.products = action.payload.data.products;
        state.totalProducts = action.payload.data.total;
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product;
      });
  },
});

export default appEcommerceSlice.reducer;

export type addToCart = typeof addToCart;
export type getProduct = typeof getProduct;
export type addToWishlist = typeof addToWishlist;
export type deleteWishlistItem = typeof deleteWishlistItem;
export type getProducts = typeof getProducts;
export type getCartItems = typeof getCartItems;
export type deleteCartItem = typeof deleteCartItem;
