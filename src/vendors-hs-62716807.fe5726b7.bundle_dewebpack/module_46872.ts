export default Function.prototype.bind || function bind<T>(this: T, thisArg: unknown, ...args: unknown[]): T {
  const target = this;
  if (typeof target !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  
  return function bound(this: unknown, ...boundArgs: unknown[]): unknown {
    return target.apply(thisArg, [...args, ...boundArgs]);
  } as T;
};