function pickProperties<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  
  for (const key of keys) {
    if (key in source) {
      result[key] = source[key];
    }
  }
  
  return result;
}

export default function pick<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> {
  return pickProperties(keys, (key: K) => source[key]);
}