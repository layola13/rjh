export default function<K, V>(this: { __data__: Map<K, V>; size: number }, key: K): boolean {
  const data = this.__data__;
  const deleted = data.delete(key);
  this.size = data.size;
  return deleted;
}