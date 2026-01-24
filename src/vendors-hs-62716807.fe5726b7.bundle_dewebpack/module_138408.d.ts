/**
 * Polyfill for Reflect.ownKeys
 * Returns an array of the target object's own property keys (including non-enumerable properties and symbols)
 * @module ReflectOwnKeys
 */

/**
 * Gets all own property keys of an object, including both string keys and symbol keys
 * @param target - The target object whose own property keys are to be retrieved
 * @returns An array containing all own property keys (strings and symbols)
 */
declare function ownKeys(target: object): Array<string | symbol>;

export = ownKeys;