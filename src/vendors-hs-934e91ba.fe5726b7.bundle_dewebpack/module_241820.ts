const HASH_UNDEFINED = "__lodash_hash_undefined__";

interface HashData {
  [key: string]: unknown;
}

interface Hash {
  __data__: HashData;
  size: number;
  has(key: string): boolean;
}

function hashSet(this: Hash, key: string, value: unknown): Hash {
  const data = this.__data__;
  
  if (!this.has(key)) {
    this.size += 1;
  }
  
  data[key] = value === undefined ? HASH_UNDEFINED : value;
  
  return this;
}

export default hashSet;