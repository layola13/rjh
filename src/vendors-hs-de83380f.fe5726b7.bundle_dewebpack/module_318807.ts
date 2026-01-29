function toPrimitive(value: unknown, hint: string): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  
  const exoticToPrim = (value as any)[Symbol.toPrimitive];
  if (exoticToPrim !== undefined) {
    const result = exoticToPrim.call(value, hint);
    if (typeof result !== "object") {
      return result;
    }
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  
  return (hint === "string" ? String : Number)(value);
}

function getTypeOf(value: unknown): string {
  if (value === null) {
    return "null";
  }
  
  const baseType = typeof value;
  
  if (baseType === "object") {
    if (Array.isArray(value)) {
      return "array";
    }
    if (value instanceof Date) {
      return "date";
    }
  }
  
  if (baseType === "function") {
    return Function.prototype.toString.call(value).startsWith("class") 
      ? "class" 
      : "function";
  }
  
  return baseType;
}

function toPropertyKey(value: unknown): string | symbol {
  const primitive = toPrimitive(value, "string");
  return getTypeOf(primitive) === "symbol" ? (primitive as symbol) : String(primitive);
}

export default toPropertyKey;