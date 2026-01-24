/**
 * Adds a property name to the Array.prototype unscopables registry.
 * 
 * This module manages the Symbol.unscopables well-known symbol on Array.prototype,
 * which defines property names that should be excluded from `with` statement bindings.
 * 
 * @module ArrayUnscopables
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables
 */

/**
 * Adds a property to the Array.prototype unscopables object.
 * This marks the property to be excluded from `with` environment bindings.
 * 
 * @param propertyName - The name of the property to add to unscopables
 * 
 * @example
 *