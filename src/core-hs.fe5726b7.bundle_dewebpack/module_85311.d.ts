/**
 * RegExp flags getter utility
 * 
 * Retrieves the flags property from a RegExp object, with fallback support
 * for environments that don't natively support the flags property.
 * 
 * @module RegExpFlagsGetter
 */

/**
 * Gets the flags string from a RegExp instance.
 * 
 * This function attempts to retrieve the flags property from a RegExp object.
 * It includes compatibility logic for older JavaScript environments that may
 * not have native support for the `flags` property on RegExp.prototype.
 * 
 * The function performs the following checks in order:
 * 1. If the flags property exists and is defined, return it directly
 * 2. If "flags" property is not in RegExp.prototype, return the direct value
 * 3. If the object doesn't have own property "flags", return the direct value
 * 4. If the object is not an instance of RegExp.prototype, return the direct value
 * 5. Otherwise, call a helper function to extract flags from the RegExp source
 * 
 * @param regExp - The RegExp object to extract flags from
 * @returns The flags string (e.g., "gi", "m", "gim") or undefined if not available
 * 
 * @example
 *