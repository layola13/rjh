export function isObject(value: unknown): value is object | Function {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}