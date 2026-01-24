/**
 * Gets the type tag of a value, supporting Symbol.toStringTag and legacy Arguments detection.
 * 
 * @param value - The value to get the type tag for
 * @returns A string representing the type tag (e.g., "String", "Array", "Undefined", "Null", "Arguments")
 * 
 * @remarks
 * This function provides a more accurate type detection than typeof by:
 * - Checking for undefined and null explicitly
 * - Supporting Symbol.toStringTag for custom object types
 * - Detecting Arguments objects in legacy environments
 * - Falling back to Object.prototype.toString classification
 * 
 * @example
 *