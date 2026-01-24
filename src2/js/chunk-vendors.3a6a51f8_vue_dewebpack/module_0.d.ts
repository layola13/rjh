/**
 * Invokes a method on an object with fallback behavior.
 * 
 * This function attempts to call a method on a target object. If the method exists,
 * it invokes it with the provided context and arguments. Otherwise, it falls back
 * to calling a default method on the string representation of the context.
 * 
 * @template T - The type of the context object
 * @template K - The key type for accessing the method
 * @template R - The return type of the method
 * 
 * @param context - The execution context (typically `this`)
 * @param target - The object containing the method to invoke (can be null/undefined)
 * @param methodKey - The key/name of the method to invoke on the target
 * @param fallbackMethod - The fallback method to call if target method doesn't exist
 * @param arg - Additional argument to pass to the invoked method
 * 
 * @returns The result of invoking either the target method or the fallback method
 */
function invokeMethodWithFallback<T, K extends PropertyKey, R>(
  context: T,
  target: Record<K, Function> | null | undefined,
  methodKey: K,
  fallbackMethod: (this: string, ...args: unknown[]) => R,
  arg: unknown
): R {
  // Convert context to a standardized form
  const normalizedContext = toObject(context);
  
  // Attempt to retrieve the method from the target object
  const targetMethod = target?.[methodKey];
  
  // If method exists on target, invoke it with the normalized context and argument
  if (targetMethod !== undefined) {
    return targetMethod.call(target, normalizedContext, arg) as R;
  }
  
  // Otherwise, fall back to calling the fallback method on the string representation
  return fallbackMethod.call(String(normalizedContext), target, arg);
}

/**
 * Converts a value to an object representation.
 * Helper function referenced as `e(this)` in the original code.
 * 
 * @param value - The value to convert to an object
 * @returns The object representation of the value
 */
declare function toObject<T>(value: T): T extends object ? T : Object;

export { invokeMethodWithFallback };