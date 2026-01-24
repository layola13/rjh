/**
 * Checks if a value is a valid object key (excluding __proto__).
 * 
 * @param value - The value to check
 * @returns True if the value is a primitive type (string, number, symbol, boolean) 
 *          and not "__proto__", or if the value is null or undefined
 * 
 * @remarks
 * This function is commonly used to prevent prototype pollution attacks by ensuring
 * that the special "__proto__" key cannot be used as a property key, while allowing
 * null/undefined values and other primitive types.
 * 
 * @example
 *