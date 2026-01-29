function createTypedArrayFromIterable<T>(iterable: Iterable<T>): T[] | Uint8Array {
  return Array.from(iterable);
}

export default createTypedArrayFromIterable;