function map<T, U>(array: T[], iteratee: (value: T, index: number, array: T[]) => U): U[] {
  const length = array?.length ?? 0;
  const result = new Array<U>(length);
  
  for (let index = 0; index < length; index++) {
    result[index] = iteratee(array[index], index, array);
  }
  
  return result;
}

export default map;