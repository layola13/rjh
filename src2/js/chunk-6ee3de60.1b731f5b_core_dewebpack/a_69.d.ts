/**
 * Observable Symbol Definition
 * 
 * Provides a standardized symbol for observables, using the ES2015 Symbol.observable
 * if available, or falling back to the string literal "@@observable" for compatibility.
 * 
 * This symbol is commonly used in reactive programming libraries (like RxJS) to
 * identify objects that implement the Observable interface.
 * 
 * @see https://github.com/tc39/proposal-observable
 */

/**
 * The observable symbol used to identify observable objects.
 * Returns Symbol.observable if the Symbol type exists and has an observable property,
 * otherwise returns the string "@@observable" as a fallback.
 */
export declare const observableSymbol: symbol | "@@observable";