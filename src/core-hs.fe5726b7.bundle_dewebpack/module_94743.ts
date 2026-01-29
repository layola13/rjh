function asFunctionOrThrow<T>(value: T): T & Function {
  if (typeof value === "function") {
    return value as T & Function;
  }
  throw new TypeError(`${String(value)} is not a function`);
}

export default asFunctionOrThrow;