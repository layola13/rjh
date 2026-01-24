/**
 * Registers a C++ string type binding for Emscripten runtime.
 * Handles conversion between JavaScript strings and C++ string types (std::string or std::wstring).
 * 
 * @module StringTypeBinding
 */

/**
 * Type definition for string encoding/decoding functions
 */
interface StringCodec {
  /** Decodes bytes to string (e.g., UTF8ToString, UTF16ToString) */
  decode: (ptr: number, length: number) => string;
  /** Encodes string to bytes (e.g., stringToUTF8, stringToUTF16) */
  encode: (str: string, ptr: number, maxLength: number) => void;
  /** Calculates encoded byte length (e.g., lengthBytesUTF8, lengthBytesUTF16) */
  calculateLength: (str: string) => number;
}

/**
 * Type definition for typed array getters
 */
type TypedArrayGetter = () => Uint8Array | Uint16Array | Uint32Array;

/**
 * Registers a string type for WebAssembly interop
 * 
 * @param exports - WebAssembly module exports object
 * @param charSize - Size of character in bytes (2 for UTF-16, 4 for UTF-32)
 * @param typeName - The C++ type name (e.g., "std::string", "std::wstring")
 */
declare function registerStringType(
  exports: Record<string, unknown>,
  charSize: 2 | 4,
  typeName: string
): void;

/**
 * String type registration implementation
 */
declare module 'emscripten-string-binding' {
  /**
   * Binding configuration for string type conversion
   */
  interface StringTypeBinding {
    /** The C++ type name */
    name: string;

    /**
     * Converts a C++ string pointer to JavaScript string
     * 
     * @param ptr - Pointer to C++ string object
     * @returns Decoded JavaScript string
     */
    fromWireType(ptr: number): string;

    /**
     * Converts a JavaScript string to C++ string format
     * 
     * @param destructors - Array to track objects requiring cleanup
     * @param value - JavaScript string to convert
     * @returns Pointer to allocated C++ string
     * @throws Error if value is not a string
     */
    toWireType(destructors: Array<(ptr: number) => void> | null, value: string): number;

    /** Number of bytes to advance in argument list */
    argPackAdvance: 8;

    /**
     * Reads value from pointer (simple pointer dereference)
     * 
     * @param ptr - Pointer to read from
     * @returns Value at pointer location
     */
    readValueFromPointer(ptr: number): unknown;

    /**
     * Destructor function to free C++ string memory
     * 
     * @param ptr - Pointer to C++ string to destroy
     */
    destructorFunction(ptr: number): void;
  }

  /**
   * Global memory views and utility functions
   */
  interface EmscriptenRuntime {
    /** 32-bit signed integer view of WebAssembly memory */
    HEAP32: Int32Array;
    
    /** 8-bit unsigned integer view of WebAssembly memory */
    HEAPU8: Uint8Array;
    
    /** 16-bit unsigned integer view of WebAssembly memory */
    HEAPU16: Uint16Array;

    /** Allocates memory on the heap */
    _malloc(size: number): number;

    /** Frees allocated memory */
    _free(ptr: number): void;

    /** Converts UTF-8 bytes to string */
    UTF8ToString(ptr: number, maxLength?: number): string;

    /** Converts UTF-16 bytes to string */
    UTF16ToString(ptr: number, maxLength?: number): string;

    /** Writes UTF-8 string to memory */
    stringToUTF8(str: string, ptr: number, maxLength: number): void;

    /** Writes UTF-16 string to memory */
    stringToUTF16(str: string, ptr: number, maxLength: number): void;

    /** Calculates UTF-8 byte length */
    lengthBytesUTF8(str: string): number;

    /** Calculates UTF-16 byte length */
    lengthBytesUTF16(str: string): number;

    /** Registers a type binding */
    registerType(exports: Record<string, unknown>, binding: StringTypeBinding): void;
  }
}