/**
 * Type guard to check if a value is a function.
 * 
 * Handles special case for HTML document.all (HTMLDDA) which has unusual typeof behavior.
 * In legacy browsers, document.all returns undefined when used with typeof but is callable.
 * 
 * @param value - The value to check
 * @returns True if the value is a function or is the special HTMLDDA object
 */
declare function isCallable(value: unknown): value is Function;

export = isCallable;