export function isKeyable(key: unknown): boolean {
  const type = typeof key;
  return (type === "string" || type === "number" || type === "symbol" || type === "boolean") 
    ? key !== "__proto__" 
    : key === null;
}