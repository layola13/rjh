type TransformFunction<T> = (data: T, config: unknown) => T;

function applyTransforms<T>(
  data: T,
  config: unknown,
  transforms: TransformFunction<T>[]
): T {
  let result = data;
  
  for (const transform of transforms) {
    result = transform(result, config);
  }
  
  return result;
}

export default applyTransforms;