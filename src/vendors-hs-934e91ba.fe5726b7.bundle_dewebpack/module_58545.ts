export function deleteProperty<K extends string>(this: { __data__: Record<K, unknown>; size: number }, key: K): boolean {
  const hasKey = this.has(key) && delete this.__data__[key];
  this.size -= hasKey ? 1 : 0;
  return hasKey;
}