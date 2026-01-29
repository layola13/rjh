function getGlobalObject(): typeof globalThis {
  let globalObject: typeof globalThis | undefined;

  try {
    globalObject = (function(this: typeof globalThis): typeof globalThis {
      return this;
    })();
  } catch {
    globalObject = undefined;
  }

  if (!globalObject) {
    try {
      globalObject = new Function("return this")() as typeof globalThis;
    } catch {
      if (typeof window === "object") {
        globalObject = window as typeof globalThis;
      }
    }
  }

  return globalObject!;
}

export default getGlobalObject();