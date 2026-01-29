export default function setToArray<T>(set: Set<T>): T[] {
  let index = -1;
  const result = Array<T>(set.size);
  
  set.forEach((value: T): void => {
    result[++index] = value;
  });
  
  return result;
}