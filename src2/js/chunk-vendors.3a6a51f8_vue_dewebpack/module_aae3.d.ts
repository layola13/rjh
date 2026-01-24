/**
 * Type checking utility for RegExp-like objects.
 * 
 * Checks if a value is a regular expression by examining its Symbol.match property
 * or falling back to internal class type checking.
 * 
 * @module RegExpMatcher
 */

/**
 * Checks if the given value is an object.
 * Corresponds to dependency 'd3f4'.
 */
declare function isObject(value: unknown): value is object;

/**
 * Gets the internal [[Class]] name of an object.
 * Returns strings like "RegExp", "Array", "Object", etc.
 * Corresponds to dependency '2d95'.
 */
declare function getObjectType(value: unknown): string;

/**
 * Retrieves a well-known symbol by name.
 * Corresponds to dependency '2b4c'.
 * 
 * @param symbolName - The name of the well-known symbol (e.g., "match", "iterator")
 * @returns The corresponding symbol from the Symbol global object
 */
declare function getWellKnownSymbol(symbolName: string): symbol;

/**
 * Interface for objects that may have a Symbol.match property.
 * This includes RegExp objects and custom matchers.
 */
interface Matchable {
  [Symbol.match]?: boolean | ((string: string) => RegExpMatchArray | null);
}

/**
 * Determines whether a value is a RegExp or RegExp-like object.
 * 
 * First checks if the value is an object, then:
 * 1. If the value has a Symbol.match property, returns its boolean coercion
 * 2. Otherwise, checks if the internal type is "RegExp"
 * 
 * @param value - The value to check
 * @returns True if the value is a RegExp or has Symbol.match defined
 * 
 * @example
 *