/** @author Janina Wachendorfer */
export class ProductTranslation {
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
}
