import { nativeCreate } from './nativeCreate';

interface HashData {
  [key: string]: unknown;
}

interface Hash {
  __data__: HashData;
  size: number;
  has(key: string): boolean;
}

export function hashSet(this: Hash, key: string, value: unknown): Hash {
  const data = this.__data__;
  const HASH_UNDEFINED = '__lodash_hash_undefined__';
  
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  
  return this;
}