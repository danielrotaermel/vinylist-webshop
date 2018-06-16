import { IDeserializable } from './deserializable.model';

export class Credentials implements IDeserializable {
  private email: string;
  private password: string;

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(pass: string) {
    this.password = pass;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
