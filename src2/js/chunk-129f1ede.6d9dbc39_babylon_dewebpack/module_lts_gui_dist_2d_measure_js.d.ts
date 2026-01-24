/**
 * Represents a 2D rectangular measurement area with position and dimensions.
 * Used for GUI element bounds, clipping regions, and coordinate transformations.
 */
export class Measure {
    /**
     * Left coordinate of the measure rectangle
     */
    left: number;

    /**
     * Top coordinate of the measure rectangle
     */
    top: number;

    /**
     * Width of the measure rectangle
     */
    width: number;

    /**
     * Height of the measure rectangle
     */
    height: number;

    /**
     * Creates a new Measure instance
     * @param left - Left coordinate
     * @param top - Top coordinate
     * @param width - Width of the rectangle
     * @param height - Height of the rectangle
     */
    constructor(left: number, top: number, width: number, height: number);

    /**
     * Copies all properties from another Measure instance
     * @param other - The source Measure to copy from
     */
    copyFrom(other: Measure): void;

    /**
     * Sets the measure properties from individual float values
     * @param left - Left coordinate
     * @param top - Top coordinate
     * @param width - Width value
     * @param height - Height value
     */
    copyFromFloats(left: number, top: number, width: number, height: number): void;

    /**
     * Combines two Measure instances into a bounding rectangle and stores result in target
     * @param source1 - First measure to combine
     * @param source2 - Second measure to combine
     * @param target - The measure to store the combined result
     */
    static CombineToRef(source1: Measure, source2: Measure, target: Measure): void;

    /**
     * Adds offsets to the measure, transforms it by a matrix, and stores the result
     * @param matrix - Transformation matrix to apply
     * @param offsetLeft - Horizontal offset to add
     * @param offsetTop - Vertical offset to add
     * @param offsetWidth - Width offset to add
     * @param offsetHeight - Height offset to add
     * @param target - The measure to store the transformed result
     */
    addAndTransformToRef(
        matrix: Matrix2D,
        offsetLeft: number,
        offsetTop: number,
        offsetWidth: number,
        offsetHeight: number,
        target: Measure
    ): void;

    /**
     * Transforms this measure by a matrix and stores the result in target
     * @param matrix - Transformation matrix to apply
     * @param target - The measure to store the transformed result
     */
    transformToRef(matrix: Matrix2D, target: Measure): void;

    /**
     * Checks if this measure is equal to another measure
     * @param other - The measure to compare with
     * @returns True if all properties are equal, false otherwise
     */
    isEqualsTo(other: Measure): boolean;

    /**
     * Creates an empty Measure instance with all values set to 0
     * @returns A new Measure with dimensions (0, 0, 0, 0)
     */
    static Empty(): Measure;
}

/**
 * Represents a 2D vector for coordinate transformations
 */
export interface Vector2 {
    x: number;
    y: number;
    copyFromFloats(x: number, y: number): void;
}

/**
 * Represents a 2D transformation matrix
 */
export interface Matrix2D {
    /**
     * Transforms 2D coordinates using this matrix
     * @param x - X coordinate to transform
     * @param y - Y coordinate to transform
     * @param result - Vector2 to store the transformed result
     */
    transformCoordinates(x: number, y: number, result: Vector2): void;
}