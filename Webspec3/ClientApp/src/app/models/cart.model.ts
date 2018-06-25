/**
 * @author Daniel Rotärmel
 */
import { Product } from './../product/product';
import { IDeserializable } from './deserializable.model';


export class Cart implements IDeserializable {
  public items: Product[] = [];
  public grossTotal: number = 0;
  public itemsTotal: number = 0;

  fromJson(jsonCart) {
    this.items = jsonCart.items;
    this.grossTotal = jsonCart.grossTotal;
    this.itemsTotal = jsonCart.itemsTotal;

    return this;
  }

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
    this.itemsTotal = src.itemsTotal;
  }

  public mergeProducts(products: Product[]) {
    this.items = Array.from(new Set(this.items.concat(products)));
    this.itemsTotal = this.items.length;
  }

  public addProduct(product: Product) {
    if (!this.items.includes(product)) {
      this.items.push(product);
      this.itemsTotal = this.items.length;
    }
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
