import { Container } from './container';
import { Measure } from '../measure';

/**
 * Class used to create rectangle container
 * A rectangle is a GUI container with optional rounded corners, borders, and background
 */
export declare class Rectangle extends Container {
    /**
     * The name of the rectangle control
     */
    name: string;

    /**
     * Gets or sets the border thickness in pixels
     * @defaultValue 1
     */
    thickness: number;

    /**
     * Gets or sets the corner radius in pixels for rounded corners
     * Negative values are clamped to 0
     * @defaultValue 0
     */
    cornerRadius: number;

    /**
     * Creates a new Rectangle
     * @param name - The name of the rectangle control
     */
    constructor(name?: string);

    /**
     * Gets the type name of the control
     * @returns The string "Rectangle"
     * @internal
     */
    _getTypeName(): string;

    /**
     * Computes additional horizontal offset required for rendering
     * Returns 1 if corner radius is set, otherwise 0
     * @returns Additional X offset
     * @internal
     */
    _computeAdditionnalOffsetX(): number;

    /**
     * Computes additional vertical offset required for rendering
     * Returns 1 if corner radius is set, otherwise 0
     * @returns Additional Y offset
     * @internal
     */
    _computeAdditionnalOffsetY(): number;

    /**
     * Gets the fill style for the rectangle background
     * @param context - The canvas rendering context
     * @returns The background color or gradient
     * @internal
     */
    _getRectangleFill(context: CanvasRenderingContext2D): string | CanvasGradient;

    /**
     * Renders the rectangle to the canvas
     * Handles background fill, borders, shadows, and rounded corners
     * @param context - The canvas rendering context
     * @internal
     */
    _localDraw(context: CanvasRenderingContext2D): void;

    /**
     * Performs additional processing after measure calculation
     * Adjusts child measure bounds to account for border thickness
     * @param parentMeasure - The parent control's measure
     * @param context - The canvas rendering context
     * @internal
     */
    _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

    /**
     * Draws a rounded rectangle path on the canvas
     * @param context - The canvas rendering context
     * @param offset - Optional offset from the edges (typically half the border thickness)
     * @internal
     */
    _drawRoundedRect(context: CanvasRenderingContext2D, offset?: number): void;

    /**
     * Sets up clipping region for child controls
     * Clips to rounded rectangle bounds if corner radius is set
     * @param context - The canvas rendering context
     * @internal
     */
    _clipForChildren(context: CanvasRenderingContext2D): void;
}