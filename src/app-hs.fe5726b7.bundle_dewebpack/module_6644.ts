type TransformFunction<T> = (data: T, context: unknown) => T;

function applyTransforms<T>(
  data: T,
  context: unknown,
  transforms: TransformFunction<T>[]
): T {
  let result = data;
  
  for (const transform of transforms) {
    result = transform(result, context);
  }
  
  return result;
}

export default applyTransforms;