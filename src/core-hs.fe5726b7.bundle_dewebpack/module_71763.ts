function ensureConstructor<T extends abstract new (...args: any) => any>(value: unknown): T {
  if (typeof value === 'function' && (value.prototype !== undefined || value.toString().startsWith('class'))) {
    return value as T;
  }
  
  throw new TypeError(`${String(value)} is not a constructor`);
}

export default ensureConstructor;