function getGlobalThis(): typeof globalThis {
  let global: typeof globalThis;

  try {
    global = (function(this: typeof globalThis): typeof globalThis {
      return this;
    })();
  } catch {
    // Fallback for strict mode
  }

  try {
    global = global || new Function("return this")() as typeof globalThis;
  } catch {
    if (typeof window === "object") {
      global = window as typeof globalThis;
    }
  }

  return global;
}

export default getGlobalThis();