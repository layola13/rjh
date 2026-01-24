/**
 * Type definition for WASM value wire type conversion module
 * Handles bidirectional conversion between JavaScript values and WebAssembly memory representations
 */

/**
 * Registers a type with the WASM type system
 * @param typeInfo - The type registration object containing conversion functions
 * @param typeName - The name of the type being registered
 */
declare function registerWasmType(
  typeInfo: TypeRegistrationInfo,
  typeName: NormalizedTypeName
): void;

/**
 * Normalizes a type name for consistent handling
 * @param rawTypeName - The raw type name to normalize
 * @returns Normalized type name string
 */
declare function normalizeTypeName(rawTypeName: string): NormalizedTypeName;

/**
 * Converts a WASM wire type pointer to a JavaScript value
 * @param wirePointer - Pointer to the value in WASM memory
 * @returns The JavaScript value stored at the pointer location
 */
declare function fromWireType(wirePointer: WireTypePointer): unknown;

/**
 * Converts a JavaScript value to WASM wire type representation
 * @param destructors - Optional destructor list for cleanup
 * @param value - The JavaScript value to convert
 * @returns Pointer to the value in WASM memory
 */
declare function toWireType(
  destructors: DestructorList | null,
  value: unknown
): WireTypePointer;

/**
 * Releases a WASM handle and frees associated resources
 * @param handle - The handle to release
 */
declare function releaseHandle(handle: WasmHandle): void;

/**
 * Creates a new handle for a JavaScript value in the WASM registry
 * @param value - The value to register
 * @returns Handle identifier for the registered value
 */
declare function createHandle(value: unknown): WasmHandle;

/**
 * Reads a pointer value from WASM memory
 * @param pointer - Memory address to read from
 * @returns The value read from memory
 */
declare function readPointerValue(pointer: MemoryPointer): unknown;

/**
 * Registry mapping WASM handles to their associated values
 */
declare const handleRegistry: Record<WasmHandle, { value: unknown }>;

// Type aliases for semantic clarity
type WireTypePointer = number;
type WasmHandle = number;
type MemoryPointer = number;
type NormalizedTypeName = string;
type DestructorList = unknown[] | null;

/**
 * Type registration configuration object
 */
interface TypeRegistrationInfo {
  /** The normalized name of the type */
  name: NormalizedTypeName;
  
  /** Converts from WASM wire representation to JavaScript value */
  fromWireType: (wirePointer: WireTypePointer) => unknown;
  
  /** Converts from JavaScript value to WASM wire representation */
  toWireType: (destructors: DestructorList | null, value: unknown) => WireTypePointer;
  
  /** Number of bytes to advance when reading arguments (typically 8 for 64-bit pointers) */
  argPackAdvance: 8;
  
  /** Function to read a value from a pointer location */
  readValueFromPointer: (pointer: MemoryPointer) => unknown;
  
  /** Optional destructor function for cleanup (null if no cleanup needed) */
  destructorFunction: (() => void) | null;
}