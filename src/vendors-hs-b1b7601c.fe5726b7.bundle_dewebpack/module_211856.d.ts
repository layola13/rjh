/**
 * RxJS operator that flattens higher-order observables by subscribing to the most recent inner observable.
 * 
 * This operator is equivalent to `switchMap(identity)`, which takes an Observable that emits Observables
 * and subscribes to the most recently emitted inner Observable, unsubscribing from the previous one.
 * 
 * @example
 *