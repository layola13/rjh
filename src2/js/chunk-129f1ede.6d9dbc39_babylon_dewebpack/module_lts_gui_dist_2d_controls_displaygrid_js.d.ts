import { Control } from './control';
import { serialize } from 'core/Misc/observable';

/**
 * DisplayGrid control for rendering a grid pattern with customizable cells and lines.
 * Extends the base Control class to provide a visual grid overlay with major and minor lines.
 */
export class DisplayGrid extends Control {
    /**
     * The name identifier for this control instance.
     */
    name: string;

    /**
     * Internal storage for cell width in pixels.
     * @private
     */
    private _cellWidth: number;

    /**
     * Internal storage for cell height in pixels.
     * @private
     */
    private _cellHeight: number;

    /**
     * Internal storage for minor line thickness in pixels.
     * @private
     */
    private _minorLineTickness: number;

    /**
     * Internal storage for minor line color.
     * @private
     */
    private _minorLineColor: string;

    /**
     * Internal storage for major line thickness in pixels.
     * @private
     */
    private _majorLineTickness: number;

    /**
     * Internal storage for major line color.
     * @private
     */
    private _majorLineColor: string;

    /**
     * Internal storage for major line frequency (every N cells).
     * @private
     */
    private _majorLineFrequency: number;

    /**
     * Internal storage for background color.
     * @private
     */
    private _background: string;

    /**
     * Internal storage for major lines visibility flag.
     * @private
     */
    private _displayMajorLines: boolean;

    /**
     * Internal storage for minor lines visibility flag.
     * @private
     */
    private _displayMinorLines: boolean;

    /**
     * Gets whether minor grid lines should be displayed.
     */
    @serialize()
    get displayMinorLines(): boolean {
        return this._displayMinorLines;
    }

    /**
     * Sets whether minor grid lines should be displayed.
     * Marks the control as dirty when changed.
     */
    set displayMinorLines(value: boolean) {
        if (this._displayMinorLines !== value) {
            this._displayMinorLines = value;
            this._markAsDirty();
        }
    }

    /**
     * Gets whether major grid lines should be displayed.
     */
    @serialize()
    get displayMajorLines(): boolean {
        return this._displayMajorLines;
    }

    /**
     * Sets whether major grid lines should be displayed.
     * Marks the control as dirty when changed.
     */
    set displayMajorLines(value: boolean) {
        if (this._displayMajorLines !== value) {
            this._displayMajorLines = value;
            this._markAsDirty();
        }
    }

    /**
     * Gets the background color of the grid.
     */
    @serialize()
    get background(): string {
        return this._background;
    }

    /**
     * Sets the background color of the grid.
     * Marks the control as dirty when changed.
     */
    set background(value: string) {
        if (this._background !== value) {
            this._background = value;
            this._markAsDirty();
        }
    }

    /**
     * Gets the width of each grid cell in pixels.
     */
    @serialize()
    get cellWidth(): number {
        return this._cellWidth;
    }

    /**
     * Sets the width of each grid cell in pixels.
     * Marks the control as dirty when changed.
     */
    set cellWidth(value: number) {
        this._cellWidth = value;
        this._markAsDirty();
    }

    /**
     * Gets the height of each grid cell in pixels.
     */
    @serialize()
    get cellHeight(): number {
        return this._cellHeight;
    }

    /**
     * Sets the height of each grid cell in pixels.
     * Marks the control as dirty when changed.
     */
    set cellHeight(value: number) {
        this._cellHeight = value;
        this._markAsDirty();
    }

    /**
     * Gets the thickness of minor grid lines in pixels.
     */
    @serialize()
    get minorLineTickness(): number {
        return this._minorLineTickness;
    }

    /**
     * Sets the thickness of minor grid lines in pixels.
     * Marks the control as dirty when changed.
     */
    set minorLineTickness(value: number) {
        this._minorLineTickness = value;
        this._markAsDirty();
    }

    /**
     * Gets the color of minor grid lines.
     */
    @serialize()
    get minorLineColor(): string {
        return this._minorLineColor;
    }

    /**
     * Sets the color of minor grid lines.
     * Marks the control as dirty when changed.
     */
    set minorLineColor(value: string) {
        this._minorLineColor = value;
        this._markAsDirty();
    }

    /**
     * Gets the thickness of major grid lines in pixels.
     */
    @serialize()
    get majorLineTickness(): number {
        return this._majorLineTickness;
    }

    /**
     * Sets the thickness of major grid lines in pixels.
     * Marks the control as dirty when changed.
     */
    set majorLineTickness(value: number) {
        this._majorLineTickness = value;
        this._markAsDirty();
    }

    /**
     * Gets the color of major grid lines.
     */
    @serialize()
    get majorLineColor(): string {
        return this._majorLineColor;
    }

    /**
     * Sets the color of major grid lines.
     * Marks the control as dirty when changed.
     */
    set majorLineColor(value: string) {
        this._majorLineColor = value;
        this._markAsDirty();
    }

    /**
     * Gets the frequency of major lines (every N cells).
     */
    @serialize()
    get majorLineFrequency(): number {
        return this._majorLineFrequency;
    }

    /**
     * Sets the frequency of major lines (every N cells).
     * Marks the control as dirty when changed.
     */
    set majorLineFrequency(value: number) {
        this._majorLineFrequency = value;
        this._markAsDirty();
    }

    /**
     * Creates a new DisplayGrid control.
     * @param name - The unique name identifier for this control
     */
    constructor(name: string) {
        super(name);
        this.name = name;
        this._cellWidth = 20;
        this._cellHeight = 20;
        this._minorLineTickness = 1;
        this._minorLineColor = 'DarkGray';
        this._majorLineTickness = 2;
        this._majorLineColor = 'White';
        this._majorLineFrequency = 5;
        this._background = 'Black';
        this._displayMajorLines = true;
        this._displayMinorLines = true;
    }

    /**
     * Renders the grid to the canvas context.
     * Draws background, minor lines, and major lines based on configuration.
     * @param context - The 2D rendering context to draw on
     * @protected
     */
    protected _draw(context: CanvasRenderingContext2D): void {
        context.save();
        this._applyStates(context);

        if (!this._isEnabled) {
            context.restore();
            return;
        }

        // Draw background if specified
        if (this._background) {
            context.fillStyle = this._background;
            context.fillRect(
                this._currentMeasure.left,
                this._currentMeasure.top,
                this._currentMeasure.width,
                this._currentMeasure.height
            );
        }

        const horizontalCellCount = this._currentMeasure.width / this._cellWidth;
        const verticalCellCount = this._currentMeasure.height / this._cellHeight;
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;

        // Draw minor lines
        if (this._displayMinorLines) {
            context.strokeStyle = this._minorLineColor;
            context.lineWidth = this._minorLineTickness;

            // Vertical minor lines
            for (let i = -horizontalCellCount / 2 + 1; i < horizontalCellCount / 2; i++) {
                const x = centerX + i * this.cellWidth;
                context.beginPath();
                context.moveTo(x, this._currentMeasure.top);
                context.lineTo(x, this._currentMeasure.top + this._currentMeasure.height);
                context.stroke();
            }

            // Horizontal minor lines
            for (let j = -verticalCellCount / 2 + 1; j < verticalCellCount / 2; j++) {
                const y = centerY + j * this.cellHeight;
                context.beginPath();
                context.moveTo(this._currentMeasure.left, y);
                context.lineTo(this._currentMeasure.left + this._currentMeasure.width, y);
                context.stroke();
            }
        }

        // Draw major lines
        if (this._displayMajorLines) {
            context.strokeStyle = this._majorLineColor;
            context.lineWidth = this._majorLineTickness;

            // Vertical major lines
            for (
                let i = -horizontalCellCount / 2 + this._majorLineFrequency;
                i < horizontalCellCount / 2;
                i += this._majorLineFrequency
            ) {
                const x = centerX + i * this.cellWidth;
                context.beginPath();
                context.moveTo(x, this._currentMeasure.top);
                context.lineTo(x, this._currentMeasure.top + this._currentMeasure.height);
                context.stroke();
            }

            // Horizontal major lines
            for (
                let j = -verticalCellCount / 2 + this._majorLineFrequency;
                j < verticalCellCount / 2;
                j += this._majorLineFrequency
            ) {
                const y = centerY + j * this.cellHeight;
                context.moveTo(this._currentMeasure.left, y);
                context.lineTo(this._currentMeasure.left + this._currentMeasure.width, y);
                context.closePath();
                context.stroke();
            }
        }

        context.restore();
    }

    /**
     * Returns the type name of this control for serialization purposes.
     * @returns The string "DisplayGrid"
     * @protected
     */
    protected _getTypeName(): string {
        return 'DisplayGrid';
    }
}

// Register the class with Babylon.js serialization system
RegisterClass('BABYLON.GUI.DisplayGrid', DisplayGrid);