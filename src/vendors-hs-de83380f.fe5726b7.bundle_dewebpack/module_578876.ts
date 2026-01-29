export function omit<T extends Record<string, any>, K extends keyof T>(
  source: T | null | undefined,
  keysToOmit: K[]
): Omit<T, K> {
  if (source == null) {
    return {} as Omit<T, K>;
  }

  const result: Record<string, any> = {};

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (keysToOmit.indexOf(key as K) !== -1) {
        continue;
      }
      result[key] = source[key];
    }
  }

  return result as Omit<T, K>;
}

export default omit;