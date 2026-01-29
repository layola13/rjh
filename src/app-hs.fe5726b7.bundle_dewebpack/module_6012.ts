type TransformFunction<T, R> = (input: T) => R;

function createTransformer<T, R>(transformFn: TransformFunction<T, R>): (value: T) => R {
  return function(value: T): R {
    return transformFn(value, transformFn);
  };
}

export default createTransformer;