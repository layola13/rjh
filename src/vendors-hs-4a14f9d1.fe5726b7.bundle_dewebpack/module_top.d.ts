/**
 * Module: module_top
 * Original ID: top
 * 
 * This module provides top-level functionality related to stack pointer operations.
 */

/**
 * Represents the result type returned by the stack pointer operation
 */
type StackPointerResult<T = unknown> = T;

/**
 * Interface for objects containing a stack pointer property
 */
interface HasStackPointer<T = unknown> {
  /**
   * Stack pointer property
   */
  sp: T;
}

/**
 * Processes the stack pointer and returns the result
 * 
 * @template T - The type of the stack pointer value
 * @param this - Context object containing the stack pointer
 * @returns The processed stack pointer result
 */
declare function moduleTop<T = unknown>(
  this: HasStackPointer<T>
): StackPointerResult<T>;

export default moduleTop;
export type { StackPointerResult, HasStackPointer };