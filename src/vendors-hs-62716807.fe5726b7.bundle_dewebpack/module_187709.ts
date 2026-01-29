export function requireObjectCoercible<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new TypeError(`Can't call method on ${value}`);
  }
  return value as NonNullable<T>;
}