/**
 * TypedArray polyfill module
 * Provides implementation for typed arrays (Int8Array, Uint8Array, etc.) in environments that don't support them natively
 */

/** Core utility types */
type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | 
                              Int16ArrayConstructor | Uint16ArrayConstructor | 
                              Int32ArrayConstructor | Uint32ArrayConstructor | 
                              Float32ArrayConstructor | Float64ArrayConstructor;

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | 
                  Int16Array | Uint16Array | 
                  Int32Array | Uint32Array | 
                  Float32Array | Float64Array;

/**
 * Descriptor for internal typed array data structure
 */
interface TypedArrayInternalData {
  /** Buffer: underlying ArrayBuffer */
  b: ArrayBuffer;
  /** Offset: byte offset in the buffer */
  o: number;
  /** Length: byte length */
  l: number;
  /** Elements: number of elements */
  e: number;
  /** View: DataView for buffer access */
  v: DataView;
}

/**
 * Extended typed array instance with internal data
 */
interface TypedArrayInstance extends TypedArray {
  /** Internal data structure */
  _d: TypedArrayInternalData;
}

/**
 * Property descriptor with standard attributes
 */
interface PropertyDescriptor {
  value?: unknown;
  get?(): unknown;
  set?(value: unknown): void;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

/**
 * Iterator result for typed array iteration
 */
interface IteratorResult<T> {
  value: T;
  done: boolean;
}

/**
 * Iterator interface for typed arrays
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Options for typed array creation
 * @param name - TypedArray name (e.g., "Int8", "Uint16")
 * @param bytesPerElement - Number of bytes per element
 * @param getter - Method name for reading values from DataView
 * @param isClamped - Whether values should be clamped (for Uint8ClampedArray)
 */
interface TypedArrayFactoryOptions {
  name: string;
  bytesPerElement: number;
  getter: keyof DataView;
  setter: keyof DataView;
  isClamped: boolean;
}

/**
 * Factory function export type
 * Creates a typed array constructor with specified parameters
 */
export type TypedArrayFactory = (
  name: string,
  bytesPerElement: number,
  getter: string,
  isClamped?: boolean
) => void;

/**
 * Main module export
 * Either the factory function (if descriptors are supported) or a no-op function
 */
declare const typedArrayPolyfill: TypedArrayFactory | (() => void);

export default typedArrayPolyfill;

/**
 * Validates and normalizes byte offset
 * @param offset - The offset to validate
 * @param bytesPerElement - Bytes per element for alignment check
 * @returns Normalized offset
 * @throws RangeError if offset is negative or misaligned
 */
declare function validateOffset(offset: number, bytesPerElement: number): number;

/**
 * Validates that value is a typed array instance
 * @param value - Value to check
 * @returns The typed array if valid
 * @throws TypeError if not a typed array
 */
declare function validateTypedArray(value: unknown): TypedArray;

/**
 * Creates a new typed array instance from a constructor
 * @param constructor - TypedArray constructor
 * @param length - Desired length
 * @returns New typed array instance
 */
declare function createTypedArray(constructor: TypedArrayConstructor, length: number): TypedArray;

/**
 * Creates typed array from iterable or array-like
 * @param constructor - TypedArray constructor
 * @param source - Source iterable or array-like
 * @returns New typed array with copied values
 */
declare function createFromIterable(constructor: TypedArrayConstructor, source: Iterable<number> | ArrayLike<number>): TypedArray;

/**
 * Creates typed array from values
 * @param constructor - TypedArray constructor
 * @param values - Values to populate array with
 * @returns New typed array
 */
declare function createFromValues(constructor: TypedArrayConstructor, values: number[]): TypedArray;

/**
 * Checks if property access should use typed array semantics
 * @param target - The typed array instance
 * @param key - Property key to check
 * @returns True if key represents a valid numeric index
 */
declare function isTypedArrayIndex(target: unknown, key: PropertyKey): boolean;

/**
 * Custom property descriptor getter for typed arrays
 * @param target - Target typed array
 * @param key - Property key
 * @returns Property descriptor or undefined
 */
declare function getOwnPropertyDescriptor(target: object, key: PropertyKey): PropertyDescriptor | undefined;

/**
 * Custom property descriptor setter for typed arrays
 * @param target - Target typed array
 * @param key - Property key
 * @param descriptor - Property descriptor to set
 * @returns True if successful
 */
declare function defineProperty(target: object, key: PropertyKey, descriptor: PropertyDescriptor): boolean;

/**
 * Defines internal data accessor property
 * @param target - Target object
 * @param key - Property key (e.g., "buffer", "byteOffset")
 * @param internalKey - Key in _d object (e.g., "b", "o")
 */
declare function defineInternalAccessor(target: object, key: string, internalKey: keyof TypedArrayInternalData): void;

/**
 * TypedArray prototype methods interface
 */
interface TypedArrayPrototype {
  /** Copies array section to another location */
  copyWithin(target: number, start: number, end?: number): this;
  
  /** Tests whether all elements pass predicate */
  every(predicate: (value: number, index: number, array: TypedArray) => boolean, thisArg?: unknown): boolean;
  
  /** Fills array with static value */
  fill(value: number, start?: number, end?: number): this;
  
  /** Returns elements that pass predicate */
  filter(predicate: (value: number, index: number, array: TypedArray) => boolean, thisArg?: unknown): TypedArray;
  
  /** Returns first element satisfying predicate */
  find(predicate: (value: number, index: number, array: TypedArray) => boolean, thisArg?: unknown): number | undefined;
  
  /** Returns index of first element satisfying predicate */
  findIndex(predicate: (value: number, index: number, array: TypedArray) => boolean, thisArg?: unknown): number;
  
  /** Executes function for each element */
  forEach(callback: (value: number, index: number, array: TypedArray) => void, thisArg?: unknown): void;
  
  /** Returns first index of value */
  indexOf(searchElement: number, fromIndex?: number): number;
  
  /** Determines whether array includes value */
  includes(searchElement: number, fromIndex?: number): boolean;
  
  /** Joins all elements into string */
  join(separator?: string): string;
  
  /** Returns last index of value */
  lastIndexOf(searchElement: number, fromIndex?: number): number;
  
  /** Creates new array with results of calling function on every element */
  map(callback: (value: number, index: number, array: TypedArray) => number, thisArg?: unknown): TypedArray;
  
  /** Reduces array to single value (left-to-right) */
  reduce<T>(callback: (accumulator: T, value: number, index: number, array: TypedArray) => T, initialValue?: T): T;
  
  /** Reduces array to single value (right-to-left) */
  reduceRight<T>(callback: (accumulator: T, value: number, index: number, array: TypedArray) => T, initialValue?: T): T;
  
  /** Reverses array in place */
  reverse(): this;
  
  /** Tests whether at least one element passes predicate */
  some(predicate: (value: number, index: number, array: TypedArray) => boolean, thisArg?: unknown): boolean;
  
  /** Sorts array in place */
  sort(compareFn?: (a: number, b: number) => number): this;
  
  /** Returns shallow copy of portion of array */
  subarray(begin?: number, end?: number): TypedArray;
  
  /** Returns shallow copy of portion of array */
  slice(start?: number, end?: number): TypedArray;
  
  /** Copies values from source into array */
  set(source: ArrayLike<number>, offset?: number): void;
  
  /** Returns iterator for [index, value] pairs */
  entries(): Iterator<[number, number]>;
  
  /** Returns iterator for indices */
  keys(): Iterator<number>;
  
  /** Returns iterator for values */
  values(): Iterator<number>;
  
  /** Converts array to string */
  toString(): string;
  
  /** Converts array to localized string */
  toLocaleString(): string;
  
  /** Number of bytes per element */
  readonly BYTES_PER_ELEMENT: number;
  
  /** Underlying ArrayBuffer */
  readonly buffer: ArrayBuffer;
  
  /** Byte offset in buffer */
  readonly byteOffset: number;
  
  /** Byte length of array */
  readonly byteLength: number;
  
  /** Number of elements */
  readonly length: number;
}