/**
 * Type registration configuration for void types
 */
interface VoidTypeConfig {
  /**
   * Indicates this is a void type that doesn't return a value
   */
  isVoid: true;

  /**
   * The normalized name of the type
   */
  name: string;

  /**
   * Number of argument positions to advance (0 for void types)
   */
  argPackAdvance: 0;

  /**
   * Converts from wire format (C++) to JavaScript
   * Void types don't perform any conversion
   */
  fromWireType: () => void;

  /**
   * Converts from JavaScript to wire format (C++)
   * @param destructors - Optional array to collect destructors for cleanup
   * @param value - The value to convert (unused for void types)
   */
  toWireType: (destructors: unknown[] | null, value: unknown) => void;
}

/**
 * Registers a void type with the type system
 * 
 * @param rawType - The raw type identifier from the native layer
 * @param config - Configuration object defining the void type behavior
 * 
 * @remarks
 * This function is typically used in WebAssembly/Emscripten bindings to register
 * void return types for functions that don't return values.
 * 
 * @example
 *