export default function get<K, V>(this: { __data__: Map<K, V> }, key: K): V | undefined {
  return this.__data__.get(key);
}