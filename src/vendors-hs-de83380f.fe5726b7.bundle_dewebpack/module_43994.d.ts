/**
 * Checks if a value is defined (not undefined).
 * Throws a ReferenceError if the value is undefined, typically used to validate
 * that super() has been called in a derived class constructor.
 * 
 * @template T - The type of the value being checked
 * @param value - The value to check for initialization
 * @returns The value if it is defined
 * @throws {ReferenceError} If the value is undefined
 * 
 * @example
 *