/**
 * Module: module_J
 * Original ID: J
 * 
 * Registers a typed array string type for Emscripten bindings.
 * Handles conversion between JavaScript strings and C++ typed array representations.
 */

/**
 * Type definition for heap view getter functions
 */
type HeapViewGetter = () => Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;

/**
 * Type definition for destructor callback
 */
type DestructorFunction = (pointer: number) => void;

/**
 * Type definition for cleanup stack
 */
type CleanupStack = Array<(pointer: number) => void> | null;

/**
 * Options for registering a typed array string type
 */
interface RegisterTypedArrayStringOptions {
  /** The name of the registered type */
  name: string;
  
  /** Converts from wire format (C++ memory) to JavaScript string */
  fromWireType: (pointer: number) => string;
  
  /** Converts from JavaScript string to wire format (C++ memory) */
  toWireType: (cleanupStack: CleanupStack, value: string): number;
  
  /** Number of bytes to advance argument pointer */
  argPackAdvance: number;
  
  /** Function to read value from pointer */
  readValueFromPointer: (pointer: number) => unknown;
  
  /** Function to destroy allocated memory */
  destructorFunction: DestructorFunction;
}

/**
 * Registers a typed array string type binding.
 * 
 * @param embindHandle - The Embind handle for type registration
 * @param elementSize - Size of each element (2 for UTF-16, 4 for UTF-32)
 * @param typeName - The raw type name to be processed
 */
declare function registerTypedArrayString(
  embindHandle: number,
  elementSize: 2 | 4,
  typeName: string
): void;

/**
 * Gets the appropriate heap view based on element size
 * @param elementSize - Size of each element in bytes
 * @returns Heap view getter function and bit shift amount
 */
declare function getHeapView(elementSize: 2 | 4): {
  heapViewGetter: HeapViewGetter;
  bitShift: number;
};

/**
 * Processes and normalizes type name
 * @param rawTypeName - The raw type name
 * @returns Normalized type name
 */
declare function getTypeName(rawTypeName: string): string;

/**
 * Registers an Embind type with given options
 * @param handle - The Embind handle
 * @param options - Type registration options
 */
declare function registerType(
  handle: number,
  options: RegisterTypedArrayStringOptions
): void;

/**
 * Allocates memory for typed array string
 * @param byteSize - Number of bytes to allocate
 * @returns Pointer to allocated memory
 */
declare function allocateMemory(byteSize: number): number;

/**
 * Frees allocated memory
 * @param pointer - Pointer to memory to free
 */
declare function freeMemory(pointer: number): void;

/**
 * Reads a generic value from pointer
 * @param pointer - Memory pointer
 * @returns The value at the pointer
 */
declare function readValueFromPointer(pointer: number): unknown;

/**
 * Global heap views
 */
declare const HEAP8: Int8Array;
declare const HEAPU8: Uint8Array;
declare const HEAP16: Int16Array;
declare const HEAPU16: Uint16Array;
declare const HEAP32: Int32Array;
declare const HEAPU32: Uint32Array;