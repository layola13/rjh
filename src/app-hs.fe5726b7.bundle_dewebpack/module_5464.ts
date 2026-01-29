export function isObject(value: unknown): value is object | Function {
  const valueType = typeof value;
  return value != null && (valueType === "object" || valueType === "function");
}