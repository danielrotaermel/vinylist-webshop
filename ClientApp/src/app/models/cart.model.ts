import { Product } from './../product/product';

export class Cart {
  public items: Product[] = [];
  public grossTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
    this.itemsTotal = src.itemsTotal;
  }

  public merge(src: Cart) {
    this.items = Array.from(new Set(src.items.concat(this.items)));
  }
}
