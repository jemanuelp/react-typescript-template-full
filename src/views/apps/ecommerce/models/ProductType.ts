import {ColorOptionsTypes} from '../../../../domains/enums/ColorOptionsTypes';

export class ProductType {
  id: number;
  name: string;
  slug: string;
  description: string;
  brand: string;
  price: number;
  image: string;
  hasFreeShipping: boolean;
  rating: number;
  isInWishlist?: boolean;
  isInCart?: boolean;
  colorOptions: ColorOptionsTypes[] = [];
  qty?: number;
  shippingDate?: Date;
  offers?: number;
  discountPercentage?: number;
  
  constructor(id: number,
    name: string,
    slug: string,
    description: string,
    brand: string,
    price: number,
    image: string,
    hasFreeShipping: boolean,
    rating: number,
    colorOptions: ColorOptionsTypes[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.brand = brand;
    this.price = price;
    this.image = image;
    this.hasFreeShipping = hasFreeShipping;
    this.rating = rating;
    this.colorOptions = colorOptions;
  }
}