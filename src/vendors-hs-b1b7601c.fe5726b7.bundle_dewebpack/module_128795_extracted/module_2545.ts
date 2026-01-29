export function createArrayFromMapper<T>(length: number, mapper: (index: number) => T): T[] {
  const result: T[] = Array(length);
  
  for (let index = 0; index < length; index++) {
    result[index] = mapper(index);
  }
  
  return result;
}