/**
 * Iterator.prototype.map polyfill module
 * 
 * This module extends the Iterator prototype with a map method,
 * allowing iterators to transform their values using a mapping function.
 * 
 * @module IteratorMapPolyfill
 * @see https://github.com/tc39/proposal-iterator-helpers
 */

/**
 * Configuration options for defining polyfills on built-in objects
 */
interface PolyfillDefinitionOptions {
  /** The target object or constructor to extend (e.g., "Iterator", "Array") */
  target: string;
  
  /** Whether to add the method to the prototype */
  proto: boolean;
  
  /** Whether this is a real implementation (not a mock/stub) */
  real: boolean;
}

/**
 * Mapping function type for Iterator.prototype.map
 * 
 * @template T - The type of values yielded by the source iterator
 * @template U - The type of values yielded by the mapped iterator
 * @param value - The current value from the iterator
 * @param index - The zero-based index of the current iteration
 * @returns The transformed value
 */
type MapperFunction<T, U> = (value: T, index: number) => U;

/**
 * Iterator map method signature
 * 
 * Creates a new iterator that yields the results of applying
 * the mapper function to each value from the source iterator.
 * 
 * @template T - The type of values in the source iterator
 * @template U - The type of values in the resulting iterator
 * @param mapper - Function to transform each value
 * @returns A new iterator yielding transformed values
 */
interface MapMethod {
  <T, U>(mapper: MapperFunction<T, U>): Iterator<U>;
}

/**
 * Extended Iterator interface with map method
 */
declare global {
  interface Iterator<T, TReturn = unknown, TNext = undefined> {
    /**
     * Returns a new iterator that yields values transformed by the mapper function.
     * 
     * @template U - The type of transformed values
     * @param mapper - Function called for each value with (value, index)
     * @returns Iterator yielding transformed values
     * 
     * @example
     *