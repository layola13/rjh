/**
 * Adds a property name to the Array.prototype[Symbol.unscopables] object.
 * This prevents the property from being exposed in `with` statement scopes.
 * 
 * @module ArrayUnscopables
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables
 */

/**
 * Registers a property name as unscopable on Array.prototype.
 * When a property is marked as unscopable, it will not be included in the
 * binding object of `with` statements that use Array.prototype.
 * 
 * @param propertyName - The name of the property to mark as unscopable
 * 
 * @example
 *