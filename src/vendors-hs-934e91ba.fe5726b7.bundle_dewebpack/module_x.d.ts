/**
 * Module: module_x
 * Original ID: x
 */

/**
 * Registers a void type in the type system
 * @param typeId - The unique identifier for this type
 * @param rawTypeName - The raw name of the type to be canonicalized
 */
declare function registerVoidType(
  typeId: unknown,
  rawTypeName: unknown
): void;

/**
 * Configuration object for a void type registration
 */
interface VoidTypeConfig {
  /**
   * Indicates this is a void type (no value)
   */
  isVoid: true;
  
  /**
   * Canonicalized name of the type
   */
  name: string;
  
  /**
   * Number of arguments to advance (0 for void)
   */
  argPackAdvance: 0;
  
  /**
   * Converts from wire format to JavaScript representation
   * @returns undefined (void has no value)
   */
  fromWireType(): void;
  
  /**
   * Converts from JavaScript representation to wire format
   * @param destructors - Destructor list for cleanup
   * @param value - The value to convert (unused for void)
   * @returns undefined (void has no wire representation)
   */
  toWireType(destructors: unknown, value: unknown): void;
}

/**
 * Registers a type binding in the type system
 * @param typeId - The unique identifier for the type
 * @param config - Configuration object describing the type behavior
 */
declare function bA(typeId: unknown, config: VoidTypeConfig): void;

/**
 * Canonicalizes a type name
 * @param rawName - The raw type name to canonicalize
 * @returns The canonicalized type name
 */
declare function CA(rawName: unknown): string;