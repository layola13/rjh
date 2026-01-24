/**
 * Checks if the internal value 'h' is empty (null or undefined).
 * 
 * @remarks
 * This method uses loose equality (==) to check for both null and undefined values.
 * 
 * @returns True if the internal value is null or undefined, false otherwise
 */
declare function isEmpty(this: { h: unknown }): boolean;

export default isEmpty;