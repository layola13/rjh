/**
 * Gets the iterator method from an object.
 * 
 * Attempts to retrieve the iterator method by checking:
 * 1. The Symbol.iterator property
 * 2. The legacy "@@iterator" string property
 * 3. A default iterator from a registry based on the object's class
 * 
 * @param target - The object to get the iterator method from
 * @returns The iterator method if found, undefined otherwise
 * 
 * @example
 *