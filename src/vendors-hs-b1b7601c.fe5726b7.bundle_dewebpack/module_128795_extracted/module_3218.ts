export function isObject(value: unknown): value is object | ((...args: any[]) => any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}