import {ColorOptionsTypes} from '../enums/ColorOptionsTypes';

export interface IProduct {
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
    colorOptions?: ColorOptionsTypes[];
    qty?: number;
    shippingDate?: Date;
    offers?: number;
    discountPercentage?: number;
}