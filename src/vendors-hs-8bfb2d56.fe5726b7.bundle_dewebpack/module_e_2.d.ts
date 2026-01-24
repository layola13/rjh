/**
 * TypedArray registration module for WebAssembly bindings
 * Registers typed array types for marshalling between JavaScript and WASM memory
 */

/**
 * Available TypedArray constructor types indexed by type ID
 */
type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

/**
 * WASM memory heap interface
 */
interface WasmHeap {
  buffer: ArrayBuffer;
  [index: number]: number;
}

/**
 * Type registration options
 */
interface TypeRegistrationOptions {
  ignoreDuplicateRegistrations?: boolean;
}

/**
 * Type handler interface for wire-to-JS conversion
 */
interface TypeHandler<T = unknown> {
  /** Human-readable type name */
  name: string;
  /** Convert from WASM wire format to JavaScript value */
  fromWireType: (pointer: number) => T;
  /** Number of bytes to advance when reading arguments */
  argPackAdvance: number;
  /** Read value from pointer */
  readValueFromPointer: (pointer: number) => T;
}

/**
 * Registers a TypedArray type with the WASM runtime
 * 
 * @param typeId - Embind type identifier
 * @param typeIndex - Index into TypedArray constructor table (0-7)
 * @param rawTypeName - Encoded type name string
 */
declare function registerTypedArrayType(
  typeId: number,
  typeIndex: number,
  rawTypeName: number
): void;

/**
 * Creates a TypedArray view from WASM memory pointer
 * 
 * @param pointer - WASM memory pointer (byte offset)
 * @param TypedArrayConstructor - Constructor for the specific typed array type
 * @param heap - WASM memory heap accessor
 * @returns TypedArray view into WASM memory
 */
declare function createTypedArrayFromPointer<T extends TypedArray>(
  pointer: number,
  TypedArrayConstructor: TypedArrayConstructor,
  heap: WasmHeap
): T;

/**
 * Decodes a C++ mangled type name to readable string
 * 
 * @param encodedName - Encoded type name from WASM
 * @returns Decoded human-readable type name
 */
declare function decodeName(encodedName: number): string;

/**
 * Registers a type handler with the Embind type system
 * 
 * @param typeId - Unique type identifier
 * @param handler - Type conversion handler
 * @param options - Registration options
 */
declare function registerType<T>(
  typeId: number,
  handler: TypeHandler<T>,
  options?: TypeRegistrationOptions
): void;

/**
 * Union type for all TypedArray instances
 */
type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

/**
 * Global WASM heap reference (typically named HEAP8, HEAP16, etc.)
 */
declare const C: WasmHeap;

/**
 * Embind type registration function (typically named `he` or `_embind_register_*`)
 */
declare const he: typeof registerType;

/**
 * Name decoding function (typically named `ee` or `readLatin1String`)
 */
declare const ee: typeof decodeName;