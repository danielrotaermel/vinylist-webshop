import { IDeserializable } from './../models/deserializable.model';

/** @author Janina Wachendorfer */
export class ProductImage implements IDeserializable {
  id: string;
  description: string;
  base64String: string;
  imageType: string;

  getId(): string {
    return this.id;
  }

  getDescription(): string {
    return this.description;
  }

  getBase64String(): string {
    return this.base64String;
  }

  getImageType(): string {
    return this.imageType;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  getImageDataString(): string {
    return 'data:' + this.imageType + ';base64,' + this.base64String;
  }
}
