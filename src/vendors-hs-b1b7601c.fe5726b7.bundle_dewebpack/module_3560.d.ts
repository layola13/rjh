/**
 * Type guard to check if a value is a function type.
 * Determines if the value is a Function, GeneratorFunction, AsyncFunction, or Proxy.
 * 
 * @param value - The value to check
 * @returns True if the value is a function-like type, false otherwise
 */
declare function isFunction(value: unknown): value is Function | GeneratorFunction | AsyncGeneratorFunction | ProxyConstructor;

export = isFunction;