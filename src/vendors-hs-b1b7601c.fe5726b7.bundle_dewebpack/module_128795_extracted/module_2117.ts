function listCacheGet<T>(key: string): T | undefined {
  const data = this.__data__ as Array<[string, T]>;
  const index = findIndex(data, key);
  return index < 0 ? undefined : data[index][1];
}

function findIndex<T>(array: Array<[string, T]>, key: string): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === key) {
      return i;
    }
  }
  return -1;
}

export { listCacheGet };