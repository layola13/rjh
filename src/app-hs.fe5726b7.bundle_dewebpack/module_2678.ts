export function getObjectKeys(obj: unknown): string[] {
  const keys: string[] = [];
  if (obj != null) {
    for (const key in Object(obj)) {
      keys.push(key);
    }
  }
  return keys;
}