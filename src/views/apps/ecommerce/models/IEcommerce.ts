import {ProductType} from './ProductType';
import {UserWishlist} from './UserWishlist';
import {IUserCart} from './IUserCart';

export interface IEcommerce {
  products: ProductType[],
  userWishlist: UserWishlist[],
  userCart: IUserCart[],
  total?: number,
}