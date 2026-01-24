/**
 * Returns all own property keys (strings and symbols) of an object.
 * 
 * This function provides a polyfill-like behavior for getting both string and symbol keys:
 * - Prefers Reflect.ownKeys() if available (modern environments)
 * - Falls back to combining Object.getOwnPropertyNames() and Object.getOwnPropertySymbols()
 * 
 * @param target - The object whose own property keys are to be retrieved
 * @returns An array containing all own property keys (both strings and symbols)
 * 
 * @example
 *