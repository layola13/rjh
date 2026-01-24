/**
 * Executes a method on an object with fallback to a default function.
 * This appears to be a polyfill or compatibility layer for string/regex methods.
 * 
 * @template T - The type of the context object
 * @template R - The return type of the method
 * @template O - The type of the target object (likely RegExp or similar)
 * @template E - The property key type
 * 
 * @param module - The module object (unused in implementation)
 * @param exports - The exports object (unused in implementation)
 */
declare function _0(module: unknown, exports: unknown): void;

/**
 * Internal implementation that attempts to call a method on an object,
 * falling back to a default implementation if the method doesn't exist.
 * 
 * @template TContext - The type of the execution context
 * @template TTarget - The type of the target object
 * @template TKey - The property key type
 * @template TResult - The return type
 * 
 * @param context - The execution context (typically 'this')
 * @param target - The target object to call the method on
 * @param key - The property key of the method to invoke
 * @param args - Additional arguments to pass to the method
 * @param fallbackFn - The fallback function to use if the method doesn't exist
 * 
 * @returns The result of calling either the target method or the fallback function
 * 
 * @internal
 */
declare function executeWithFallback<TContext, TTarget, TKey extends PropertyKey, TResult>(
  context: TContext,
  target: TTarget | null | undefined,
  key: TKey,
  args: unknown,
  fallbackFn: (this: string, target: TTarget, args: unknown) => TResult
): TResult;

/**
 * Type guard to check if a value is null or undefined.
 */
type Nullable<T> = T | null | undefined;

/**
 * Represents a method that can be called with a context and arguments.
 */
type CallableMethod<TContext, TArgs, TReturn> = (
  this: TContext,
  ...args: TArgs[]
) => TReturn;