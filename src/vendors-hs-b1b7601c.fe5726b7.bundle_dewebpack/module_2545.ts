export function createArray<T>(length: number, iteratee: (index: number) => T): T[] {
  const result: T[] = Array(length);
  
  for (let index = 0; index < length; index++) {
    result[index] = iteratee(index);
  }
  
  return result;
}