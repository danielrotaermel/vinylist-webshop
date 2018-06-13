import { Product } from './../product/product';

export class Cart {
  public items: Product[] = [];
  public grossTotal: number = 0;
  public itemsTotal: number = 0;

  fromJson(jsonCart) {
    this.items = jsonCart.items;
    this.grossTotal = jsonCart.grossTotal;
    this.itemsTotal = jsonCart.itemsTotal;
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
}
