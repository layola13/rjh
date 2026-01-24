/**
 * Registers a boolean type in the embind type system.
 * Handles conversion between JavaScript boolean values and WebAssembly wire format.
 * 
 * @module BooleanTypeRegistration
 */

/**
 * Type representing a pointer address in WebAssembly memory
 */
type WirePointer = number;

/**
 * Configuration for boolean type conversion
 */
interface BooleanTypeConfig {
  /** The name of the registered type */
  name: string;
  
  /** Converts from wire format (WebAssembly) to JavaScript boolean */
  fromWireType: (wireValue: number) => boolean;
  
  /** Converts from JavaScript value to wire format (WebAssembly) */
  toWireType: (destructors: unknown[] | null, jsValue: boolean) => number;
  
  /** Number of bytes to advance when reading arguments from stack */
  argPackAdvance: number;
  
  /** Reads a boolean value from a pointer in WebAssembly memory */
  readValueFromPointer: (pointer: WirePointer) => boolean;
  
  /** Destructor function (null for primitive types like boolean) */
  destructorFunction: null;
}

/**
 * Memory view types for different byte sizes
 */
type MemoryView = Int8Array | Int16Array | Int32Array;

/**
 * Registers a boolean type with the embind type system.
 * 
 * @param typeRegistry - The type registry object to register into
 * @param typeName - The name of the boolean type being registered
 * @param byteSize - Size in bytes (1, 2, or 4) of the boolean representation
 * @param trueValue - Wire format value representing true
 * @param falseValue - Wire format value representing false
 * @throws {TypeError} If byteSize is not 1, 2, or 4
 */
declare function registerBooleanType(
  typeRegistry: unknown,
  typeName: string,
  byteSize: 1 | 2 | 4,
  trueValue: number,
  falseValue: number
): void;

/**
 * Gets the appropriate memory view for the given byte size
 * 
 * @param byteSize - Size in bytes (1, 2, or 4)
 * @returns The corresponding typed array view
 */
declare function getMemoryView(byteSize: number): MemoryView;

/**
 * Computes the shift amount for pointer arithmetic based on byte size
 * 
 * @param byteSize - Size in bytes
 * @returns Shift amount (log2 of byteSize)
 */
declare function computeShiftAmount(byteSize: number): number;

/**
 * Canonicalizes a type name for registration
 * 
 * @param typeName - The original type name
 * @returns The canonicalized type name
 */
declare function canonicalizeTypeName(typeName: string): string;

/**
 * Registers a type in the embind registry
 * 
 * @param typeRegistry - The registry to register into
 * @param config - Type configuration object
 */
declare function registerType(
  typeRegistry: unknown,
  config: BooleanTypeConfig
): void;