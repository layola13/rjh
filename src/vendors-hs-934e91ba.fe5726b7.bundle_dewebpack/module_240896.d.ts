/**
 * Creates a typed array from an array-like object.
 * 
 * This module provides a utility function that creates a Uint8Array (or similar typed array)
 * from an input array-like structure. It includes a polyfill fallback for environments
 * without native typed array support.
 * 
 * The implementation checks if typed arrays preserve the sign of negative zero values
 * to determine if the native constructor is available and working correctly.
 * 
 * @module TypedArrayConstructor
 */

/**
 * Array-like input that can be converted to a typed array
 */
type ArrayLike<T> = ArrayLike<T> | Iterable<T>;

/**
 * Typed array constructor interface
 */
interface TypedArrayConstructor {
  new (elements: ArrayLike<number>): Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array;
}

/**
 * Creates a typed array from the provided array-like input.
 * 
 * If the environment supports typed arrays with correct negative zero handling,
 * it uses the native typed array constructor. Otherwise, falls back to a polyfill
 * implementation that ensures consistent behavior across all environments.
 * 
 * @param input - The array-like object to convert to a typed array
 * @returns A typed array containing the elements from the input
 * 
 * @example
 *