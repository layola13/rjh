/**
 * Curve I/O and management module
 * Handles serialization, deserialization, and registration of curve classes
 */

/**
 * Map storing registered curve classes by their class name
 */
declare const curveClassRegistry: Map<string, new () => Curve>;

/**
 * Serialization options for curve dumping
 */
export interface CurveDumpOptions {
  [key: string]: unknown;
}

/**
 * Serialized curve data structure
 */
export interface CurveData {
  /** The class name of the curve */
  Class: string;
  [key: string]: unknown;
}

/**
 * I/O handler for curve serialization and deserialization
 * Implements singleton pattern
 */
export declare class Curve_IO {
  /** Singleton instance */
  private static _instance?: Curve_IO;

  /**
   * Gets the singleton instance of Curve_IO
   * @returns The singleton Curve_IO instance
   */
  static instance(): Curve_IO;

  /**
   * Serializes a curve instance to a data object
   * @param curve - The curve instance to serialize
   * @param target - The target object to serialize to
   * @param includeMetadata - Whether to include metadata in the dump
   * @param options - Additional serialization options
   * @returns Serialized curve data containing at minimum the Class property
   */
  dump(
    curve: Curve,
    target: unknown,
    includeMetadata?: boolean,
    options?: CurveDumpOptions
  ): CurveData;

  /**
   * Deserializes curve data into a curve instance
   * @param curve - The curve instance to populate
   * @param data - The serialized curve data
   * @param context - Additional context for deserialization
   */
  load(curve: Curve, data: CurveData, context: unknown): void;
}

/**
 * Base class for all curve types
 * Provides serialization, registration, and factory methods
 */
export declare class Curve {
  /**
   * The class name identifier for this curve type
   * Set automatically during class registration
   */
  Class?: string;

  /**
   * Registers a curve class with a given name
   * @param className - The unique identifier for this curve class
   * @param curveClass - The constructor function for the curve class
   */
  static registerClass(
    className: string,
    curveClass: new () => Curve
  ): void;

  /**
   * Loads curve data into this instance
   * @param data - The serialized curve data
   * @param context - Additional context for loading
   */
  load(data: CurveData, context: unknown): void;

  /**
   * Serializes this curve instance to a data object
   * @param target - The target object to serialize to
   * @param includeMetadata - Whether to include metadata (default: true)
   * @param options - Additional serialization options
   * @returns Serialized curve data
   */
  dump(
    target: unknown,
    includeMetadata?: boolean,
    options?: CurveDumpOptions
  ): CurveData;

  /**
   * Gets the I/O handler for this curve
   * @returns The singleton Curve_IO instance
   */
  getIO(): Curve_IO;

  /**
   * Factory method to build a curve instance from serialized data
   * @param data - The serialized curve data containing Class identifier
   * @param context - Additional context for construction
   * @returns A new curve instance of the appropriate type, or undefined if data is invalid or class is not registered
   */
  static buildCurveFromDump(
    data: CurveData | undefined,
    context: unknown
  ): Curve | undefined;
}