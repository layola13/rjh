/**
 * Iterator.prototype.toArray() polyfill
 * 
 * Converts an iterator to an array by collecting all values from the iterator.
 * This method is part of the ECMAScript Iterator Helpers proposal.
 * 
 * @module IteratorToArray
 * @see https://github.com/tc39/proposal-iterator-helpers
 */

/**
 * Options for iterator iteration operations
 */
interface IteratorIterationOptions {
  /** The target array to collect values into */
  that: unknown[];
  /** Flag indicating if this is a record-based iteration */
  IS_RECORD: boolean;
}

/**
 * Iterator polyfill registration function
 * Registers methods on built-in prototypes
 */
declare function registerIteratorMethod(
  config: {
    /** Target object or constructor to extend */
    target: string;
    /** Whether to add to the prototype */
    proto: boolean;
    /** Whether this is a real iterator method */
    real: boolean;
  },
  methods: Record<string, Function>
): void;

/**
 * Iterates over an iterator and calls a callback for each value
 * 
 * @param iterator - The iterator to iterate over
 * @param callback - Function to call for each value
 * @param options - Options controlling the iteration behavior
 */
declare function iterateIterator<T>(
  iterator: Iterator<T>,
  callback: (this: unknown[], value: T) => void,
  options: IteratorIterationOptions
): void;

/**
 * Validates and returns an iterator, ensuring it conforms to the iterator protocol
 * 
 * @param iterator - The object to validate as an iterator
 * @returns The validated iterator
 * @throws {TypeError} If the object is not a valid iterator
 */
declare function validateIterator<T>(iterator: unknown): Iterator<T>;

declare global {
  interface Iterator<T, TReturn = any, TNext = undefined> {
    /**
     * Collects all values from the iterator into an array
     * 
     * This method exhausts the iterator, consuming all its values and
     * returning them in a newly created array. Once called, the iterator
     * will be in a completed state.
     * 
     * @returns An array containing all values produced by the iterator
     * 
     * @example
     *