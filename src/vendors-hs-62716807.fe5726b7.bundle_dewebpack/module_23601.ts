type PrimitiveOrObject = object | ((...args: any[]) => any);

function requireObjectCoercible(value: unknown): PrimitiveOrObject {
  if (typeof value === "object" && value !== null) {
    return value as object;
  }
  
  if (typeof value === "function") {
    return value;
  }
  
  throw new TypeError(`Can't set ${String(value)} as a prototype`);
}

export default requireObjectCoercible;