interface IterableEntry {
  0: PropertyKey;
  1: unknown;
}

function fromEntries<T = unknown>(entries: Iterable<readonly [PropertyKey, T]>): Record<PropertyKey, T> {
  const result: Record<PropertyKey, T> = {};
  
  for (const [key, value] of entries) {
    result[key] = value;
  }
  
  return result;
}

export { fromEntries };