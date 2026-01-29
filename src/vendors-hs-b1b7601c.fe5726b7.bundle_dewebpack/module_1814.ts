export function convertSetToArray<T>(set: Set<T>): T[] {
  let index = -1;
  const result: T[] = Array(set.size);
  
  set.forEach((element: T): void => {
    result[++index] = element;
  });
  
  return result;
}