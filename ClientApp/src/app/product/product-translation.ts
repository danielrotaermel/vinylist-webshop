import { Deserializable } from "./deserializable";

/** @author Janina Wachendorfer */
export class ProductTranslation implements Deserializable {
  private description: string;
  private descriptionShort: string;
  private languageId: string;
  private title: string;

  getDescription(): string {
    return this.description;
  }

  getDescriptionShort(): string {
    return this.descriptionShort;
  }

  getLanguageId(): string {
    return this.languageId;
  }

  getTitle(): string {
    return this.title;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
