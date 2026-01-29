function typeOf(value: unknown): string {
  return typeof value === "function" && typeof Symbol.iterator === "symbol"
    ? typeof value
    : value &&
      typeof Symbol === "function" &&
      value.constructor === Symbol &&
      value !== Symbol.prototype
    ? "symbol"
    : typeof value;
}

export default typeOf;