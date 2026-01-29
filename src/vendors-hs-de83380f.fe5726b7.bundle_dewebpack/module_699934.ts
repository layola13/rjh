export default function arrayLikeToArray<T>(array: ArrayLike<T>, length?: number): T[] {
  const len = length == null || length > array.length ? array.length : length;
  const result: T[] = Array(len);
  
  for (let i = 0; i < len; i++) {
    result[i] = array[i];
  }
  
  return result;
}