function getGlobalThis(): typeof globalThis {
  let global: typeof globalThis | undefined;

  try {
    global = (function (this: typeof globalThis) {
      return this;
    })();
  } catch {
    // Fallback: function constructor approach
    try {
      global = new Function("return this")() as typeof globalThis;
    } catch {
      // Last resort: use window in browser environment
      if (typeof window !== "undefined") {
        global = window as typeof globalThis;
      }
    }
  }

  return global ?? globalThis;
}

export default getGlobalThis();