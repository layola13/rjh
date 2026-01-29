function arraySlice<T>(array: T[], start: number, end?: number): T[] {
  const length = array.length;
  const actualEnd = end === undefined ? length : end;
  const result: T[] = [];
  
  for (let i = start; i < actualEnd && i < length; i++) {
    result.push(array[i]);
  }
  
  return result;
}

type CompareFn<T> = (a: T, b: T) => number;

function insertionSort<T>(array: T[], compareFn: CompareFn<T>): T[] {
  const length = array.length;
  
  for (let currentIndex = 1; currentIndex < length; currentIndex++) {
    let insertIndex = currentIndex;
    const currentValue = array[currentIndex];
    
    while (insertIndex > 0 && compareFn(array[insertIndex - 1], currentValue) > 0) {
      array[insertIndex] = array[--insertIndex];
    }
    
    if (insertIndex !== currentIndex) {
      array[insertIndex] = currentValue;
    }
  }
  
  return array;
}

function merge<T>(
  target: T[],
  left: T[],
  right: T[],
  compareFn: CompareFn<T>
): T[] {
  const leftLength = left.length;
  const rightLength = right.length;
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < leftLength || rightIndex < rightLength) {
    if (leftIndex < leftLength && rightIndex < rightLength) {
      target[leftIndex + rightIndex] = compareFn(left[leftIndex], right[rightIndex]) <= 0
        ? left[leftIndex++]
        : right[rightIndex++];
    } else if (leftIndex < leftLength) {
      target[leftIndex + rightIndex] = left[leftIndex++];
    } else {
      target[leftIndex + rightIndex] = right[rightIndex++];
    }
  }
  
  return target;
}

function mergeSort<T>(array: T[], compareFn: CompareFn<T>): T[] {
  const length = array.length;
  const midpoint = Math.floor(length / 2);
  
  if (length < 8) {
    return insertionSort(array, compareFn);
  }
  
  const leftSorted = mergeSort(arraySlice(array, 0, midpoint), compareFn);
  const rightSorted = mergeSort(arraySlice(array, midpoint), compareFn);
  
  return merge(array, leftSorted, rightSorted, compareFn);
}

export default mergeSort;