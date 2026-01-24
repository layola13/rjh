/**
 * Type predicate that checks if a value is an object.
 * 
 * This function determines whether a given value is of type "object" in JavaScript's sense,
 * meaning it's either a non-null object or a function. It handles special cases for
 * legacy HTML DDA (Document.All) behavior in older browsers.
 * 
 * @remarks
 * - Returns true for objects, functions, and arrays
 * - Returns false for primitives (string, number, boolean, null, undefined)
 * - Has special handling for HTML DDA (Document.All) when IS_HTMLDDA flag is enabled
 * 
 * @param value - The value to check
 * @returns True if the value is an object (including functions), false otherwise
 */
export function isObject(value: unknown): value is object | Function;

/**
 * Internal configuration flag indicating whether the environment supports
 * HTML DDA (Document.All) legacy behavior.
 * 
 * @internal
 */
export const IS_HTMLDDA: boolean;

/**
 * Reference to the HTML DDA "all" collection object.
 * This is a legacy feature that treats document.all as undefined in boolean contexts.
 * 
 * @internal
 */
export const all: any;

/**
 * Checks the typeof a value and returns its type as a string.
 * 
 * @internal
 * @param value - The value to check
 * @returns The typeof string for the value
 */
declare function getTypeOf(value: unknown): string;

/**
 * Checks if a value is callable (a function).
 * 
 * @internal
 * @param value - The value to check
 * @returns True if the value is a function
 */
declare function isCallable(value: unknown): value is Function;