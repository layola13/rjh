/**
 * Curve module providing curve serialization and deserialization functionality.
 * Supports custom curve class registration and I/O operations.
 */

/**
 * Map storing registered curve classes by their name.
 */
declare const curveClassRegistry: Map<string, new () => Curve>;

/**
 * Singleton I/O handler for curve serialization and deserialization.
 */
export declare class Curve_IO {
    private static _instance: Curve_IO;

    /**
     * Gets the singleton instance of Curve_IO.
     * @returns The singleton Curve_IO instance
     */
    static instance(): Curve_IO;

    /**
     * Serializes a curve instance to a plain object.
     * @param curve - The curve instance to serialize
     * @param target - Additional serialization target context
     * @param includeMetadata - Whether to include metadata in the dump (default: true)
     * @param options - Additional serialization options
     * @returns Serialized curve data containing at minimum the Class property
     */
    dump(
        curve: Curve,
        target: unknown,
        includeMetadata?: boolean,
        options?: Record<string, unknown>
    ): CurveDumpData;

    /**
     * Deserializes curve data into a curve instance.
     * @param curve - The curve instance to populate
     * @param data - Serialized curve data
     * @param source - Source context for deserialization
     * @param context - Additional deserialization context
     */
    load(
        curve: Curve,
        data: CurveDumpData,
        source: unknown,
        context: unknown
    ): void;
}

/**
 * Serialized curve data structure.
 */
export interface CurveDumpData {
    /** The class name of the curve */
    Class: string;
    [key: string]: unknown;
}

/**
 * Base class for all curve types.
 * Provides registration, serialization, and deserialization capabilities.
 */
export declare class Curve {
    /**
     * The class name identifier for this curve instance.
     * Set automatically during class registration.
     */
    Class?: string;

    /**
     * Registers a curve class with the global registry.
     * @param className - The unique name identifier for the curve class
     * @param curveClass - The constructor function for the curve class
     */
    static registerClass(
        className: string,
        curveClass: new () => Curve
    ): void;

    /**
     * Loads curve data into this instance.
     * @param data - Serialized curve data
     * @param source - Source context for loading
     */
    load(data: CurveDumpData, source: unknown): void;

    /**
     * Serializes this curve instance to a plain object.
     * @param target - Serialization target context
     * @param includeMetadata - Whether to include metadata (default: true)
     * @param options - Additional serialization options
     * @returns Serialized curve data
     */
    dump(
        target: unknown,
        includeMetadata?: boolean,
        options?: Record<string, unknown>
    ): CurveDumpData;

    /**
     * Gets the I/O handler for this curve.
     * @returns The singleton Curve_IO instance
     */
    getIO(): Curve_IO;

    /**
     * Factory method to construct a curve instance from serialized data.
     * @param data - Serialized curve data containing Class property
     * @param source - Source context for construction
     * @param context - Additional construction context
     * @returns A new curve instance of the appropriate type, or undefined if construction fails
     */
    static buildCurveFromDump(
        data: CurveDumpData | undefined,
        source: unknown,
        context: unknown
    ): Curve | undefined;
}

/**
 * Global constants for class name mapping.
 * Maps short class names to long class names.
 */
declare const HSConstants: {
    ClassSNameToLName: Map<string, string>;
};

/**
 * Assertion utility function.
 * @param condition - The condition to assert
 * @param message - Error message if assertion fails
 * @param errorType - Type/category of the error
 */
declare function assert(
    condition: boolean,
    message: string,
    errorType: string
): void;