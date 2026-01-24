/**
 * Type guard to check if a value is a symbol.
 * Provides both native and polyfill implementations depending on environment support.
 */

import type { TypeOfResult } from './type-of-result';
import type { GetBuiltIn } from './get-built-in';
import type { IsCallable } from './is-callable';
import type { HasOwnProperty } from './has-own-property';

/**
 * Checks if a value is of symbol type.
 * 
 * @param value - The value to check
 * @returns True if the value is a symbol, false otherwise
 * 
 * @remarks
 * In environments with native symbol support, uses typeof check.
 * In legacy environments, checks if the value is an instance of the Symbol constructor.
 */
export type IsSymbol = (value: unknown) => value is symbol;

/**
 * Implementation that returns true if the value is a symbol type.
 * Falls back to prototype chain checking in environments without native symbol support.
 */
declare const isSymbol: IsSymbol;

export default isSymbol;