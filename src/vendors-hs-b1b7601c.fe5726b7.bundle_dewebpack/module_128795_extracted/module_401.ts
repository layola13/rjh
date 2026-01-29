interface HashMapData {
  __data__: Record<string, unknown>;
  size: number;
  has(key: string): boolean;
}

function hashDelete(this: HashMapData, key: string): boolean {
  const hasKey = this.has(key) && delete this.__data__[key];
  this.size -= hasKey ? 1 : 0;
  return hasKey;
}

export default hashDelete;