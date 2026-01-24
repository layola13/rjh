/**
 * Object property enumeration utility module
 * 
 * Provides access to the native propertyIsEnumerable method for checking
 * whether a specified property is enumerable.
 */

/**
 * Reference to the native Object.prototype.propertyIsEnumerable method.
 * 
 * This method determines whether a specified property is enumerable,
 * meaning it will be included during enumeration of the object's properties
 * (e.g., in a for...in loop or Object.keys()).
 * 
 * @param propertyKey - The name or Symbol of the property to test
 * @returns true if the property is enumerable, false otherwise
 * 
 * @example
 *