/**
 * Module: module_is
 * Original ID: is
 * 
 * Checks if the current context matches the given selector.
 * @param selector - A CSS selector string or other selector type
 * @returns True if the selector matches at least one element, false otherwise
 */
declare function moduleIs(this: unknown, selector: string | unknown[] | null | undefined): boolean;

/**
 * Internal helper function that performs selector matching
 * @param context - The context object to search within
 * @param selector - The selector to match against
 * @param flag - Boolean flag for matching behavior
 * @returns Array of matched elements
 */
declare function O(context: unknown, selector: unknown[] | string, flag: boolean): unknown[];

/**
 * Regular expression pattern for validating selector strings
 */
declare const k: RegExp;

/**
 * Parses a string selector into a normalized format
 * @param selector - The selector string to parse
 * @returns Parsed selector array
 */
declare function b(selector: string): unknown[];