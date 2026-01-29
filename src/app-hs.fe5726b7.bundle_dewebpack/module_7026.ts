export function compose<T, U, V>(
  outerFn: (value: U) => V,
  innerFn: (value: T) => U
): (input: T) => V {
  return function(input: T): V {
    return outerFn(innerFn(input));
  };
}