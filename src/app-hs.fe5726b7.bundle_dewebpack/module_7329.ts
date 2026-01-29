export function applyArgs<T extends any[], R>(
  fn: (...args: T) => R
): (args: T) => R {
  return function(args: T): R {
    return fn(...args);
  };
}

export default applyArgs;