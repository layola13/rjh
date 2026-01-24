/**
 * Deep merge utility that combines multiple objects into a single object.
 * Merges own enumerable properties (including symbols) from source objects into the target object.
 * 
 * @module ObjectSpread
 * @remarks
 * This is a polyfill for the object spread operator (...) used in older environments.
 * In modern TypeScript, use native spread syntax instead: `{ ...obj1, ...obj2 }`
 */

/**
 * Deeply merges multiple objects into the target object.
 * 
 * @template T - The type of the target object
 * @param target - The target object to merge properties into
 * @param sources - Source objects whose properties will be merged into the target
 * @returns The target object with all properties merged
 * 
 * @example
 *