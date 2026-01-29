export function isIterable(value: unknown): boolean {
  return typeof value?.[Symbol.iterator] === 'function';
}