function toString(value: unknown): string {
  if (typeof value === "string" || isSymbol(value)) {
    return value as string;
  }
  
  const result = `${value}`;
  return result === "0" && 1 / (value as number) === -Infinity ? "-0" : result;
}

function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

export default toString;