const HASH_UNDEFINED = '__lodash_hash_undefined__';

export function hashGet<T = any>(this: { __data__: Record<string, T | typeof HASH_UNDEFINED> }, key: string): T | undefined {
  const data = this.__data__;
  
  if (nativeCreate) {
    const value = data[key];
    return value === HASH_UNDEFINED ? undefined : value;
  }
  
  return hasOwnProperty.call(data, key) ? data[key] as T : undefined;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const nativeCreate = getNativeCreate();

function getNativeCreate(): boolean {
  // Placeholder for module 4536 implementation
  // Returns whether native Object.create is available
  return typeof Object.create === 'function';
}