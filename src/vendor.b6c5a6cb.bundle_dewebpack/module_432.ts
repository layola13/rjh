function getGlobalThis(): typeof globalThis {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  let global: unknown;
  
  try {
    global = this || new Function("return this")();
  } catch {
    if (typeof window === "object") {
      return window as typeof globalThis;
    }
    
    if (typeof self === "object") {
      return self as typeof globalThis;
    }
  }

  return global as typeof globalThis;
}

export default getGlobalThis;