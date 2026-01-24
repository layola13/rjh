/**
 * Gets the iterator method for a given value.
 * 
 * This utility attempts to retrieve the iterator function from an object by checking:
 * 1. The well-known Symbol.iterator property
 * 2. The legacy "@@iterator" string property
 * 3. A default iterator from a registry based on the value's type classification
 * 
 * @param value - The value to get the iterator method from
 * @returns The iterator function if found, undefined otherwise
 * 
 * @example
 *