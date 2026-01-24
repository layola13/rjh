/**
 * Registers a primitive type (number or boolean) in the Embind type system.
 * This is typically used in WebAssembly/Emscripten bindings to define how
 * primitive types are marshalled between JavaScript and WebAssembly.
 */
declare function registerPrimitiveType(
  /** Raw type information object */
  typeInfo: unknown,
  /** The name of the type being registered (e.g., 'bool', 'int', 'float') */
  typeName: string,
  /** Signedness flag or additional type metadata */
  signedness: number
): void;

/**
 * Type descriptor for primitive types in the Embind system.
 */
interface PrimitiveTypeDescriptor {
  /** The registered name of the primitive type */
  name: string;

  /**
   * Converts a value from WebAssembly wire format to JavaScript.
   * For primitives, this is typically a no-op.
   * @param value - The value in wire format
   * @returns The JavaScript value
   */
  fromWireType(value: number | boolean): number | boolean;

  /**
   * Converts a JavaScript value to WebAssembly wire format.
   * Validates that the value is a number or boolean.
   * @param destructors - Optional destructor list for complex types (unused for primitives)
   * @param value - The JavaScript value to convert
   * @returns The value in wire format
   * @throws {TypeError} If the value is not a number or boolean
   */
  toWireType(destructors: unknown, value: unknown): number | boolean;

  /** Number of bytes to advance when reading arguments from the stack */
  argPackAdvance: 8;

  /**
   * Function pointer to read a value from a memory pointer.
   * Generated based on type name and signedness.
   */
  readValueFromPointer: (pointer: number) => number | boolean;

  /** Destructor function (null for primitive types as they don't need cleanup) */
  destructorFunction: null;
}