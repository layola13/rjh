/**
 * Type-safe utility to get the string representation of an object's type.
 * Returns the internal [[Class]] property of an object (e.g., "[object Array]", "[object Object]").
 * 
 * @remarks
 * This utility uses Object.prototype.toString to determine the precise type of a value,
 * which is more reliable than typeof for distinguishing between different object types.
 * 
 * @example
 *