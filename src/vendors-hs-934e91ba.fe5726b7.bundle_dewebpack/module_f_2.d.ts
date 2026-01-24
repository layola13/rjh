/**
 * Typed array constructor types supported by the module
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
 * Configuration options for type registration
 */
interface TypeRegistrationOptions {
  /** Whether to ignore duplicate type registrations */
  ignoreDuplicateRegistrations?: boolean;
}

/**
 * Type information structure for wire format conversion
 */
interface TypeInfo {
  /** Canonical name of the registered type */
  name: string;
  /** Convert from wire format to JavaScript value */
  fromWireType: (pointer: number) => TypedArray;
  /** Number of bytes to advance the argument pointer */
  argPackAdvance: number;
  /** Read value from pointer in memory */
  readValueFromPointer: (pointer: number) => TypedArray;
}

/**
 * Union of all typed array types
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
 * Register a typed array type for WebAssembly interop
 * 
 * @param rawType - Raw type identifier from Emscripten
 * @param typeIndex - Index into typed array constructor table (0-7)
 * @param typeName - Mangled C++ type name to be canonicalized
 */
declare function registerTypedArrayType(
  rawType: unknown,
  typeIndex: number,
  typeName: string
): void;

/**
 * Create typed array view from WebAssembly memory pointer
 * 
 * @param pointer - Byte offset into WebAssembly heap
 * @returns Typed array view of the memory region
 */
declare function createTypedArrayFromPointer(pointer: number): TypedArray;

/**
 * Canonicalize a mangled C++ type name
 * 
 * @param mangledName - Mangled C++ type name
 * @returns Canonical JavaScript-friendly type name
 */
declare function canonicalizeTypeName(mangledName: string): string;

/**
 * Bind type information to a raw type identifier
 * 
 * @param rawType - Raw type identifier
 * @param typeInfo - Type conversion and metadata
 * @param options - Registration options
 */
declare function bindType(
  rawType: unknown,
  typeInfo: TypeInfo,
  options?: TypeRegistrationOptions
): void;