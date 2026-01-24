import { Container } from "./container";
import { Control } from "./control";
import { serialize } from "core/Misc/decorators";
import { RegisterClass } from "core/Misc/typeStore";

/**
 * Represents an elliptical control with customizable border thickness and styling.
 * Extends Container to allow child controls within the ellipse bounds.
 */
export class Ellipse extends Container {
    /**
     * The name identifier for this ellipse control.
     */
    public name: string;

    /**
     * Internal storage for the border thickness value.
     * @internal
     */
    private _thickness: number = 1;

    /**
     * Gets or sets the thickness of the ellipse border in pixels.
     * When set, triggers a redraw of the control.
     */
    @serialize()
    public get thickness(): number {
        return this._thickness;
    }

    public set thickness(value: number) {
        if (this._thickness !== value) {
            this._thickness = value;
            this._markAsDirty();
        }
    }

    /**
     * Creates a new Ellipse control.
     * @param name - The unique identifier for this control
     */
    constructor(name: string) {
        super(name);
        this.name = name;
        this._thickness = 1;
    }

    /**
     * Returns the type name of this control for serialization purposes.
     * @returns The string "Ellipse"
     * @internal
     */
    protected _getTypeName(): string {
        return "Ellipse";
    }

    /**
     * Renders the ellipse to the canvas context.
     * Handles shadow effects, background fill, and border stroke.
     * @param context - The 2D rendering context
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

        // Draw the ellipse path
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;
        const radiusX = this._currentMeasure.width / 2 - this._thickness / 2;
        const radiusY = this._currentMeasure.height / 2 - this._thickness / 2;
        
        Control.drawEllipse(centerX, centerY, radiusX, radiusY, context);

        // Fill background if gradient or solid color is set
        if (this._backgroundGradient || this._background) {
            context.fillStyle = this._getBackgroundColor(context);
            context.fill();
        }

        // Reset shadow for border rendering
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
     * Adjusts the measurement area for child controls to account for border thickness.
     * Ensures children are rendered inside the ellipse border.
     * @param context - The 2D rendering context
     * @param measure - The current measurement data
     * @internal
     */
    protected _additionalProcessing(context: CanvasRenderingContext2D, measure: any): void {
        super._additionalProcessing(context, measure);
        
        this._measureForChildren.width -= 2 * this._thickness;
        this._measureForChildren.height -= 2 * this._thickness;
        this._measureForChildren.left += this._thickness;
        this._measureForChildren.top += this._thickness;
    }

    /**
     * Applies an elliptical clipping path for rendering child controls.
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
     * Renders the highlight outline when the control is selected or focused.
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

RegisterClass("BABYLON.GUI.Ellipse", Ellipse);