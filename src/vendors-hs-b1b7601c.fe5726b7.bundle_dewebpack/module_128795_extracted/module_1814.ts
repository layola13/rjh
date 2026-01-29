export function setToArray<T>(set: Set<T>): T[] {
  let index = -1;
  const array = Array<T>(set.size);
  
  set.forEach((value: T) => {
    array[++index] = value;
  });
  
  return array;
}