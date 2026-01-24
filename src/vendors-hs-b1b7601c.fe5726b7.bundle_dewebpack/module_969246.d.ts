/**
 * RxJS operator that appends values to the end of an observable sequence.
 * @module endWith
 */

/**
 * Returns an Observable that emits the items you specify as arguments after it finishes emitting
 * items emitted by the source Observable.
 * 
 * @template T The type of items emitted by the observable
 * @param values The values to append to the end of the source observable sequence
 * @returns An operator function that takes a source Observable and returns an Observable that emits
 *          all items from the source, followed by the specified values
 * 
 * @example
 *