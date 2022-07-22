export class UserWishlist {
  id: number;
  productId: number;
  isInCart: boolean = false;
  name?: string;
  slug?: string;
  image?: string;
  private _rating?: number;
  price?: number;
  description?: string;

  constructor(id: number, productId: number, isInCart: boolean = false, rating?: number) {
    this.id = id;
    this.productId = productId;
    this.isInCart = isInCart;
    this.rating = rating || 0;
  }

  get rating(): number {
    if (!this._rating) {
      return 0;
    }
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }
}