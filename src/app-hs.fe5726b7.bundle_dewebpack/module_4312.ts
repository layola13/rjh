interface HashData {
  [key: string]: unknown;
}

interface Hash {
  __data__: HashData;
  size: number;
  has(key: string): boolean;
}

const HASH_UNDEFINED = "__lodash_hash_undefined__";

function hashSet(this: Hash, key: string, value: unknown): Hash {
  const data = this.__data__;
  
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  
  return this;
}

export default hashSet;