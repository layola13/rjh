/**
 * Type definition for WASM type registration module
 * Handles bidirectional conversion between JavaScript and WebAssembly wire types
 */

/**
 * Heap reference table mapping wire type IDs to JavaScript values
 */
declare const ht: Record<number, { value: unknown }>;

/**
 * Decrements reference count and potentially frees a wire type handle
 * @param handle - The wire type handle to release
 */
declare function pt(handle: number): void;

/**
 * Converts a JavaScript value to a wire type handle and increments reference count
 * @param value - The JavaScript value to convert
 * @returns Wire type handle (numeric pointer)
 */
declare function wt(value: unknown): number;

/**
 * Reads a pointer value from a memory location
 * @param pointer - Memory address to read from
 * @returns The value at the specified address
 */
declare function ZA(pointer: number): unknown;

/**
 * Canonicalizes or prepares a type name for registration
 * @param typeName - Raw type name
 * @returns Processed type name
 */
declare function CA(typeName: string): string;

/**
 * Type registration configuration object
 */
interface TypeRegistration {
  /** Canonical name of the type */
  name: string;
  
  /**
   * Converts from WebAssembly wire format to JavaScript value
   * @param wireHandle - Handle to the wire type value
   * @returns The JavaScript value
   */
  fromWireType(wireHandle: number): unknown;
  
  /**
   * Converts from JavaScript value to WebAssembly wire format
   * @param destructors - Optional destructor list for cleanup tracking
   * @param jsValue - The JavaScript value to convert
   * @returns Handle to the wire type value
   */
  toWireType(destructors: unknown[] | null, jsValue: unknown): number;
  
  /** Number of bytes to advance argument pointer when reading this type */
  argPackAdvance: number;
  
  /**
   * Function to read this type's value from a pointer location
   * @param pointer - Memory address to read from
   * @returns The value at the specified address
   */
  readValueFromPointer(pointer: number): unknown;
  
  /** Optional destructor function for cleanup (null if not needed) */
  destructorFunction: ((handle: number) => void) | null;
}

/**
 * Registers a WebAssembly type with the embind type system
 * @param rawType - Raw type identifier from WebAssembly
 * @param registration - Type conversion and metadata configuration
 */
declare function bA(rawType: unknown, registration: TypeRegistration): void;

/**
 * Module entry point: Registers a reference-counted heap value type
 * @param rawType - Raw type identifier from WASM
 * @param typeName - Human-readable type name
 */
declare function registerHeapValueType(rawType: unknown, typeName: string): void;