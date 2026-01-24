/**
 * Stack operations module for managing stack pointer and array operations
 * @module module_pop
 */

/**
 * Pops one or multiple elements from a stack-like data structure
 * 
 * @template T - The type of elements stored in the stack
 * @param count - Optional. Number of elements to pop from the stack.
 *                If undefined, pops a single element.
 *                If provided, pops the specified number of elements.
 * @returns If count is undefined, returns a single element of type T.
 *          If count is provided, returns an array of T containing the popped elements.
 * 
 * @example
 * // Pop single element
 * const element = pop();
 * 
 * @example
 * // Pop multiple elements
 * const elements = pop(3); // Returns array of 3 elements
 */
declare function pop<T>(count?: number): T | T[];

/**
 * Alternative type-safe overloaded declarations
 */
declare function pop<T>(): T;
declare function pop<T>(count: number): T[];

/**
 * Context interface that contains the stack pointer and related operations
 */
interface StackContext<T = unknown> {
  /** Current stack pointer position */
  sp: number;
  
  /** Internal method to retrieve element at given position */
  s(position: number): T;
  
  /** Array utility functions */
  arrays: {
    /** Maps a function over an array */
    map<U, V>(array: U[], fn: (item: U) => V): V[];
    
    /** Creates a range of numbers from start to end (inclusive) */
    range(start: number, end: number): number[];
  };
}

export { pop, StackContext };