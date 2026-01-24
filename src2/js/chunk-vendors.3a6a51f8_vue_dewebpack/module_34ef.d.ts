/**
 * Typed array registration module for Uint8 arrays
 * Provides factory function for creating Uint8 typed array instances
 */

/**
 * Factory function type for creating typed array instances
 * @template T - The typed array type being created
 */
type TypedArrayFactory<T> = (
  thisArg: T,
  target: ArrayBufferLike | ArrayLike<number> | Iterable<number>,
  byteOffset?: number,
  length?: number
) => T;

/**
 * Typed array registration function
 * Registers a new typed array constructor with a wrapper factory
 * 
 * @param name - The name of the typed array (e.g., "Uint8")
 * @param bytesPerElement - Number of bytes per element in the array
 * @param factoryWrapper - Function that returns a factory for creating instances
 */
declare function registerTypedArray<T = Uint8Array>(
  name: string,
  bytesPerElement: number,
  factoryWrapper: (constructor: TypedArrayConstructor<T>) => TypedArrayFactory<T>
): void;

/**
 * Generic typed array constructor interface
 * @template T - The typed array type
 */
interface TypedArrayConstructor<T> {
  new(length: number): T;
  new(array: ArrayLike<number> | Iterable<number>): T;
  new(buffer: ArrayBufferLike, byteOffset?: number, length?: number): T;
  readonly prototype: T;
  readonly BYTES_PER_ELEMENT: number;
}

/**
 * Module exports
 * Registers Uint8Array with 1 byte per element
 */
export { registerTypedArray, TypedArrayFactory, TypedArrayConstructor };