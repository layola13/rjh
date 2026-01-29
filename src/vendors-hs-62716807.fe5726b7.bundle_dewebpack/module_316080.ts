function toPropertyKey(value: unknown): string | symbol {
  const primitive = toPrimitive(value, "string");
  return isSymbol(primitive) ? primitive : String(primitive);
}

function toPrimitive(input: unknown, hint: "string" | "number" | "default"): unknown {
  if (typeof input !== "object" || input === null) {
    return input;
  }
  
  const exoticToPrim = (input as any)[Symbol.toPrimitive];
  if (exoticToPrim !== undefined) {
    const result = exoticToPrim.call(input, hint);
    if (typeof result !== "object") {
      return result;
    }
    throw new TypeError("Cannot convert object to primitive value");
  }
  
  const methodNames = hint === "string" ? ["toString", "valueOf"] : ["valueOf", "toString"];
  for (const name of methodNames) {
    const method = (input as any)[name];
    if (typeof method === "function") {
      const result = method.call(input);
      if (typeof result !== "object") {
        return result;
      }
    }
  }
  
  throw new TypeError("Cannot convert object to primitive value");
}

function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export { toPropertyKey as default };