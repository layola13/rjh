/**
 * Creates a wrapper function that converts rest parameters starting at a given index.
 * This is typically used for function overloading and argument transformation.
 * 
 * @template T - The type of the original function
 * @param func - The function to wrap
 * @param startIndex - The index from which to gather rest parameters (defaults to func.length - 1)
 * @param transform - A transform function to apply to the gathered rest parameters
 * @returns A new function that applies the transformation before calling the original function
 * 
 * @example
 *