/**
 * Integer type registration module for WebAssembly/Emscripten bindings
 * Handles registration of integer types with proper wire format conversion
 */

/**
 * Memory view interfaces for typed arrays
 */
interface MemoryViews {
  /** Int8Array view (x) */
  int8: Int8Array;
  /** Uint8Array view (P) */
  uint8: Uint8Array;
  /** Int16Array view (E) */
  int16: Int16Array;
  /** Uint16Array view (M) */
  uint16: Uint16Array;
  /** Int32Array view (O) */
  int32: Int32Array;
  /** Uint32Array view (C) */
  uint32: Uint32Array;
}

/**
 * Value transformer function type
 * @param value - The value to transform
 * @returns Transformed value
 */
type ValueTransformer = (value: number) => number;

/**
 * Pointer reader function type
 * @param pointer - Memory pointer address
 * @returns Value read from memory
 */
type PointerReader = (pointer: number) => number;

/**
 * Wire type conversion function
 * @param destructors - Destructor context (nullable)
 * @param value - JavaScript value to convert
 * @returns Converted value for C/C++ side
 */
type ToWireTypeFunction = (destructors: unknown, value: number | boolean) => number;

/**
 * Type registration configuration
 */
interface TypeRegistration {
  /** Type name */
  name: string;
  /** Convert from wire (C/C++) format to JS format */
  fromWireType: ValueTransformer;
  /** Convert from JS format to wire (C/C++) format */
  toWireType: ToWireTypeFunction;
  /** Number of bytes to advance in argument packing */
  argPackAdvance: number;
  /** Function to read value from pointer */
  readValueFromPointer: PointerReader;
  /** Destructor function (null for primitives) */
  destructorFunction: null;
}

/**
 * Registers an integer type with the runtime type system
 * 
 * @param rawType - Raw type identifier
 * @param typeName - Human-readable type name (e.g., "int32_t", "unsigned int")
 * @param byteSize - Size of the type in bytes (1, 2, or 4)
 * @param minValue - Minimum valid value for this type
 * @param maxValue - Maximum valid value for this type (default: 4294967295)
 * 
 * @remarks
 * This function handles:
 * - Signed/unsigned integer types
 * - 8-bit, 16-bit, and 32-bit integers
 * - Value range validation
 * - Proper bit masking for value transformation
 * - Memory alignment for pointer reads
 */
export function registerIntegerType(
  rawType: unknown,
  typeName: string,
  byteSize: number,
  minValue: number,
  maxValue?: number
): void;

/**
 * Internal helper: Get alignment information from byte size
 * @param byteSize - Size in bytes
 * @returns Alignment shift value
 */
declare function getAlignment(byteSize: number): number;

/**
 * Internal helper: Register type with runtime system
 * @param rawType - Raw type identifier
 * @param config - Type registration configuration
 */
declare function registerType(rawType: unknown, config: TypeRegistration): void;

/**
 * Internal helper: Get printable string representation of a value
 * @param value - Value to convert
 * @returns String representation
 */
declare function getTypeName(value: unknown): string;

/**
 * Internal helper: Get pointer reader function based on type characteristics
 * @param typeName - Type name
 * @param alignment - Byte alignment (0=byte, 1=word, 2=dword)
 * @param isSigned - Whether the type is signed
 * @returns Function that reads values from memory pointers
 */
declare function createPointerReader(
  typeName: string,
  alignment: number,
  isSigned: boolean
): PointerReader;