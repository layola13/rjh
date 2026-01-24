/**
 * Module: module_ownKeys
 * Original ID: ownKeys
 * 
 * Returns all own property keys (including non-enumerable and symbol properties)
 * of the object returned by processing the input through function B.
 * 
 * @param target - The input value to be processed
 * @returns An array of the target object's own property keys (strings and symbols)
 */
declare function ownKeys(target: unknown): (string | symbol)[];

export default ownKeys;