/**
 * Map function that transforms elements using a callback
 * 
 * @template T - The type of elements in the source
 * @template U - The type of elements in the result
 * @param callback - Function to execute for each element
 * @param thisArg - Value to use as `this` when executing callback (optional)
 * @returns The mapped result
 * 
 * @remarks
 * This appears to be a polyfill or custom implementation of Array.prototype.map
 * The function delegates to an internal implementation `i` with the context,
 * callback, and optional thisArg parameter.
 */
declare function map<T, U>(
  this: T[],
  callback: (value: T, index: number, array: T[]) => U,
  thisArg?: unknown
): U[];

/**
 * Generic map function interface
 * 
 * @template TContext - The type of the context/collection being mapped
 * @template TCallback - The callback function signature
 * @template TResult - The return type of the map operation
 */
declare interface MapFunction<TContext, TCallback extends (...args: any[]) => any, TResult> {
  (this: TContext, callback: TCallback, thisArg?: unknown): TResult;
}

export { map, MapFunction };