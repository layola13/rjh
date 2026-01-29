function assertThisInitialized(instance: unknown): unknown {
  if (instance === undefined) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return instance;
}

export default function possibleConstructorReturn<T extends object>(
  self: T,
  call: unknown
): T | object {
  if (call !== null && call !== undefined) {
    const callType = typeof call;
    if (callType === "object" || callType === "function") {
      return call as object;
    }
  }
  
  if (call !== undefined) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  
  return assertThisInitialized(self);
}