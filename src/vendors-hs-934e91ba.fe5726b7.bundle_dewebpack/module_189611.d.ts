/**
 * Gets all enumerable symbol properties of an object.
 * Returns an empty array if the object is null or undefined.
 * Falls back to returning an empty array if Symbol is not supported.
 * 
 * @param target - The object to query for enumerable symbol properties
 * @returns An array of enumerable symbol properties
 */
declare function getEnumerableSymbols(target: any): symbol[];

export = getEnumerableSymbols;