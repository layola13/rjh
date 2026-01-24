/**
 * Performs cleanup operations on an iterator by calling its return method.
 * Handles both normal completion and exception scenarios according to the completion type.
 * 
 * @param iterator - The iterator object to be closed
 * @param completionType - The type of completion: "normal" or "throw"
 * @param completionValue - The value associated with the completion
 * @returns The completion value if no errors occur
 * @throws The completion value if completionType is "throw", or any error from the return method
 */
declare function iteratorClose<T = unknown>(
  iterator: Iterator<unknown> | AsyncIterator<unknown>,
  completionType: 'normal' | 'throw',
  completionValue: T
): T;

export = iteratorClose;