export function copyArray<T>(source: T[], array?: T[]): T[] {
  let index = -1;
  const length = source.length;
  const result = array || Array<T>(length);
  
  while (++index < length) {
    result[index] = source[index];
  }
  
  return result;
}