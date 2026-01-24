/**
 * Path conversion utilities for handling coordinate arrays and native Path objects.
 * Provides bidirectional conversion between different path representations:
 * - Plain coordinate arrays (Point[])
 * - Double arrays (Float64Array)
 * - Native Path objects from WASM/C++ bindings
 */

/**
 * Represents a 2D point in coordinate space
 */
interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Native module interface with WASM/C++ bindings
 */
interface NativeModule {
  /** Native Path class constructor */
  Path: new () => NativePath;
  
  /**
   * Converts a double array to a native Path object
   * @param path - Target path object to populate
   * @param byteOffset - Byte offset in the double array
   */
  toPath(path: NativePath, byteOffset: number): void;
  
  /**
   * Converts a native Path object to a double array
   * @param path - Source native path object
   * @returns Double array representation
   */
  fromPath(path: NativePath): Float64Array;
}

/**
 * Native Path object from WASM/C++ bindings
 */
interface NativePath {
  /**
   * Releases native memory resources
   */
  delete(): void;
}

/**
 * Result of parsing a path from a double array
 */
interface ParsedPathResult {
  /** Parsed coordinate array */
  path: Point[];
  /** Pointer position after parsing */
  ptrEnd: number;
}

/**
 * Calculates the number of items needed to store a path in a double array.
 * Format: [length, x1, y1, x2, y2, ..., xn, yn]
 * 
 * @param path - Array of coordinate points
 * @returns Total number of double values needed (1 + path.length * 2)
 */
export function getNofItemsForPath(path: Point[]): number;

/**
 * Writes a path to a pre-allocated double array starting at the specified offset.
 * Format: [length, x1, y1, x2, y2, ..., xn, yn]
 * 
 * @param path - Source coordinate array
 * @param targetArray - Target double array to write to
 * @param offset - Starting offset in the target array
 * @returns New offset position after writing (points to next available slot)
 */
export function writePathToDoubleArray(
  path: Point[],
  targetArray: Float64Array,
  offset: number
): number;

/**
 * Converts a coordinate array to a double array allocated in native memory.
 * The resulting array format: [length, x1, y1, x2, y2, ..., xn, yn]
 * 
 * @param module - Native module with memory allocation capabilities
 * @param path - Source coordinate array
 * @returns Allocated double array in native memory
 */
export function pathToDoubleArray(
  module: NativeModule,
  path: Point[]
): Float64Array;

/**
 * Converts a double array to a native Path object.
 * 
 * @param module - Native module with Path conversion capabilities
 * @param doubleArray - Source double array
 * @param shouldFreeArray - Whether to free the double array after conversion
 * @returns Native Path object
 */
export function doubleArrayToNativePath(
  module: NativeModule,
  doubleArray: Float64Array,
  shouldFreeArray: boolean
): NativePath;

/**
 * Converts a coordinate array directly to a native Path object.
 * Automatically allocates and frees intermediate double array.
 * 
 * @param module - Native module with conversion capabilities
 * @param path - Source coordinate array
 * @returns Native Path object
 */
export function pathToNativePath(
  module: NativeModule,
  path: Point[]
): NativePath;

/**
 * Converts a native Path object to a double array.
 * 
 * @param module - Native module with conversion capabilities
 * @param nativePath - Source native Path object
 * @param shouldDeletePath - Whether to delete the native Path after conversion
 * @returns Double array representation
 */
export function nativePathToDoubleArray(
  module: NativeModule,
  nativePath: NativePath,
  shouldDeletePath: boolean
): Float64Array;

/**
 * Parses a coordinate array from a double array starting at the specified offset.
 * 
 * @param module - Native module for memory management
 * @param doubleArray - Source double array
 * @param shouldFreeArray - Whether to free the double array after parsing
 * @param offset - Starting offset in the double array
 * @returns Parsed path and new offset position
 */
export function doubleArrayToPath(
  module: NativeModule,
  doubleArray: Float64Array,
  shouldFreeArray: boolean,
  offset: number
): ParsedPathResult;

/**
 * Converts a native Path object directly to a coordinate array.
 * Automatically handles intermediate conversions and cleanup.
 * 
 * @param module - Native module with conversion capabilities
 * @param nativePath - Source native Path object
 * @param shouldDeletePath - Whether to delete the native Path after conversion
 * @returns Coordinate array representation
 */
export function nativePathToPath(
  module: NativeModule,
  nativePath: NativePath,
  shouldDeletePath: boolean
): Point[];