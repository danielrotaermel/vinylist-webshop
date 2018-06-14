import { IDeserializable } from './deserializable.model';

export class CreateUser implements IDeserializable {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
