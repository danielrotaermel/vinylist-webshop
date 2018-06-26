/**
 * @author Daniel Rotärmel
 */
import { Product } from './../product/product';
import { IDeserializable } from './deserializable.model';

export class Cart implements IDeserializable {
  public items: Product[] = [];
  public grossTotal: number = 0;

  init() {
    this.items = [];
    this.grossTotal = 0;
    this.calculateGross();
  }

  public mergeProducts(products: Product[]) {
    this.items = Array.from(new Set(this.items.concat(products)));
    this.calculateGross();
  }

  public addProduct(product: Product) {
    if (!this.items.includes(product)) {
      this.items.push(product);
      this.calculateGross();
    }
  }

  public removeProduct(product: Product) {
    const index: number = this.items.indexOf(product);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.calculateGross();
    }
  }

  private calculateGross() {
    this.grossTotal = 0;
    this.items.forEach(item => {
      this.grossTotal += item.prices[0].price;
    });
  }

  deserialize(input: any) {
    input.items = input.items.map(item => {
      return new Product().deserialize(item);
    });

    Object.assign(this, input);

    return this;
  }
}
