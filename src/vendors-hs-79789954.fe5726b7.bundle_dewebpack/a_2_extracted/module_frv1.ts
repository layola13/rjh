function getGlobalObject(): typeof globalThis {
  let globalObj: typeof globalThis;

  try {
    globalObj = (function(this: typeof globalThis): typeof globalThis {
      return this;
    })();
  } catch {
    // Fallback: empty catch as globalObj will be undefined
  }

  try {
    globalObj = globalObj || new Function("return this")() as typeof globalThis;
  } catch {
    if (typeof window === "object") {
      globalObj = window as typeof globalThis;
    }
  }

  return globalObj;
}

export default getGlobalObject();