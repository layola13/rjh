export function createApplicator<T, R>(fn: (arg: T) => R): (value: T) => R {
  return function(value: T): R {
    return fn(value);
  };
}