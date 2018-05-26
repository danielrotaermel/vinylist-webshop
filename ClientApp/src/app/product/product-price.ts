import { Deserializable } from "./deserializable";

/** @author Janina Wachendorfer */
export class ProductPrice implements Deserializable {
  currencyId: string;
  price: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
