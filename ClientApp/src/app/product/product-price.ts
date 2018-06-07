import { Deserializable } from "./deserializable";

/** @author Janina Wachendorfer */
export class ProductPrice implements Deserializable {
  currencyId: string;
  price: number;

  /**
   * Formats price to appear with 2 fraction digits.
   * Checks currencyId to set Currency to "€" or "$";
   * if the currencyId is not "EUR", the default currency (Dollar) is used
   */
  getFormattedPrice(): string {
    if (this.currencyId === "EUR") {
      return this.price.toFixed(2) + "€";
    }
    return this.price.toFixed(2) + "$";
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
