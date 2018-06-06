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
  id: string;
  languages: ProductTranslation[];
  image: ProductImage;
  prices: ProductPrice[];

  /**
   * Get Translations of product by language key.
   * If the given key doesn't match any of the translation's key,
   * the first available translation is returned.
   * @param key language key (de_DE or en_US)
   */
  public getTranslationByKey(key: string): ProductTranslation {
    let found = this.languages[0];
    this.languages.forEach(element => {
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

  /**
   * Splits date string into an array containing year, month and day.
   * The following timestamp is ignored
   */
  public getFormattedDate(): string[] {
    var splittedTime = this.releaseDate.split("T", 2);
    var splittedDate = splittedTime[0].split("-", 3);
    return splittedDate;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    this.languages = new Array<ProductTranslation>();

    input.languages.forEach(element => {
      this.languages.push(new ProductTranslation().deserialize(element));
    });

    this.image = new ProductImage().deserialize(input.image);
    this.prices = new Array<ProductPrice>();
    input.prices.forEach(element => {
      this.prices.push(new ProductPrice().deserialize(element));
    });
    return this;
  }
}
