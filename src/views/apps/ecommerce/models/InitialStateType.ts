import {IUserCart} from './IUserCart';
import {ISearch} from '../../../../domains/interfaces/ISearch';
import {ProductType} from './ProductType';
import {UserWishlist} from './UserWishlist';

export type InitialStateType = {
  cart: IUserCart[];
  params: Partial<ISearch>;
  products: ProductType[];
  wishlist: UserWishlist[];
  totalProducts?: number;
  productDetail: ProductType;
}