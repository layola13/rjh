/**
 * Type definitions for dynamic property accessor with fallback
 * Handles safe property access with optional method calling
 */

/**
 * Attempts to access and call a property method on an object with fallback behavior
 * 
 * @param context - The execution context (typically `this`)
 * @param target - The target object to access the property from
 * @param propertyKey - The property key to access on the target object
 * @param fallbackMethod - Fallback method to call if property doesn't exist
 * @param args - Additional arguments to pass to the called method
 * @returns The result of either the property method or fallback method execution
 * 
 * @remarks
 * This function first converts the context to an object, then checks if the target
 * has the specified property. If the property exists and is not null/undefined,
 * it calls that property as a method. Otherwise, it falls back to calling the
 * fallback method with the stringified context as the first argument.
 */
declare function dynamicPropertyAccessor<TContext, TTarget, TResult>(
  context: TContext,
  target: TTarget | null | undefined,
  propertyKey: string | symbol,
  fallbackMethod: (stringifiedContext: string, target: TTarget, ...args: unknown[]) => TResult,
  ...args: unknown[]
): TResult;

/**
 * Converts a value to an object wrapper
 * @param value - The primitive or object value to convert
 * @returns The object-wrapped value
 */
declare function toObject<T>(value: T): Object;

export { dynamicPropertyAccessor, toObject };