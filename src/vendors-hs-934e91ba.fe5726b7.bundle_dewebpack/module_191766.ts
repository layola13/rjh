export function cloneArrayBuffer<T extends ArrayLike<unknown> & { constructor: new (length: number) => T }>(
  source: T & { index?: number; input?: string }
): T & { index?: number; input?: string } {
  const length = source.length;
  const result = new source.constructor(length);

  if (
    length > 0 &&
    typeof source[0] === "string" &&
    Object.prototype.hasOwnProperty.call(source, "index")
  ) {
    result.index = source.index;
    result.input = source.input;
  }

  return result;
}