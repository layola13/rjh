export function resizeArray<T>(
  array: T[],
  newLength: number,
  initializer?: (index: number) => T
): T[] {
  const oldLength = array.length;
  array.length = newLength;
  
  if (initializer) {
    for (let index = oldLength; index < newLength; index++) {
      array[index] = initializer(index);
    }
  }
  
  return array;
}

export function isSameArray<T>(
  array1: T[],
  array2: T[],
  ordered: boolean = true,
  comparator: (a: T, b: T) => boolean = (a, b) => a === b
): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  
  if (!ordered) {
    const remaining = array2.slice();
    
    for (const item of array1) {
      const foundIndex = remaining.findIndex(element => comparator(item, element));
      
      if (foundIndex < 0) {
        return false;
      }
      
      remaining.splice(foundIndex, 1);
    }
    
    return remaining.length === 0;
  }
  
  for (let index = 0; index < array1.length; index++) {
    if (!comparator(array1[index], array2[index])) {
      return false;
    }
  }
  
  return true;
}

export function appendArray<T>(target: T[], source: T[]): T[] {
  const targetLength = target.length;
  const sourceLength = source.length;
  target.length = targetLength + sourceLength;
  
  for (let index = 0; index < sourceLength; index++) {
    target[index + targetLength] = source[index];
  }
  
  return target;
}