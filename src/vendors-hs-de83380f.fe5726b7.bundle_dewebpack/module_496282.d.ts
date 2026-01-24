/**
 * Runtime helper that throws an error when attempting to spread a non-iterable value.
 * 
 * This helper is used by transpilers (Babel/TypeScript) to validate that values
 * being spread are iterable (arrays, strings, Maps, Sets, etc.).
 * 
 * @throws {TypeError} Always throws when called, indicating an invalid spread operation
 * @example
 * // This would trigger the error:
 * // const obj = { a: 1 };
 * // const arr = [...obj]; // TypeError: Invalid attempt to spread non-iterable instance
 */
declare function nonIterableSpread(): never;

export default nonIterableSpread;