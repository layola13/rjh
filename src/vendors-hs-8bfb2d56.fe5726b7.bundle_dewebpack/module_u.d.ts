/**
 * Registers a floating-point primitive type in the type system.
 * Handles conversion between JavaScript numbers and WASM memory representations.
 * 
 * @param rawType - The raw type identifier from the WASM runtime
 * @param typeName - The human-readable name of the type (e.g., "float", "double")
 * @param typeSize - The size of the type in bytes (2 for float, 3 for double)
 */
declare function registerFloatType(
  rawType: unknown,
  typeName: string,
  typeSize: number
): void;

/**
 * Represents a registered floating-point type with conversion methods.
 */
interface FloatTypeRegistration {
  /** The name of the registered type */
  name: string;

  /**
   * Converts a value from WASM wire format to JavaScript format.
   * For primitives, this is a pass-through operation.
   * 
   * @param value - The value in wire format
   * @returns The value as a JavaScript number
   */
  fromWireType(value: number): number;

  /**
   * Converts a JavaScript value to WASM wire format.
   * Validates that the value is a number or boolean.
   * 
   * @param destructors - Destructor list (unused for primitives)
   * @param value - The JavaScript value to convert
   * @returns The value in wire format
   * @throws {TypeError} If the value is not a number or boolean
   */
  toWireType(destructors: unknown, value: unknown): number | boolean;

  /** Number of bytes to advance when reading arguments (always 8 for alignment) */
  argPackAdvance: 8;

  /**
   * Creates a function to read values from pointer locations in WASM memory.
   * 
   * @param typeName - The name of the type being read
   * @param typeSize - The size indicator (2 = float/Float32, 3 = double/Float64)
   * @returns A function that reads from WASM memory at the given pointer address
   * @throws {TypeError} If the type size is unknown
   */
  readValueFromPointer(typeName: string, typeSize: number): (pointer: number) => number;

  /** No destructor needed for primitive types */
  destructorFunction: null;
}

/**
 * WASM Float32Array heap view (accessed as 'A' in minified code).
 * Used to read 32-bit floats from WASM memory.
 */
declare const HEAPF32: Float32Array;

/**
 * WASM Float64Array heap view (accessed as 'D' in minified code).
 * Used to read 64-bit doubles from WASM memory.
 */
declare const HEAPF64: Float64Array;

/**
 * Gets a human-readable type description for error messages.
 * 
 * @param value - The value to describe
 * @returns A string describing the type of the value
 */
declare function getTypeName(value: unknown): string;

/**
 * Registers a type in the Embind type registry.
 * 
 * @param rawType - The raw type identifier
 * @param typeRegistration - The type registration object
 */
declare function registerType(rawType: unknown, typeRegistration: FloatTypeRegistration): void;

/**
 * Validates/normalizes a raw type value from WASM.
 * 
 * @param rawType - The raw type to validate
 * @returns The normalized type identifier
 */
declare function requireRegisteredType(rawType: unknown): unknown;

/**
 * Reads a string from WASM memory.
 * 
 * @param pointer - Pointer to the string in WASM memory
 * @returns The decoded string
 */
declare function readLatin1String(pointer: number): string;