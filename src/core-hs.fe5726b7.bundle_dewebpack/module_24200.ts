function toString(value: unknown): string {
  if (typeof value === "symbol") {
    throw new TypeError("Cannot convert a Symbol value to a string");
  }
  return String(value);
}

export default toString;