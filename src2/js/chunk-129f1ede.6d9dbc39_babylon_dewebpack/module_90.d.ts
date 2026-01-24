/**
 * Creates a subscription function that subscribes to an observable source.
 * 
 * This function wraps an observable object and returns a function that can be used
 * to subscribe to that observable. It extracts the observable using Symbol.observable
 * and validates that the result has a proper subscribe method.
 * 
 * @template T The type of values emitted by the observable
 * @param source An object that implements the Symbol.observable protocol
 * @returns A function that accepts an observer and returns a subscription
 * @throws {TypeError} If the object doesn't correctly implement Symbol.observable
 * 
 * @example
 *