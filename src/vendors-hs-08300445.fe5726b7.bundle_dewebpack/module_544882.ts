export function flattenNames(names: Array<string | Record<string, unknown> | Array<any>> = []): string[] {
  const result: string[] = [];

  for (const item of names) {
    if (Array.isArray(item)) {
      flattenNames(item).forEach((flattenedItem) => {
        result.push(flattenedItem);
      });
    } else if (isPlainObject(item)) {
      Object.entries(item).forEach(([key, value]) => {
        if (value === true) {
          result.push(key);
        }
        result.push(`${key}-${value}`);
      });
    } else if (isString(item)) {
      result.push(item);
    }
  }

  return result;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export default flattenNames;