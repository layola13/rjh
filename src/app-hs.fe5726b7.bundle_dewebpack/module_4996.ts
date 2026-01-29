function cloneTypedArray<T extends TypedArray>(
  typedArray: T,
  isDeep: boolean,
  cloneArrayBuffer: (buffer: ArrayBuffer) => ArrayBuffer
): T {
  const buffer = isDeep 
    ? cloneArrayBuffer(typedArray.buffer) 
    : typedArray.buffer;
  
  return new (typedArray.constructor as TypedArrayConstructor)(
    buffer,
    typedArray.byteOffset,
    typedArray.byteLength
  ) as T;
}

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

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

export default cloneTypedArray;