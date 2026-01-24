/**
 * RxJS operator that maps each source value to the same observable,
 * then flattens all inner observables using concatMap strategy.
 * 
 * @module concatMapTo
 * @description
 * Projects each source value to the same Observable which is merged multiple times
 * in a serialized fashion on the output Observable.
 * 
 * It's like concatMap, but maps each value always to the same inner Observable.
 * 
 * @example
 *