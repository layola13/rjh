export default function bind<T, A extends any[], R>(
  fn: (this: T, ...args: A) => R,
  context: T
): (...args: A) => R {
  return function (this: any, ...args: A): R {
    return fn.apply(context, args);
  };
}