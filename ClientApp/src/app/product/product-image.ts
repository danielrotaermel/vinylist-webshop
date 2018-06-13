import { Deserializable } from './deserializable';

/** @author Janina Wachendorfer */
export class ProductImage implements Deserializable {
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
    return 'data:image/' + this.imageType + ';base64,' + this.base64String;
  }
}
