/**
 * Gets the iterator method for a given value.
 * 
 * This function retrieves the appropriate iterator method from an object by checking:
 * 1. The well-known Symbol.iterator property
 * 2. The legacy "@@iterator" string property
 * 3. A fallback iterator from a registry based on the value's type
 * 
 * @param value - The value to get an iterator method for
 * @returns The iterator method if found, undefined otherwise
 * 
 * @example
 *