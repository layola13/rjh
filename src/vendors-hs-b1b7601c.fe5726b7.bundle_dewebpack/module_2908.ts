export function some<T>(
  array: T[] | null | undefined,
  predicate: (value: T, index: number, array: T[]) => boolean
): boolean {
  const length = array == null ? 0 : array.length;
  
  for (let index = 0; index < length; index++) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  
  return false;
}