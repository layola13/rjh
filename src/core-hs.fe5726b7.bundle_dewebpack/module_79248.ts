function createTypedArray<T extends TypedArrayConstructor>(
  constructor: T,
  length: number
): InstanceType<T> {
  return new constructor(length === 0 ? 0 : length);
}

type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | BigInt64ArrayConstructor
  | BigUint64ArrayConstructor;

export default createTypedArray;