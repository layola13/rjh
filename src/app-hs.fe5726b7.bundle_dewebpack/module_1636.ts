export default function createArray<T>(shape: number | number[], fillValue: T = 0 as T): T[] | T[][] | T[][][] | any[] {
  if (typeof shape === 'number') {
    if (shape > 0) {
      return fillArrayWithValue(shape | 0, fillValue);
    }
  } else if (typeof shape === 'object' && typeof shape.length === 'number') {
    return createMultiDimensionalArray(shape, fillValue, 0);
  }
  
  return [];
}

function fillArrayWithValue<T>(size: number, value: T): T[] {
  const result: T[] = new Array(size);
  for (let i = 0; i < size; ++i) {
    result[i] = value;
  }
  return result;
}

function createMultiDimensionalArray<T>(
  dimensions: number[],
  fillValue: T,
  depth: number
): any[] {
  const size = dimensions[depth] | 0;
  
  if (size <= 0) {
    return [];
  }
  
  const result: any[] = new Array(size);
  
  if (depth === dimensions.length - 1) {
    for (let i = 0; i < size; ++i) {
      result[i] = fillValue;
    }
  } else {
    for (let i = 0; i < size; ++i) {
      result[i] = createMultiDimensionalArray(dimensions, fillValue, depth + 1);
    }
  }
  
  return result;
}