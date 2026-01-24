/**
 * Copies properties from source object to target object using property descriptors.
 * This is a webpack helper for defining getters on exports.
 * 
 * @param target - The target object to receive properties
 * @param source - The source object containing properties to copy
 */
declare function definePropertyGetters(
  target: Record<string, any>,
  source: Record<string, any>
): void;

/**
 * Type definition for the property definition helper function.
 * Iterates over source properties and defines enumerable getters on target
 * for properties that exist in source but not in target.
 */
type DefinePropertyGettersFunction = (
  target: Record<string, any>,
  source: Record<string, any>
) => void;

export { definePropertyGetters, DefinePropertyGettersFunction };