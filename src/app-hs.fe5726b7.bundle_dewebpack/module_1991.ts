function baseToString(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  
  if (Array.isArray(value)) {
    return value.map(item => baseToString(item)).join(",");
  }
  
  if (isSymbol(value)) {
    return symbolToString(value);
  }
  
  const result = String(value);
  return result === "0" && 1 / (value as number) === -Infinity ? "-0" : result;
}

function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol" || 
    (isObjectLike(value) && Object.prototype.toString.call(value) === "[object Symbol]");
}

function isObjectLike(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function symbolToString(value: symbol): string {
  return Symbol.prototype.toString.call(value);
}

export { baseToString as default };