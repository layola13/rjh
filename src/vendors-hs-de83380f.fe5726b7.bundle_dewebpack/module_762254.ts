function omitProperties<T extends Record<string, unknown>>(
  source: T | null | undefined,
  propertiesToOmit: string[]
): Partial<T> {
  if (source == null) {
    return {};
  }

  const result: Partial<T> = {};

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (propertiesToOmit.indexOf(key) !== -1) {
        continue;
      }
      result[key] = source[key];
    }
  }

  return result;
}

export default omitProperties;