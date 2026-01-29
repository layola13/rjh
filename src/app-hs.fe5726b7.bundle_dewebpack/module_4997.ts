export function deleteProperty<K extends PropertyKey>(this: { __data__: Record<PropertyKey, unknown>; size: number }, key: K): boolean {
  const wasDeleted = this.has(key) && delete this.__data__[key];
  this.size -= wasDeleted ? 1 : 0;
  return wasDeleted;
}