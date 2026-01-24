/**
 * Gets the Symbol.observable property, creating it if necessary.
 * This is commonly used in reactive programming libraries (RxJS, Redux, etc.)
 * to identify observables through a well-known symbol.
 * 
 * @param root - The global object (typically window or global) containing Symbol
 * @returns The @@observable symbol used to identify observable objects
 * 
 * @example
 *