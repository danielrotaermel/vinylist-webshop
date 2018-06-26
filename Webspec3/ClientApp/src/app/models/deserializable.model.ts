/**
 * @author Daniel Rotärmel
 */

export interface IDeserializable {
  deserialize(input: any): this;
}
