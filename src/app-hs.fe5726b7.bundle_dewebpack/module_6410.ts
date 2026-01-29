export function cloneArrayBuffer<T extends ArrayLike<any> & { index?: number; input?: string }>(
  source: T
): T {
  const length = source.length;
  const clone = new (source.constructor as any)(length) as T;

  if (
    length &&
    typeof source[0] === "string" &&
    Object.prototype.hasOwnProperty.call(source, "index")
  ) {
    clone.index = source.index;
    clone.input = source.input;
  }

  return clone;
}