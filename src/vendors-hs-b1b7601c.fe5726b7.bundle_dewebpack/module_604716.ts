export function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return (
    typeof Symbol.asyncIterator !== 'undefined' &&
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any)[Symbol.asyncIterator] === 'function'
  );
}