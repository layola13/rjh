function keys<T>(obj: Record<string, T>): Iterator<T> {
  const result: T[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(obj[key]);
    }
  }
  
  return result[Symbol.iterator]();
}