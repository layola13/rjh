/**
 * Type definitions for Emscripten std::string bindings
 * Registers a type binding for std::string conversion between JS and WebAssembly
 */

/**
 * Represents a pointer to a memory location in WebAssembly linear memory
 */
type WasmPointer = number;

/**
 * Destructor function type that frees allocated memory
 */
type DestructorFunction = (pointer: WasmPointer) => void;

/**
 * Type descriptor for wire type conversion
 */
interface WireTypeDescriptor {
  /** The C++ type name */
  name: string;
  
  /** 
   * Converts from WebAssembly wire format to JavaScript value
   * @param pointer - Pointer to the std::string data in WASM memory
   * @returns The decoded JavaScript string
   */
  fromWireType: (pointer: WasmPointer) => string;
  
  /** 
   * Converts from JavaScript value to WebAssembly wire format
   * @param destructors - Optional array to collect destructor functions
   * @param value - The JavaScript string or typed array to convert
   * @returns Pointer to the allocated std::string in WASM memory
   */
  toWireType: (destructors: DestructorFunction[] | null, value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array) => WasmPointer;
  
  /** Number of bytes to advance when reading arguments (size of pointer + metadata) */
  argPackAdvance: 8;
  
  /** Function to read the value from a pointer */
  readValueFromPointer: (pointer: WasmPointer) => string;
  
  /** Function to destroy/free the allocated memory */
  destructorFunction: DestructorFunction;
}

/**
 * Global typed arrays representing WebAssembly memory views
 */
declare const S: Int32Array;  // 32-bit signed integer view
declare const N: Uint8Array;  // 8-bit unsigned integer view (byte array)

/**
 * Decodes UTF-8 byte sequence to JavaScript string
 * @param buffer - Pointer to start of UTF-8 data
 * @param length - Number of bytes to decode
 * @returns Decoded string
 */
declare function v(buffer: WasmPointer, length: number): string;

/**
 * Frees allocated WebAssembly memory
 * @param pointer - Pointer to memory to free
 */
declare function _t(pointer: WasmPointer): void;

/**
 * Allocates memory in WebAssembly heap
 * @param size - Number of bytes to allocate
 * @returns Pointer to allocated memory
 */
declare function Kt(size: number): WasmPointer;

/**
 * Throws an error with the given message
 * @param message - Error message
 */
declare function yA(message: string): never;

/**
 * Retrieves the canonical type name
 * @param rawTypeName - Raw C++ type name
 * @returns Canonical type name
 */
declare function CA(rawTypeName: string): string;

/**
 * Registers a type binding for embind
 * @param typePointer - Pointer to the type information
 * @param descriptor - Type conversion descriptor
 */
declare function bA(typePointer: WasmPointer, descriptor: WireTypeDescriptor): void;

/**
 * Reads value from pointer (implementation varies by type)
 */
declare function ZA(pointer: WasmPointer): string;

/**
 * Module function that registers std::string type binding
 * @param typePointer - Pointer to the type metadata in WASM memory
 * @param rawTypeName - Raw C++ type name (e.g., "std::string")
 */
declare function registerStdStringBinding(
  typePointer: WasmPointer,
  rawTypeName: string
): void;