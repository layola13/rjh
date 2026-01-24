/**
 * Returns the internal [[Class]] property of a value as a string.
 * Attempts to determine the precise type tag for objects, handling special cases
 * like Arguments objects and values with custom @@toStringTag symbols.
 * 
 * @module ClassOfValue
 * @param value - The value to get the class/type string for
 * @returns A string representing the type: "Undefined", "Null", "String", "Number", 
 *          "Boolean", "Symbol", "Arguments", "Array", "Object", etc.
 * 
 * @example
 *