const HASH_UNDEFINED = '__lodash_hash_undefined__';

interface HashData {
  [key: string]: unknown;
}

class Hash {
  private __data__: HashData;

  constructor() {
    this.__data__ = {};
  }

  get(key: string): unknown {
    const data = this.__data__;
    const value = data[key];
    
    return value === HASH_UNDEFINED ? undefined : value;
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.__data__, key);
  }
}

export function hashGet(this: Hash, key: string): unknown {
  const data = this.__data__;
  const value = data[key];
  
  return value === HASH_UNDEFINED ? undefined : value;
}

export default hashGet;