/**
 * Checks if a value is a non-null object.
 * 
 * @param value - The value to check
 * @returns `true` if the value is a non-null object, `false` otherwise
 * 
 * @remarks
 * This function performs a type check to determine if the given value is an object
 * and not null. Note that in JavaScript, typeof null === 'object', so the null
 * check is necessary to exclude null values.
 * 
 * @example
 *