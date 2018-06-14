import { IDeserializable } from './../models/deserializable.model';
import { Product } from './product';

/** @author Janina Wachendorfer */
export class Category implements IDeserializable {
  title: string;
  products: Product[];
  id: string;

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
