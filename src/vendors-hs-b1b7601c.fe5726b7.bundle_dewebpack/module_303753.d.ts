/**
 * Combines multiple Observables to create an Observable whose values are calculated from the latest values of each input Observable.
 * 
 * @remarks
 * This operator takes multiple Observables as input and emits an array containing the latest values from each Observable
 * whenever any of the input Observables emits a value.
 * 
 * @param observables - Variable number of Observable sources to combine
 * @returns An Observable that emits arrays of the latest values from all input Observables
 * 
 * @example
 *