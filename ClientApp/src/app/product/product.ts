import { ProductTranslation } from "./product-translation";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";
import { Deserializable } from "./deserializable";

/** @author Janina Wachendorfer */
export class Product implements Deserializable {
  artist: string;
  label: string;
  releaseDate: string;
  categoryId: string;
  imageId: string;
  id: string;
  translations: ProductTranslation[];
  image: ProductImage;
  prices: ProductPrice[];

  /**
   * Get Translations of product by language key.
   * If the given key doesn't match any of the translation's key,
   * the first available translation is returned.
   * @param key language key (de_DE or en_US)
   */
  public getTranslationByKey(key: string): ProductTranslation {
    let found = this.translations[0];
    this.translations.forEach(element => {
      if (element.getLanguageId() === key) {
        found = element;
      }
    });
    return found;
  }

  /**
   * Get Price of product by currency key.
   * If the given key doesn't match any of the price's keys,
   * the first available price is returned.
   * @param key Currency key (EUR or USD)
   */
  public getPriceByKey(key: string): ProductPrice {
    let found = this.prices[0];
    this.prices.forEach(element => {
      if (element.currencyId === key) {
        found = element;
      }
    });
    return found;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    this.translations = new Array<ProductTranslation>();

    input.translations.forEach(element => {
      this.translations.push(new ProductTranslation().deserialize(element));
    });

    this.image = new ProductImage();
    this.image.id = input.imageId;

    this.prices = new Array<ProductPrice>();
    input.prices.forEach(element => {
      this.prices.push(new ProductPrice().deserialize(element));
    });
    return this;
  }
}
