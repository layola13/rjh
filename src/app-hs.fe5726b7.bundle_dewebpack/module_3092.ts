export default function forEach<T>(
  array: T[] | null | undefined,
  iteratee: (value: T, index: number, arr: T[]) => boolean | void
): T[] | null | undefined {
  const length = array == null ? 0 : array.length;
  
  for (let index = -1; ++index < length;) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  
  return array;
}