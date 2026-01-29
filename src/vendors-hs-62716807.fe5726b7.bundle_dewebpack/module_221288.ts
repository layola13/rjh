type TypeName = 'number' | 'object' | 'string' | 'boolean' | 'function' | 'undefined' | 'symbol' | 'bigint';

function getTypeName(value: unknown): TypeName {
  if (value === null) return 'object';
  return typeof value as TypeName;
}

function createNestedArray(dimensions: number[], fillValue: unknown, dimensionIndex: number): unknown[] {
  const size = dimensions[dimensionIndex] | 0;
  
  if (size <= 0) {
    return [];
  }

  const result = new Array(size);
  const isLastDimension = dimensionIndex === dimensions.length - 1;

  if (isLastDimension) {
    for (let i = 0; i < size; i++) {
      result[i] = fillValue;
    }
  } else {
    for (let i = 0; i < size; i++) {
      result[i] = createNestedArray(dimensions, fillValue, dimensionIndex + 1);
    }
  }

  return result;
}

function createFilledArray(length: number, fillValue: unknown): unknown[] {
  const result = new Array(length);
  
  for (let i = 0; i < length; i++) {
    result[i] = fillValue;
  }
  
  return result;
}

export default function createArray(shape: number | number[] | ArrayLike<number>, fillValue: unknown = 0): unknown[] {
  const shapeType = getTypeName(shape);

  switch (shapeType) {
    case 'number':
      if ((shape as number) > 0) {
        return createFilledArray((shape as number) | 0, fillValue);
      }
      break;

    case 'object':
      if (typeof (shape as ArrayLike<number>).length === 'number') {
        return createNestedArray(shape as number[], fillValue, 0);
      }
      break;
  }

  return [];
}