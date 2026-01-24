/**
 * Adds a property name to the Array.prototype[Symbol.unscopables] object.
 * This marks array methods that should be excluded from with statement bindings.
 * 
 * @module ArrayUnscopables
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables}
 */

/**
 * Marks an Array method as unscopable in with statement contexts.
 * 
 * When a method is added to the unscopables list, it will not be accessible
 * as a direct variable inside a `with` statement, preventing naming conflicts.
 * 
 * @param methodName - The name of the Array.prototype method to mark as unscopable
 * 
 * @example
 *