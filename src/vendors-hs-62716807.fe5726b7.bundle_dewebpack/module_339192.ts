type GlobalObject = typeof globalThis & { Math: typeof Math };

function isValidGlobalObject(obj: unknown): obj is GlobalObject {
  return typeof obj === 'object' && obj !== null && 'Math' in obj && (obj as GlobalObject).Math === Math;
}

function getGlobalObject(): GlobalObject {
  if (isValidGlobalObject(globalThis)) {
    return globalThis;
  }
  
  if (typeof window !== 'undefined' && isValidGlobalObject(window)) {
    return window as unknown as GlobalObject;
  }
  
  if (typeof self !== 'undefined' && isValidGlobalObject(self)) {
    return self as unknown as GlobalObject;
  }
  
  if (typeof global !== 'undefined' && isValidGlobalObject(global)) {
    return global as unknown as GlobalObject;
  }
  
  try {
    return Function('return this')() as GlobalObject;
  } catch {
    return globalThis;
  }
}

export const globalObject: GlobalObject = getGlobalObject();