/**
 * Executes an iterator callback function with error handling.
 * 
 * This utility safely invokes a callback function, optionally destructuring the value,
 * and dispatches any thrown errors to a specified error handler.
 * 
 * @template T - The type of the value to be processed
 * @template R - The return type of the callback function
 * 
 * @param errorTarget - The target object that will receive error notifications
 * @param callback - The function to execute with the processed value
 * @param value - The value to be passed to the callback (may be a tuple if shouldDestructure is true)
 * @param shouldDestructure - If true, treats value as a [key, value] tuple and passes both arguments; if false, passes value directly
 * 
 * @returns The result of the callback function, or undefined if an error occurs
 * 
 * @remarks
 * When an error is caught, it is forwarded to the errorTarget using a "throw" event/method.
 * This pattern is commonly used in iterator protocols where errors need to be propagated
 * to the iterator's error handling mechanism.
 * 
 * @example
 * // Direct value processing
 * executeIteratorCallback(iterator, (val) => val * 2, 5, false);
 * 
 * @example
 * // Tuple destructuring (e.g., for Map entries)
 * executeIteratorCallback(iterator, (key, val) => ({ [key]: val }), ['name', 'John'], true);
 */
declare function executeIteratorCallback<T, R>(
  errorTarget: unknown,
  callback: (...args: any[]) => R,
  value: T,
  shouldDestructure?: boolean
): R | undefined;

export = executeIteratorCallback;