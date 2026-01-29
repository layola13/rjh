function has(value: unknown): boolean {
  return indexOf(this.__data__, value) > -1;
}

function indexOf<T>(array: T[], searchElement: T): number {
  const length = array?.length ?? 0;
  
  for (let i = 0; i < length; i++) {
    if (array[i] === searchElement) {
      return i;
    }
  }
  
  return -1;
}

export default has;