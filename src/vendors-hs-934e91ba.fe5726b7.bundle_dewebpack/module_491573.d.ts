/**
 * Path conversion utilities for transforming between different path representations.
 * Supports conversions between: DoubleArray ↔ Paths ↔ NativePaths
 */

/**
 * Represents a single path structure
 */
export interface Path {
  // Path-specific properties would be defined based on the actual implementation
  [key: string]: unknown;
}

/**
 * Collection of paths
 */
export type Paths = Path[];

/**
 * Native path object from WebAssembly/C++ module
 */
export interface NativePaths {
  /** Releases memory allocated for this native paths object */
  delete(): void;
  [key: string]: unknown;
}

/**
 * WebAssembly/Native module interface
 */
export interface NativeModule {
  /** Native Paths constructor */
  Paths: new () => NativePaths;
  
  /** Converts native paths to double array representation */
  fromPaths(paths: NativePaths): Float64Array;
  
  /** Populates native paths from double array at given byte offset */
  toPaths(paths: NativePaths, byteOffset: number): void;
}

/**
 * Result of reading a path from a double array
 */
export interface PathReadResult {
  /** The parsed path */
  path: Path;
  /** Pointer to the end position after reading */
  ptrEnd: number;
}

/**
 * Converts a paths array to a double array representation.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param paths - Array of paths to convert
 * @returns Double array containing encoded paths with length prefix
 */
export function pathsToDoubleArray(
  nativeModule: NativeModule,
  paths: Paths
): Float64Array;

/**
 * Converts a double array to native paths object.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param doubleArray - Double array containing encoded paths
 * @param shouldFreeMemory - Whether to free the double array after conversion
 * @returns Native paths object
 */
export function doubleArrayToNativePaths(
  nativeModule: NativeModule,
  doubleArray: Float64Array,
  shouldFreeMemory: boolean
): NativePaths;

/**
 * Converts paths array directly to native paths object.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param paths - Array of paths to convert
 * @returns Native paths object (intermediate double array is freed automatically)
 */
export function pathsToNativePaths(
  nativeModule: NativeModule,
  paths: Paths
): NativePaths;

/**
 * Converts native paths object to double array representation.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param nativePaths - Native paths object to convert
 * @param shouldDelete - Whether to delete the native paths object after conversion
 * @returns Double array containing encoded paths
 */
export function nativePathsToDoubleArray(
  nativeModule: NativeModule,
  nativePaths: NativePaths,
  shouldDelete: boolean
): Float64Array;

/**
 * Converts a double array to paths array.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param doubleArray - Double array containing encoded paths
 * @param shouldFreeMemory - Whether to free the double array after conversion
 * @returns Array of decoded paths
 */
export function doubleArrayToPaths(
  nativeModule: NativeModule,
  doubleArray: Float64Array,
  shouldFreeMemory: boolean
): Paths;

/**
 * Converts native paths object directly to paths array.
 * 
 * @param nativeModule - The WebAssembly/native module instance
 * @param nativePaths - Native paths object to convert
 * @param shouldDelete - Whether to delete the native paths object after conversion
 * @returns Array of paths (intermediate double array is freed automatically)
 */
export function nativePathsToPaths(
  nativeModule: NativeModule,
  nativePaths: NativePaths,
  shouldDelete: boolean
): Paths;