export default function deleteEntry<K, V>(this: { __data__: Map<K, V>; size: number }, key: K): boolean {
  const data = this.__data__;
  const wasDeleted = data.delete(key);
  this.size = data.size;
  return wasDeleted;
}