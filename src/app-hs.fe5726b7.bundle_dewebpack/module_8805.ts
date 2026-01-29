function baseDelete<T>(key: T): boolean {
  const data = this.__data__ as T[];
  const index = baseIndexOf(data, key);
  
  if (index < 0) {
    return false;
  }
  
  const lastIndex = data.length - 1;
  
  if (index === lastIndex) {
    data.pop();
  } else {
    data.splice(index, 1);
  }
  
  --this.size;
  
  return true;
}

function baseIndexOf<T>(array: T[], value: T): number {
  const length = array.length;
  let index = -1;
  
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  
  return -1;
}

export default baseDelete;