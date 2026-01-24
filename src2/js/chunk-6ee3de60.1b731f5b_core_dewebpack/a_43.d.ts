/**
 * Creates an observable subscription function from an object that implements Symbol.observable.
 * 
 * @param observableSource - An object that has a Symbol.observable method returning an observable
 * @returns A subscription function that takes an observer and returns a subscription
 * 
 * @throws {TypeError} If the object does not correctly implement Symbol.observable
 * 
 * @example
 *