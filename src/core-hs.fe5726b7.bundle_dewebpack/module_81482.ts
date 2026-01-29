type GlobalObject = typeof globalThis | Window | WorkerGlobalScope | NodeJS.Global;

/**
 * Checks if the provided value is a valid global object
 * @param candidate - The potential global object to validate
 * @returns The global object if valid, otherwise undefined
 */
function isValidGlobal(candidate: unknown): GlobalObject | undefined {
  return candidate && 
         typeof candidate === 'object' && 
         'Math' in candidate && 
         (candidate as any).Math === Math 
    ? (candidate as GlobalObject) 
    : undefined;
}

/**
 * Retrieves the global object in a cross-environment manner
 * Works in browsers, Node.js, Web Workers, and other JavaScript environments
 */
const globalObject: GlobalObject = 
  isValidGlobal(typeof globalThis !== 'undefined' ? globalThis : undefined) ||
  isValidGlobal(typeof window !== 'undefined' ? window : undefined) ||
  isValidGlobal(typeof self !== 'undefined' ? self : undefined) ||
  isValidGlobal(typeof global !== 'undefined' ? global : undefined) ||
  (function(this: GlobalObject): GlobalObject { return this; })() ||
  Function('return this')() as GlobalObject;

export default globalObject;