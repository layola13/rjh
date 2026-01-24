/**
 * Creates an operator that multicasts the source Observable as an AsyncSubject.
 * 
 * The AsyncSubject emits only the last value emitted by the source Observable,
 * and only after the source completes.
 * 
 * @returns A function that returns a ConnectableObservable that shares a single
 * subscription to the underlying source, replaying only the final emitted value
 * upon connection.
 * 
 * @example
 *