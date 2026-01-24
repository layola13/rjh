/**
 * A utility function that always returns null regardless of input.
 * This might be used as a placeholder, no-op handler, or default renderer.
 * 
 * @template T - The type of the input parameter
 * @param input - The input value (ignored)
 * @returns Always returns null
 */
declare function defaultFunction<T = unknown>(input: T): null;

export default defaultFunction;