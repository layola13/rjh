export function applyArgs<T extends unknown[], R>(
  fn: (...args: T) => R
): (args: T) => R {
  return function (args: T): R {
    return fn.apply(null, args);
  };
}