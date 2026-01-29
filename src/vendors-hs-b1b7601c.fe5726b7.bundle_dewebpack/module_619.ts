export default function hashSet<T>(key: T): any {
  this.__data__.set(key, "__lodash_hash_undefined__");
  return this;
}