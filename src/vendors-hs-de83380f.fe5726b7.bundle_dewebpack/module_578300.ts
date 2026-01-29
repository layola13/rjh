export function toArray<T>(source: T[], length?: number): T[] {
  const actualLength = length == null || length > source.length ? source.length : length;
  const result = Array<T>(actualLength);
  
  for (let index = 0; index < actualLength; index++) {
    result[index] = source[index];
  }
  
  return result;
}