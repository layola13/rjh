/**
 * Registers a boolean type for WebAssembly interop.
 * Handles conversion between JavaScript boolean values and their wire format representation.
 * 
 * @param rawType - The raw type identifier for the boolean type
 * @param typeName - The name of the boolean type being registered
 * @param typeSize - The size of the boolean type in bytes (1, 2, or 4)
 * @param trueValue - The wire format value representing true
 * @param falseValue - The wire format value representing false
 */
declare function registerBooleanType(
  rawType: unknown,
  typeName: string,
  typeSize: number,
  trueValue: number,
  falseValue: number
): void;

/**
 * Configuration for a registered boolean type.
 */
interface BooleanTypeConfig {
  /**
   * The normalized type name.
   */
  name: string;

  /**
   * Converts a value from wire format (WebAssembly) to JavaScript boolean.
   * 
   * @param value - The wire format value (numeric)
   * @returns The JavaScript boolean representation
   */
  fromWireType(value: number): boolean;

  /**
   * Converts a JavaScript value to wire format for WebAssembly.
   * 
   * @param destructors - Optional destructor list (unused for primitives)
   * @param value - The JavaScript boolean value to convert
   * @returns The wire format representation (trueValue or falseValue)
   */
  toWireType(destructors: unknown, value: boolean): number;

  /**
   * Number of bytes to advance when reading arguments (always 8 for alignment).
   */
  argPackAdvance: 8;

  /**
   * Reads a boolean value from a pointer in memory.
   * 
   * @param pointer - Memory address to read from
   * @returns The JavaScript boolean value
   */
  readValueFromPointer(pointer: number): boolean;

  /**
   * Destructor function (null for primitive types).
   */
  destructorFunction: null;
}

/**
 * Heap view types for reading different sized integers.
 */
declare const Int8ArrayView: Int8Array;
declare const Int16ArrayView: Int16Array;
declare const Int32ArrayView: Int32Array;

/**
 * Computes the shift amount for pointer indexing based on type size.
 * 
 * @param size - The size in bytes (1, 2, 4, or 8)
 * @returns The shift amount (0, 1, 2, or 3)
 */
declare function getShiftFromSize(size: number): number;

/**
 * Registers a type in the type registry.
 * 
 * @param rawType - The raw type identifier
 * @param config - The type configuration object
 */
declare function registerType(rawType: unknown, config: BooleanTypeConfig): void;

/**
 * Normalizes a type name by removing redundant spaces.
 * 
 * @param name - The raw type name
 * @returns The normalized type name
 */
declare function normalizeTypeName(name: string): string;