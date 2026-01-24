/**
 * Typed array support detection and configuration module.
 * Provides flags and constants for typed array and DataView feature detection.
 */

/**
 * List of all standard typed array constructor names.
 */
type TypedArrayConstructorName =
  | 'Int8Array'
  | 'Uint8Array'
  | 'Uint8ClampedArray'
  | 'Int16Array'
  | 'Uint16Array'
  | 'Int32Array'
  | 'Uint32Array'
  | 'Float32Array'
  | 'Float64Array';

/**
 * Typed array constructor interface.
 */
interface TypedArrayConstructor {
  prototype: Record<string, unknown>;
  new (length: number): TypedArray;
  new (array: ArrayLike<number> | ArrayBufferLike): TypedArray;
  new (buffer: ArrayBufferLike, byteOffset?: number, length?: number): TypedArray;
}

/**
 * Generic typed array instance interface.
 */
interface TypedArray {
  readonly length: number;
  readonly byteLength: number;
  readonly byteOffset: number;
  readonly buffer: ArrayBufferLike;
  [index: number]: number;
}

/**
 * Global environment interface with typed array constructors.
 */
interface GlobalEnvironment {
  ArrayBuffer?: ArrayBufferConstructor;
  DataView?: DataViewConstructor;
  Int8Array?: TypedArrayConstructor;
  Uint8Array?: TypedArrayConstructor;
  Uint8ClampedArray?: TypedArrayConstructor;
  Int16Array?: TypedArrayConstructor;
  Uint16Array?: TypedArrayConstructor;
  Int32Array?: TypedArrayConstructor;
  Uint32Array?: TypedArrayConstructor;
  Float32Array?: TypedArrayConstructor;
  Float64Array?: TypedArrayConstructor;
}

/**
 * Module export interface containing typed array support flags.
 */
export interface TypedArraySupportModule {
  /**
   * ArrayBuffer and DataView availability flag.
   * True if both ArrayBuffer and DataView are natively supported.
   */
  readonly ABV: boolean;

  /**
   * Constructor support flag.
   * True if all typed array constructors are present and properly configured.
   */
  readonly CONSTR: boolean;

  /**
   * Typed array symbol/property name.
   * Internal property key used to mark typed array prototypes.
   */
  readonly TYPED: string | symbol;

  /**
   * View symbol/property name.
   * Internal property key used to mark DataView-like objects.
   */
  readonly VIEW: string | symbol;
}

/**
 * Detects and exports typed array support information.
 * Iterates through all standard typed array constructors and marks their
 * prototypes with internal property flags.
 *
 * @returns Module containing feature detection flags and internal property keys
 */
declare const typedArraySupport: TypedArraySupportModule;

export default typedArraySupport;