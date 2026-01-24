/**
 * Reads and wraps an emval value from a pointer.
 * 
 * This function retrieves a value type from the emval registry,
 * reads the actual value from the provided pointer, and wraps it
 * for JavaScript consumption.
 * 
 * @param valueType - The emval value type identifier (originally registered as "_emval_take_value")
 * @param pointer - Memory pointer to the value location
 * @returns The wrapped value ready for JavaScript usage
 * 
 * @remarks
 * This is typically used in WebAssembly/Emscripten bindings to safely
 * transfer values from C++ to JavaScript through the emval system.
 */
declare function readAndWrapEmvalValue(
  valueType: string,
  pointer: number
): unknown;

/**
 * Retrieves a registered value type from the emval type registry.
 * 
 * @param typeName - The registered type name (e.g., "_emval_take_value")
 * @returns A value type handler with methods for reading from pointers
 */
declare function getValueType(typeName: string): EmvalValueType;

/**
 * Wraps a raw emval value for JavaScript consumption.
 * 
 * @param rawValue - The raw value read from WebAssembly memory
 * @returns The wrapped value, type-safe for JavaScript usage
 */
declare function wrapEmvalValue(rawValue: unknown): unknown;

/**
 * Interface representing an emval value type handler.
 */
interface EmvalValueType {
  /**
   * Reads a value from the specified memory pointer.
   * 
   * @param pointer - Memory address where the value is stored
   * @returns The raw value read from memory
   */
  readValueFromPointer(pointer: number): unknown;
}