type BaseType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

function getType(value: unknown): BaseType {
  return typeof value;
}

function getObjectTag(value: unknown): string {
  return Object.prototype.toString.call(value);
}

function isObjectLike(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

export function isSymbol(value: unknown): value is symbol {
  return getType(value) === 'symbol' || (isObjectLike(value) && getObjectTag(value) === '[object Symbol]');
}