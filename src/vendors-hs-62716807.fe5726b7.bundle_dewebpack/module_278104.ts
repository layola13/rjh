export function getFieldId(fields: string[], prefix?: string): string | undefined {
  if (!fields.length) {
    return undefined;
  }
  
  const joined = fields.join("_");
  return prefix ? `${prefix}_${joined}` : joined;
}

export function toArray<T>(value: T | T[] | undefined | false): T[] {
  if (value === undefined || value === false) {
    return [];
  }
  
  return Array.isArray(value) ? value : [value];
}