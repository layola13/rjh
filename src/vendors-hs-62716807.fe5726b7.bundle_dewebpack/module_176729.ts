function assertConstructor<T extends abstract new (...args: any) => any>(value: unknown): T {
  if (isConstructor(value)) {
    return value as T;
  }
  throw new TypeError(`${toString(value)} is not a constructor`);
}

function isConstructor(value: unknown): value is abstract new (...args: any) => any {
  // Implementation depends on module 334586
  return typeof value === 'function';
}

function toString(value: unknown): string {
  // Implementation depends on module 920174
  return String(value);
}

export default assertConstructor;