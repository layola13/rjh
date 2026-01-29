function functionBind<T extends (...args: any[]) => any>(
  fn: T,
  thisArg?: any
): T {
  assertCallable(fn);
  
  if (thisArg === undefined) {
    return fn;
  }
  
  if (nativeBind) {
    return nativeBind.call(fn, thisArg) as T;
  }
  
  return function (this: any, ...args: any[]) {
    return fn.apply(thisArg, args);
  } as T;
}

function assertCallable(value: unknown): asserts value is Function {
  if (typeof value !== 'function') {
    throw new TypeError(`${String(value)} is not a function`);
  }
}

const nativeBind = Function.prototype.bind;

export default functionBind;