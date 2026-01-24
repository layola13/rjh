/**
 * Get the internal [[Class]] property of a value.
 * 
 * @remarks
 * This function extracts the type name from the string returned by Object.prototype.toString.
 * For example:
 * - `[object Array]` → `Array`
 * - `[object Date]` → `Date`
 * - `[object Null]` → `Null`
 * 
 * @param value - The value to get the type of
 * @returns The internal class name (e.g., 'Array', 'Object', 'Date', 'RegExp', etc.)
 * 
 * @example
 *