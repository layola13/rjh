import { Container } from "./container";
import { Control } from "./control";
import { serialize } from "core/Misc/decorators";
import { RegisterClass } from "core/Misc/typeStore";

/**
 * Represents an ellipse control that can be displayed in a 2D GUI.
 * Inherits from Container and provides elliptical rendering with optional border thickness.
 */
export class Ellipse extends Container {
    /**
     * The thickness of the ellipse border in pixels.
     * @internal
     */
    private _thickness: number = 1;

    /**
     * Gets the thickness of the ellipse border.
     * @returns The border thickness in pixels
     */
    @serialize()
    public get thickness(): number {
        return this._thickness;
    }

    /**
     * Sets the thickness of the ellipse border.
     * Marks the control as dirty when the value changes.
     * @param value - The new thickness value in pixels
     */
    public set thickness(value: number) {
        if (this._thickness !== value) {
            this._thickness = value;
            this._markAsDirty();
        }
    }

    /**
     * Creates a new Ellipse control.
     * @param name - The name identifier for this ellipse control
     */
    constructor(name?: string) {
        super(name);
        this.name = name;
    }

    /**
     * Returns the type name of this control.
     * @returns The string "Ellipse"
     * @internal
     */
    protected _getTypeName(): string {
        return "Ellipse";
    }

    /**
     * Draws the ellipse on the canvas context.
     * Handles shadow effects, background fill, and border stroke.
     * @param context - The 2D rendering context to draw on
     * @internal
     */
    protected _localDraw(context: CanvasRenderingContext2D): void {
        context.save();

        // Apply shadow effects if configured
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }

        // Calculate ellipse center and radii
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;
        const radiusX = this._currentMeasure.width / 2 - this._thickness / 2;
        const radiusY = this._currentMeasure.height / 2 - this._thickness / 2;

        // Draw the ellipse path
        Control.drawEllipse(centerX, centerY, radiusX, radiusY, context);

        // Fill background if gradient or solid color is set
        if (this._backgroundGradient || this._background) {
            context.fillStyle = this._getBackgroundColor(context);
            context.fill();
        }

        // Reset shadow after fill
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }

        // Draw border if thickness is set
        if (this._thickness) {
            if (this.color) {
                context.strokeStyle = this.color;
            }
            context.lineWidth = this._thickness;
            context.stroke();
        }

        context.restore();
    }

    /**
     * Performs additional processing after measuring.
     * Adjusts the children measure to account for border thickness.
     * @param parentMeasure - The parent container's measure
     * @param context - The 2D rendering context
     * @internal
     */
    protected _additionalProcessing(parentMeasure: any, context: CanvasRenderingContext2D): void {
        super._additionalProcessing(parentMeasure, context);

        // Inset children bounds by thickness on all sides
        this._measureForChildren.width -= 2 * this._thickness;
        this._measureForChildren.height -= 2 * this._thickness;
        this._measureForChildren.left += this._thickness;
        this._measureForChildren.top += this._thickness;
    }

    /**
     * Sets up clipping region for child controls.
     * Children are clipped to the ellipse shape.
     * @param context - The 2D rendering context
     * @internal
     */
    protected _clipForChildren(context: CanvasRenderingContext2D): void {
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;
        const radiusX = this._currentMeasure.width / 2;
        const radiusY = this._currentMeasure.height / 2;

        Control.drawEllipse(centerX, centerY, radiusX, radiusY, context);
        context.clip();
    }

    /**
     * Renders the highlight effect for this control.
     * @param context - The 2D rendering context
     * @internal
     */
    protected _renderHighlightSpecific(context: CanvasRenderingContext2D): void {
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;
        const radiusX = this._currentMeasure.width / 2 - this._highlightLineWidth / 2;
        const radiusY = this._currentMeasure.height / 2 - this._highlightLineWidth / 2;

        Control.drawEllipse(centerX, centerY, radiusX, radiusY, context);
        context.stroke();
    }
}

// Register the class for serialization/deserialization
RegisterClass("BABYLON.GUI.Ellipse", Ellipse);