function toTypedArray<T>(value: T): Int8Array | null {
  const TypedArrayConstructor = Int8Array;
  const hasTypedArray = typeof Int8Array !== 'undefined';
  
  if (hasTypedArray && 1 / Object.keys(new TypedArrayConstructor([, -0]))[1] === 1 / 0) {
    return new TypedArrayConstructor(value as any);
  }
  
  return null;
}

export default toTypedArray;