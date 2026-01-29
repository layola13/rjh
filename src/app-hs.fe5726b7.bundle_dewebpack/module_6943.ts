export function isKeyable(key: unknown): boolean {
  const keyType = typeof key;
  return (keyType === "string" || keyType === "number" || keyType === "symbol" || keyType === "boolean") ? key !== "__proto__" : key === null;
}