import { nativeCreate } from './nativeCreate';

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
  
  this.size += this.has(key) ? 0 : 1;
  
  data[key] = nativeCreate && value === undefined 
    ? "__lodash_hash_undefined__" 
    : value;
  
  return this;
}

export { hashSet };