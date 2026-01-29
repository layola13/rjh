export function createArrayWithMapper<T>(length: number, mapFn: (index: number) => T): T[] {
  const result: T[] = Array(length);
  
  for (let i = 0; i < length; i++) {
    result[i] = mapFn(i);
  }
  
  return result;
}