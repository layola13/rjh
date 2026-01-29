/**
 * Extracts a slice of an array-like object into a new array.
 * 
 * @param target - The array-like object to slice
 * @param start - The beginning index of the slice
 * @param end - The ending index of the slice (optional, defaults to target length)
 * @returns A new array containing the sliced elements
 */
export function arraySlice<T>(
  target: ArrayLike<T>,
  start: number,
  end?: number
): T[] {
  const length = getLength(target);
  const startIndex = toIntegerOrInfinity(start, length);
  const endIndex = toIntegerOrInfinity(end !== undefined ? end : length, length);
  const resultArray: T[] = new Array(Math.max(endIndex - startIndex, 0));
  
  let resultIndex = 0;
  for (let currentIndex = startIndex; currentIndex < endIndex; currentIndex++, resultIndex++) {
    createDataProperty(resultArray, resultIndex, target[currentIndex]);
  }
  
  resultArray.length = resultIndex;
  return resultArray;
}

// Helper functions (assuming based on common polyfill patterns)

function toIntegerOrInfinity(value: number, maxValue: number): number {
  // Implementation would convert to integer and clamp
  return value;
}

function getLength(target: ArrayLike<unknown>): number {
  return target.length;
}

function createDataProperty<T>(target: T[], key: number, value: T): void {
  target[key] = value;
}