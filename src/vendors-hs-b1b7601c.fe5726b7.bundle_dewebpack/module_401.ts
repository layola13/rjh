interface HashCollection<T = any> {
  __data__: Record<string, T>;
  size: number;
  has(key: string): boolean;
}

function deleteFromHash<T>(this: HashCollection<T>, key: string): boolean {
  const exists = this.has(key) && delete this.__data__[key];
  this.size -= exists ? 1 : 0;
  return exists;
}

export default deleteFromHash;