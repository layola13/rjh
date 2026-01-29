export function iterableToArray<T>(iterable: Iterable<T>): T[] | undefined {
  if (
    typeof Symbol !== "undefined" &&
    iterable[Symbol.iterator] != null ||
    (iterable as any)["@@iterator"] != null
  ) {
    return Array.from(iterable);
  }
  return undefined;
}

export default iterableToArray;