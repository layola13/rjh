/**
 * Converts a value to its wire type representation for Emscripten's embind system.
 * 
 * This function is part of the emval (Emscripten value) system, which enables 
 * JavaScript-C++ interop by marshalling values between the two environments.
 * 
 * @module module_s
 * @param value - The value to be converted to wire type
 * @param typeConverter - Type converter instance that handles the conversion
 * @param outputPointer - Memory pointer (byte offset) where the result will be stored
 * @returns The converted wire type value
 */
declare function convertToWireType(
  value: unknown,
  typeConverter: EmvalTypeConverter,
  outputPointer: number
): number;

/**
 * Type converter interface for Emscripten's embind system.
 * Handles conversion between JavaScript values and C++ wire types.
 */
interface EmvalTypeConverter {
  /**
   * Converts a JavaScript value to its wire type representation.
   * 
   * @param destructors - Array to collect destructor functions for cleanup
   * @param value - The JavaScript value to convert
   * @returns The wire type representation
   */
  toWireType(destructors: unknown[], value: unknown): number;
}

/**
 * Wraps a JavaScript value into the emval system.
 * 
 * @param value - The value to wrap
 * @returns Handle/index to the wrapped value
 */
declare function ut(value: unknown[]): number;

/**
 * Looks up or retrieves a type converter by name.
 * 
 * @param typeName - The name of the type (e.g., "emval::as")
 * @param contextInfo - Additional context information for error messages
 * @returns The type converter instance
 */
declare function pt(typeName: unknown, contextInfo: string): EmvalTypeConverter;

/**
 * Loads or converts a value from the emval system.
 * 
 * @param handle - Handle to the emval value
 * @returns The loaded value
 */
declare function lt(handle: unknown): unknown;

/**
 * Emscripten HEAP32 view - 32-bit integer typed array view of WebAssembly memory.
 * Used for reading/writing 32-bit values at specific memory addresses.
 */
declare const O: Int32Array;

export { convertToWireType, EmvalTypeConverter, ut, pt, lt, O };