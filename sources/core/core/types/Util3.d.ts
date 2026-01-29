/**
 * Iterator cleanup utility module
 * @description Provides functionality for properly closing iterators
 * @example
 * const result = iteratorClose(iterator, () => {
 *   console.log('Cleanup completed');
 * });
 */

/**
 * Closes an iterator and executes a cleanup callback
 * @template T - The type of values the iterator yields
 * @param iterator - The iterator to close
 * @param callback - Cleanup function to execute after closing
 * @returns void
 */
declare function iteratorClose<T>(iterator: Iterator<T>, callback: () => void): void;

export { iteratorClose };