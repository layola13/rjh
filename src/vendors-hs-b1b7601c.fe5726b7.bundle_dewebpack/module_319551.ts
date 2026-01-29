export function createObject<K extends PropertyKey, V>(
  keys: readonly K[],
  values: readonly V[]
): Record<K, V> {
  return keys.reduce((accumulator, key, index) => {
    accumulator[key] = values[index];
    return accumulator;
  }, {} as Record<K, V>);
}