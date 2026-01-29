function getGlobalObject(): typeof globalThis {
  let globalObj: typeof globalThis | undefined;

  try {
    globalObj = (function(): typeof globalThis {
      return this as typeof globalThis;
    })();
  } catch {
    // Function called in strict mode, fallback to global detection
  }

  if (!globalObj) {
    try {
      globalObj = new Function("return this")() as typeof globalThis;
    } catch {
      if (typeof window === "object") {
        globalObj = window as typeof globalThis;
      }
    }
  }

  return globalObj!;
}

export default getGlobalObject();