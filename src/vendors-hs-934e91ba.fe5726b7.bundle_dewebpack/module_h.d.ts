/**
 * Registers an integer type with Emscripten's type system.
 * Handles conversion between JavaScript numbers and C/C++ integer types.
 * 
 * @param rawType - The raw type pointer from the C/C++ side
 * @param typeName - The C/C++ type name (e.g., "int32_t", "unsigned int")
 * @param typeSize - Size of the type in bytes (1, 2, 4, or 8)
 * @param minValue - Minimum valid value for this integer type
 * @param maxValue - Maximum valid value for this integer type
 */
declare function registerIntegerType(
  rawType: number,
  typeName: string,
  typeSize: number,
  minValue: number,
  maxValue: number
): void;

/**
 * Type information for registered integer types
 */
interface IntegerTypeRegistration {
  /** The canonical name of the type */
  name: string;
  
  /** 
   * Converts a value from the wire format (C/C++) to JavaScript 
   * @param value - The raw value from C/C++
   * @returns The converted JavaScript number
   */
  fromWireType: (value: number) => number;
  
  /** 
   * Converts a JavaScript value to the wire format (C/C++)
   * @param destructors - Optional array to collect destructors
   * @param value - The JavaScript value to convert
   * @returns The value in C/C++ representation
   * @throws {TypeError} If value is not a number or boolean, or is out of valid range
   */
  toWireType: (destructors: unknown, value: number | boolean) => number;
  
  /** Number of bytes to advance when packing arguments */
  argPackAdvance: 8;
  
  /** 
   * Reads a value from a pointer
   * @param pointer - Memory pointer to read from
   * @returns The value at the pointer location
   */
  readValueFromPointer: (pointer: number) => number;
  
  /** Destructor function (null for primitive integer types) */
  destructorFunction: null;
}

/**
 * Determines if a type name represents a signed integer type
 * @param typeName - The C/C++ type name
 * @returns true if the type is unsigned, false if signed
 */
declare function isUnsignedInteger(typeName: string): boolean;

/**
 * Gets the shift amount for a given byte size
 * @param byteSize - Size in bytes (1, 2, 4, or 8)
 * @returns The bit shift amount for type conversion
 */
declare function getShiftAmount(byteSize: number): number;

/**
 * Creates a value converter function that masks bits for the given type size
 * @param isSigned - Whether the integer type is signed
 * @param byteSize - Size of the type in bytes
 * @returns A function that properly masks/converts values
 */
declare function createValueConverter(
  isSigned: boolean,
  byteSize: number
): (value: number) => number;

/**
 * Converts a JavaScript value to a string representation for error messages
 * @param value - The value to convert
 * @returns String representation of the value's type
 */
declare function getTypeName(value: unknown): string;

/**
 * Registers type information in the Emscripten type registry
 * @param rawType - The raw type pointer
 * @param registration - The type registration information
 */
declare function registerType(
  rawType: number,
  registration: IntegerTypeRegistration
): void;

/**
 * Creates a pointer reader function for the given integer type
 * @param typeName - The C/C++ type name
 * @param shiftAmount - Bit shift amount for the type
 * @param isSigned - Whether the type is signed
 * @returns A function that reads values from memory pointers
 */
declare function createPointerReader(
  typeName: string,
  shiftAmount: number,
  isSigned: boolean
): (pointer: number) => number;