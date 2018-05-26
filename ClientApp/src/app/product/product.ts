import { ProductTranslation } from "./product-translation";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";

/** @author Janina Wachendorfer */
export class Product {
  artist: string;
  label: string;
  releaseDate: string;
  categoryId: string;
  imageId: string;
  id: string;
  translations: ProductTranslation[];
  image: ProductImage;
  prices: ProductPrice[];
}
