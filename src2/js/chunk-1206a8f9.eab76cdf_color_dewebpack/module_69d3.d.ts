/**
 * AsyncIterator Symbol Registration Module
 * 
 * This module registers the well-known Symbol.asyncIterator symbol.
 * Symbol.asyncIterator is used to define the default async iterator for an object,
 * enabling the object to be used with for-await-of loops.
 * 
 * @module AsyncIteratorSymbol
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
 */

/**
 * Type definition for the symbol registration function (typically from a core polyfill module)
 */
type SymbolRegistrationFn = (key: string) => symbol;

/**
 * Registers the 'asyncIterator' well-known symbol
 * This ensures Symbol.asyncIterator is available in environments that may not natively support it
 */
declare const registerAsyncIteratorSymbol: () => void;

export default registerAsyncIteratorSymbol;