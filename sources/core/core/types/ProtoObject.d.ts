/**
 * Object.prototype utility module
 * Provides access to Object.prototype methods
 */

/**
 * Reference to Object.prototype
 * 
 * @remarks
 * This constant provides a cached reference to Object.prototype for better performance
 * and to avoid repeated property lookups. It's commonly used for:
 * - Calling prototype methods directly
 * - Checking object inheritance
 * - Implementing polyfills
 * 
 * Warning: Never extend Object.prototype directly as it affects all objects globally.
 * 
 * @example
 * ```typescript
 * // Use hasOwnProperty safely
 * const obj = { name: 'test' };
 * const hasName = ObjectPrototype.hasOwnProperty.call(obj, 'name'); // true
 * 
 * // Check prototype chain
 * const arr = [];
 * const isObject = ObjectPrototype.isPrototypeOf.call(Object.prototype, arr); // true
 * 
 * // Get string representation
 * const toString = ObjectPrototype.toString.call([]); // '[object Array]'
 * 
 * // Safe property check even if hasOwnProperty is overridden
 * const malicious = { hasOwnProperty: null, name: 'test' };
 * const safe = ObjectPrototype.hasOwnProperty.call(malicious, 'name'); // true
 * 
 * // Check if object has property
 * const proto = { inherited: true };
 * const child = Object.create(proto);
 * child.own = true;
 * const hasOwn = ObjectPrototype.hasOwnProperty.call(child, 'own'); // true
 * const hasInherited = ObjectPrototype.hasOwnProperty.call(child, 'inherited'); // false
 * ```
 */
declare const ObjectPrototype: Object;

export { ObjectPrototype };