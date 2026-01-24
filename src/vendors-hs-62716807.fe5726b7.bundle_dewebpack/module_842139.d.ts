/**
 * Gets all enumerable own property names from an object, excluding hidden properties.
 * 
 * This function collects property keys from an object in two phases:
 * 1. Iterates through all enumerable properties, excluding those in the hidden list
 * 2. Explicitly checks for additional properties from a provided list
 * 
 * @param target - The target object to extract property keys from
 * @param additionalKeys - An array of property keys to explicitly check for
 * @returns An array of property key strings found on the target object
 * 
 * @example
 * const obj = { a: 1, b: 2, toString: 'custom' };
 * const keys = getObjectKeys(obj, ['toString', 'valueOf']);
 * // Returns: ['a', 'b', 'toString']
 */
declare function getObjectKeys(
  target: object,
  additionalKeys: readonly string[]
): string[];

export = getObjectKeys;