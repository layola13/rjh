function mapValues<T, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    result[key] = source[key];
    return result;
  }, {} as Pick<T, K>);
}

export default function selectProperties<T extends Record<string, unknown>, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  return mapValues(source, keys);
}