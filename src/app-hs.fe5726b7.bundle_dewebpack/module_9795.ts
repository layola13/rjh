export function hasOwnProperty<T extends object>(obj: T, key: PropertyKey): boolean {
  const hasOwnProp = Object.prototype.hasOwnProperty;
  return obj != null && hasOwnProp.call(obj, key);
}