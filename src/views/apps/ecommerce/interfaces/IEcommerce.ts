import {IProduct} from './IProduct';
import {IUserWishlist} from './IUserWishlist';
import {IUserCart} from './IUserCart';

export interface IEcommerce {
  products: IProduct[],
  userWishlist: IUserWishlist[],
  userCart: IUserCart[],
  total?: number,
}