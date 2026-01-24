/**
 * Converts a value to a property path array.
 * If the value is already an array, returns it as-is.
 * If the value is a valid property key for the given object, wraps it in an array.
 * Otherwise, splits the string into a property path array.
 * 
 * @param value - The value to convert to a property path
 * @param object - The object to check the value against
 * @returns An array representing the property path
 * 
 * @example
 * toPath('a.b.c', {}) // ['a', 'b', 'c']
 * toPath(['a', 'b'], {}) // ['a', 'b']
 * toPath('key', { key: 1 }) // ['key']
 */
declare function toPath(value: unknown, object?: unknown): string[];

export = toPath;