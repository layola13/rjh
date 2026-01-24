/**
 * Sets the errno value in WebAssembly/Emscripten memory and returns the error code.
 * 
 * This function is typically used in Emscripten-compiled code to set the errno
 * value at the memory location returned by ___errno_location().
 * 
 * @module module_c
 * @param errorCode - The error code to set
 * @returns The error code that was set
 */
export declare function setErrno(errorCode: number): number;

/**
 * Global heap buffer for WebAssembly memory access.
 * Represents the heap as a typed array for reading/writing values.
 */
declare const HEAP32: Int32Array;

/**
 * WebAssembly/Emscripten module interface containing runtime functions.
 */
interface EmscriptenModule {
  /**
   * Returns a pointer to the errno location in WebAssembly memory.
   * The pointer is a byte offset that should be shifted right by 2 to get the Int32 array index.
   * 
   * @returns Pointer (byte offset) to the errno memory location, or undefined if not available
   */
  ___errno_location?: () => number;
}

/**
 * The global Emscripten module instance.
 */
declare const wasmModule: EmscriptenModule;