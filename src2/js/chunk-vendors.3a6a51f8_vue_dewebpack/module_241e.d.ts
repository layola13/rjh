/**
 * Converts a value to an object by ensuring it's not null or undefined.
 * This utility wraps the RequireObjectCoercible abstract operation from ECMAScript specification.
 * 
 * @param value - The value to convert to an object
 * @returns The value coerced to an Object type
 * @throws {TypeError} If the value is null or undefined
 * 
 * @example
 *