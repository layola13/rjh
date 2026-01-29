function processObjectEntries<T extends Record<string, unknown>>(obj: T): Array<[string, unknown, boolean]> {
  const keys = Object.keys(obj);
  const length = keys.length;
  
  for (let index = length - 1; index >= 0; index--) {
    const key = keys[index];
    const value = obj[key];
    keys[index] = [key, value, isStrictComparable(value)] as any;
  }
  
  return keys as any;
}

function isStrictComparable(value: unknown): boolean {
  return value === value && (typeof value !== 'object' || value === null);
}

export default processObjectEntries;