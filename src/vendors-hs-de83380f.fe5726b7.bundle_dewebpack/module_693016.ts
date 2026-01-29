export function toArray<T>(value: T): T | undefined {
  if (Array.isArray(value)) {
    return value;
  }
  return undefined;
}