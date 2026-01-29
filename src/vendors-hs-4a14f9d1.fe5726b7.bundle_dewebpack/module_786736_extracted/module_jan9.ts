const globalObject = (function(): typeof globalThis {
  try {
    return this;
  } catch {
    // Cannot access 'this' in strict mode
  }
  
  try {
    return new Function("return this")();
  } catch {
    // Function constructor blocked by CSP
  }
  
  if (typeof window !== "undefined") {
    return window as typeof globalThis;
  }
  
  if (typeof global !== "undefined") {
    return global as typeof globalThis;
  }
  
  if (typeof self !== "undefined") {
    return self as typeof globalThis;
  }
  
  throw new Error("Unable to locate global object");
})();

export default globalObject;