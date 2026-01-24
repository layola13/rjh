import { Rect } from './Rect';

/**
 * Represents a bounding rectangle for BREP (Boundary Representation) geometry.
 * Extends the base Rect class with additional methods for managing geometric bounds.
 */
export declare class BrepBound extends Rect {
    /**
     * Creates a new BrepBound instance.
     * @param left - The left coordinate of the bound (default: Infinity)
     * @param top - The top coordinate of the bound (default: Infinity)
     * @param width - The width of the bound (default: 0)
     * @param height - The height of the bound (default: 0)
     */
    constructor(left?: number, top?: number, width?: number, height?: number);

    /**
     * Gets the center point of the bounding rectangle.
     * @returns An object containing the x and y coordinates of the center point
     */
    center(): { x: number; y: number };

    /**
     * Gets the minimum point (top-left corner) of the bounding rectangle.
     * @returns The top-left corner point
     */
    getMin(): { x: number; y: number };

    /**
     * Gets the maximum point (bottom-right corner) of the bounding rectangle.
     * @returns The bottom-right corner point
     */
    getMax(): { x: number; y: number };

    /**
     * Checks if the bounding rectangle is valid.
     * @param strict - If true, requires width and height to be greater than 0; 
     *                 if false, allows width and height to be >= 0 (default: false)
     * @returns True if the bound has finite coordinates and valid dimensions
     */
    isValid(strict?: boolean): boolean;

    /**
     * Expands the bounding rectangle by specified margins.
     * @param marginX - Horizontal margin to expand on each side
     * @param marginY - Vertical margin to expand on top and bottom
     * @returns A new BrepBound instance with expanded dimensions
     */
    expandMargin(marginX: number, marginY: number): BrepBound;

    /**
     * Resets the bounding rectangle to its initial invalid state.
     * Sets top and left to Infinity, and width and height to 0.
     */
    reset(): void;

    /**
     * Copies the properties from another bounding rectangle.
     * @param source - The source BrepBound to copy from
     */
    copy(source: BrepBound): void;

    /**
     * Sets the bounding rectangle properties directly.
     * @param left - The left coordinate
     * @param top - The top coordinate
     * @param width - The width
     * @param height - The height
     */
    set(left: number, top: number, width: number, height: number): void;

    /**
     * Expands the bounding rectangle to include the specified point.
     * If the bound is uninitialized, sets the bound to start at the point.
     * @param point - The point to include in the bounding rectangle
     */
    appendPoint(point: { x: number; y: number } | null | undefined): void;

    /**
     * Expands the bounding rectangle to include another bounding rectangle.
     * @param bound - The bounding rectangle to include
     */
    appendBound(bound: BrepBound): void;

    /**
     * Static method to validate if an object is a valid BrepBound instance.
     * @param bound - The object to validate
     * @param strict - If true, requires width and height to be greater than 0 (default: false)
     * @returns True if the object is a valid BrepBound instance
     */
    static isValidBound(bound: unknown, strict?: boolean): bound is BrepBound;

    /**
     * Creates a BrepBound from an array of points.
     * @param points - Array of points to create the bounding rectangle from
     * @returns A new BrepBound instance that encompasses all the points
     */
    static createFromPoints(points: Array<{ x: number; y: number }>): BrepBound;
}