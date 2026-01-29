function getType(value: unknown): string {
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.iterator === "symbol";
  
  if (hasSymbol) {
    return typeof value;
  }
  
  if (
    value &&
    typeof Symbol === "function" &&
    value.constructor === Symbol &&
    value !== Symbol.prototype
  ) {
    return "symbol";
  }
  
  return typeof value;
}

export default getType;