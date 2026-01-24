/**
 * Type definition for std::string wire representation.
 * This module handles marshalling between JavaScript strings and C++ std::string across the Emscripten boundary.
 */

/**
 * Wire type pointer representing a memory address
 */
type WireTypePointer = number;

/**
 * Destructor function type for cleaning up allocated memory
 */
type DestructorFunction = (pointer: WireTypePointer) => void;

/**
 * Type registry function for registering C++ types with Emscripten
 */
type RegisterTypeFunction = (
  typeId: unknown,
  config: TypeConfiguration
) => void;

/**
 * Configuration for type marshalling between JavaScript and C++
 */
interface TypeConfiguration {
  /** The C++ type name (e.g., "std::string", "std::basic_string<unsigned char>") */
  name: string;

  /**
   * Converts from wire type (C++ memory representation) to JavaScript value
   * @param pointer - Memory pointer to the std::string data
   * @returns Decoded JavaScript string
   */
  fromWireType: (pointer: WireTypePointer) => string;

  /**
   * Converts from JavaScript value to wire type (C++ memory representation)
   * @param destructors - Array to register cleanup functions (nullable)
   * @param value - JavaScript string or ArrayBuffer to encode
   * @returns Memory pointer to the allocated std::string data
   */
  toWireType: (
    destructors: DestructorFunction[] | null,
    value: string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array
  ) => WireTypePointer;

  /** Number of bytes to advance when reading arguments from stack */
  argPackAdvance: 8;

  /**
   * Reads a value from a pointer
   * @param pointer - Memory pointer to read from
   * @returns The value at the pointer
   */
  readValueFromPointer: (pointer: WireTypePointer) => unknown;

  /**
   * Cleanup function called when the value is no longer needed
   * @param pointer - Memory pointer to deallocate
   */
  destructorFunction: DestructorFunction;
}

/**
 * Registers std::string or std::basic_string type with Emscripten type system.
 * Handles bidirectional conversion between JavaScript strings and C++ std::string.
 * 
 * @param typeId - Unique identifier for this type registration
 * @param typeName - C++ type name (e.g., "std::string" for char-based, "std::basic_string<unsigned char>" for byte-based)
 * 
 * @remarks
 * - For "std::string": Uses UTF-8 encoding/decoding with null-terminator handling
 * - For other types: Treats as raw byte array (Uint8Array equivalent)
 * - Memory layout: [4 bytes length][N bytes data][1 byte null terminator]
 */
declare function registerStdStringType(
  typeId: unknown,
  typeName: string
): void;

/**
 * Memory heap views (assumed to be declared in global Emscripten runtime)
 */
declare const C: Int32Array;  // HEAP32 - 32-bit integer view
declare const P: Uint8Array;  // HEAPU8 - 8-bit unsigned integer view

/**
 * Memory management functions (Emscripten runtime)
 */
declare function St(size: number): WireTypePointer;  // _malloc equivalent
declare function Tt(pointer: WireTypePointer): void;  // _free equivalent
declare function N(pointer: WireTypePointer): string; // UTF8ToString equivalent

/**
 * Utility functions (Emscripten runtime)
 */
declare function ee(typeName: string): string;  // Normalizes type name
declare function he(typeId: unknown, config: TypeConfiguration): void;  // Register type
declare function Ue(pointer: WireTypePointer): unknown;  // simpleReadValueFromPointer
declare function le(message: string): never;  // throwBindingError