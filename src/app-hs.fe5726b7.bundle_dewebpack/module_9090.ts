export function mapToArray<K, V>(map: Map<K, V>): Array<[K, V]> {
  let index = -1;
  const result: Array<[K, V]> = Array(map.size);
  
  map.forEach((value: V, key: K) => {
    result[++index] = [key, value];
  });
  
  return result;
}