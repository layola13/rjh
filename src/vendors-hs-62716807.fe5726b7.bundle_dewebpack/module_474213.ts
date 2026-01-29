type AnyFunction = (...args: any[]) => any;

function functionBind<T extends AnyFunction>(
  fn: T,
  thisArg?: any
): T {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  if (thisArg === undefined) {
    return fn;
  }

  if (typeof Function.prototype.bind === 'function') {
    return fn.bind(thisArg) as T;
  }

  return function(this: any, ...args: any[]): any {
    return fn.apply(thisArg, args);
  } as T;
}

export default functionBind;