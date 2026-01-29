export function isEqualString(a: string, b: string): boolean {
  return a === b;
}

export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }

  if (typeof value === 'number') {
    return isNaN(value);
  }

  if (typeof value === 'string') {
    return value === '';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return Object.keys(value).length === 0;
  }

  return !value;
}

export function difference<T>(source: T[], exclude: T[]): T[] {
  const result: T[] = [];
  
  for (const item of source) {
    if (!exclude.includes(item)) {
      result.push(item);
    }
  }
  
  return result;
}

export function isValidKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

export default {};