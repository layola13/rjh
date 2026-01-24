/**
 * Symbol for the Observable interoperability point.
 * 
 * This is used to identify objects that implement the Observable interface,
 * allowing different Observable implementations to interoperate.
 * 
 * Uses the ES2015 Symbol.observable if available, otherwise falls back to
 * the string polyfill "@@observable".
 * 
 * @see https://github.com/tc39/proposal-observable
 */
export declare const observable: symbol | "@@observable";