export function hasProperty<T extends object>(value: T | null | undefined, property: PropertyKey): boolean {
  return value != null && property in Object(value);
}