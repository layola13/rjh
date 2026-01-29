export function not<T>(
  predicate: (value: T, index: number) => boolean,
  context?: unknown
): (value: T, index: number) => boolean {
  return function(value: T, index: number): boolean {
    return !predicate.call(context, value, index);
  };
}