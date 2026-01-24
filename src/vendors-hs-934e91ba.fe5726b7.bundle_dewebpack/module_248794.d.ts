/**
 * Iterates over properties of an object and invokes a function for each property.
 * This function combines iteration logic with property key extraction.
 * 
 * @template T - The type of the object to iterate over
 * @template K - The type of the keys to extract
 * 
 * @param target - The object to iterate over. If falsy, returns undefined.
 * @param iteratee - The function invoked per iteration. Called with (value, key, object).
 * 
 * @returns The original target object, or undefined if target is falsy.
 * 
 * @example
 *