export function deleteEntry<T>(key: T): boolean {
  const data = this.__data__;
  const result = data.delete(key);
  this.size = data.size;
  return result;
}