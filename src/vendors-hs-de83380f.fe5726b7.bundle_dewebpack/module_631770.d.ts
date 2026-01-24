/**
 * Converts an array to another format using arrayLikeToArray utility.
 * This is typically used as part of Babel's array spread helper.
 * 
 * @template T - The type of elements in the array
 * @param value - The value to check and convert
 * @returns The converted array if input is an array, undefined otherwise
 */
declare function arrayToArray<T>(value: unknown): T[] | undefined;

export = arrayToArray;