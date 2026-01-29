export function getProperty<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  key: K
): T[K] | undefined {
  return obj == null ? undefined : obj[key];
}