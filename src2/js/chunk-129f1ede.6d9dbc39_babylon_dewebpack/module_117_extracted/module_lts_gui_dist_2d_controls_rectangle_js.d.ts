import { Container } from "./container";
import { Measure } from "../measure";

/**
 * Represents a rectangle control with optional rounded corners and configurable border thickness.
 * Extends the Container class to provide a rectangular container with styling capabilities.
 */
export declare class Rectangle extends Container {
    /**
     * Creates a new Rectangle instance.
     * @param name - The name identifier for the rectangle control
     */
    constructor(name?: string);

    /**
     * The name identifier of the rectangle control.
     */
    name: string;

    /**
     * Internal storage for the border thickness value.
     * @internal
     */
    private _thickness: number;

    /**
     * Internal storage for the corner radius value.
     * @internal
     */
    private _cornerRadius: number;

    /**
     * Gets or sets the thickness of the rectangle's border in pixels.
     * When changed, marks the control as dirty to trigger a redraw.
     * @default 1
     */
    thickness: number;

    /**
     * Gets or sets the radius of the rectangle's corners in pixels.
     * Negative values are clamped to 0. When changed, marks the control as dirty.
     * A value of 0 results in sharp corners.
     * @default 0
     */
    cornerRadius: number;

    /**
     * Returns the type name of this control for serialization and debugging.
     * @returns The string "Rectangle"
     */
    protected _getTypeName(): string;

    /**
     * Computes additional horizontal offset needed for rendering.
     * Returns 1 if corner radius is set, 0 otherwise.
     * @returns Additional X offset in pixels
     */
    protected _computeAdditionnalOffsetX(): number;

    /**
     * Computes additional vertical offset needed for rendering.
     * Returns 1 if corner radius is set, 0 otherwise.
     * @returns Additional Y offset in pixels
     */
    protected _computeAdditionnalOffsetY(): number;

    /**
     * Gets the fill style for the rectangle background.
     * @param context - The 2D rendering context
     * @returns The background color or gradient as a canvas-compatible style
     */
    protected _getRectangleFill(context: CanvasRenderingContext2D): string | CanvasGradient;

    /**
     * Performs the actual drawing of the rectangle on the canvas.
     * Handles background fill, shadow effects, border stroke, and rounded corners.
     * @param context - The 2D rendering context to draw on
     */
    protected _localDraw(context: CanvasRenderingContext2D): void;

    /**
     * Performs additional processing after measurements are calculated.
     * Adjusts child container measurements to account for border thickness.
     * @param parentMeasure - The parent control's measure
     * @param context - The 2D rendering context
     */
    protected _additionalProcessing(parentMeasure: Measure, context: CanvasRenderingContext2D): void;

    /**
     * Draws a rounded rectangle path on the canvas context.
     * @param context - The 2D rendering context
     * @param offset - Optional offset to apply to the rectangle bounds (e.g., for border thickness)
     */
    protected _drawRoundedRect(context: CanvasRenderingContext2D, offset?: number): void;

    /**
     * Sets up clipping region for child controls.
     * If corner radius is set, clips to the rounded rectangle shape.
     * @param context - The 2D rendering context
     */
    protected _clipForChildren(context: CanvasRenderingContext2D): void;

    /**
     * The current measure (position and dimensions) of the control.
     * @internal
     */
    protected _currentMeasure: Measure;

    /**
     * The measure used for positioning child controls.
     * @internal
     */
    protected _measureForChildren: Measure;

    /**
     * Background color of the rectangle.
     * @internal
     */
    protected _background: string;

    /**
     * Background gradient of the rectangle.
     * @internal
     */
    protected _backgroundGradient: unknown;

    /**
     * Shadow blur radius in pixels.
     */
    shadowBlur: number;

    /**
     * Shadow horizontal offset in pixels.
     */
    shadowOffsetX: number;

    /**
     * Shadow vertical offset in pixels.
     */
    shadowOffsetY: number;

    /**
     * Shadow color.
     */
    shadowColor: string;

    /**
     * Border color of the rectangle.
     */
    color: string;

    /**
     * Border gradient of the rectangle.
     */
    gradient: unknown;

    /**
     * Marks the control as needing to be redrawn.
     * @internal
     */
    protected _markAsDirty(): void;

    /**
     * Gets the background color or gradient for rendering.
     * @param context - The 2D rendering context
     * @returns Canvas-compatible fill style
     * @internal
     */
    protected _getBackgroundColor(context: CanvasRenderingContext2D): string | CanvasGradient;
}