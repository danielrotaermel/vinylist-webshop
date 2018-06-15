import { IDeserializable } from './deserializable.model';

export class User implements IDeserializable {
  userid: string;
  firstName: string;
  lastName: string;
  email: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
