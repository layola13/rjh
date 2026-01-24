/**
 * Type guard to check if a value is a Promise-like object.
 * 
 * Determines whether the provided value is a thenable (Promise-like) object
 * that is NOT an Observable. This is useful for distinguishing between
 * Promises and Observables in reactive programming contexts.
 * 
 * @param value - The value to check
 * @returns True if the value is a Promise-like object (has a `then` method)
 *          but is NOT an Observable (does not have a `subscribe` method)
 * 
 * @example
 *