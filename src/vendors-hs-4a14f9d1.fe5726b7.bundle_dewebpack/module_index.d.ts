/**
 * Module: module_index
 * Handles stack pointer operations
 */

/**
 * Adjusts the stack pointer by subtracting the given offset
 * @param offset - The amount to subtract from the current stack pointer
 * @returns The result of the stack operation
 */
declare function adjustStackPointer(offset: number): unknown;

/**
 * Context object containing stack pointer state
 */
interface StackContext {
  /**
   * Current stack pointer position
   */
  sp: number;
}

/**
 * Stack operation function type
 * @param value - The computed stack value
 * @returns The result of the stack operation
 */
type StackOperationFn = (value: number) => unknown;

declare const s: StackOperationFn;

export { adjustStackPointer, StackContext, StackOperationFn };