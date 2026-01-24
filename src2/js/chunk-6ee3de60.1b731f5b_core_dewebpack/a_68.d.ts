/**
 * Type guard that checks if a value is a non-null object.
 * 
 * @param value - The value to check
 * @returns `true` if the value is not null and is of type 'object', `false` otherwise
 * 
 * @remarks
 * This function performs a runtime check to determine if a value is an object.
 * Note that in JavaScript, `typeof null === 'object'`, so this function explicitly
 * checks for null to exclude it from the object type.
 * 
 * @example
 *