import { Observable, Observer } from "core/Misc/observable";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
import { Vector3, Matrix } from "core/Maths/math.vector";
import { Scene } from "core/scene";

/**
 * Class used to create a 2D line control in the GUI system.
 * This control draws a line between two points and can optionally connect to another control.
 */
export declare class Line extends Control {
    /**
     * The name identifier of this control
     */
    name: string;

    /**
     * Gets or sets the dash pattern for the line.
     * An array of numbers specifying the dash and gap lengths.
     * @example [5, 10] creates a pattern with 5px dashes and 10px gaps
     */
    dash: number[];

    /**
     * Gets or sets a control that this line is connected to.
     * When set, the line's second point (x2, y2) will follow the connected control's center.
     */
    connectedControl: Control | null;

    /**
     * Gets or sets the x coordinate of the first point of the line.
     * Can be specified as pixels (e.g., "100px") or percentage (e.g., "50%").
     */
    x1: string;

    /**
     * Gets or sets the y coordinate of the first point of the line.
     * Can be specified as pixels (e.g., "100px") or percentage (e.g., "50%").
     */
    y1: string;

    /**
     * Gets or sets the x coordinate of the second point of the line.
     * Can be specified as pixels (e.g., "100px") or percentage (e.g., "50%").
     * If connectedControl is set, this acts as an offset from the control's center.
     */
    x2: string;

    /**
     * Gets or sets the y coordinate of the second point of the line.
     * Can be specified as pixels (e.g., "100px") or percentage (e.g., "50%").
     * If connectedControl is set, this acts as an offset from the control's center.
     */
    y2: string;

    /**
     * Gets or sets the width/thickness of the line in pixels.
     * @defaultValue 1
     */
    lineWidth: number;

    /**
     * Horizontal alignment is not applicable for Line controls.
     * Setting this property has no effect.
     */
    set horizontalAlignment(value: number);

    /**
     * Vertical alignment is not applicable for Line controls.
     * Setting this property has no effect.
     */
    set verticalAlignment(value: number);

    /**
     * Creates a new Line control.
     * @param name - The name identifier for this line control
     */
    constructor(name: string);

    /**
     * Moves the line to connect to a 3D position in world space.
     * The line must be at root level of the GUI for this to work.
     * @param position - The 3D position in world space
     * @param scene - The scene containing the camera for projection
     * @param isSecondPoint - If true, moves the second point (x2, y2); otherwise moves the first point (x1, y1)
     */
    moveToVector3(position: Vector3, scene: Scene, isSecondPoint?: boolean): void;

    /**
     * Gets the effective x coordinate of the second point.
     * Takes into account the connected control's position if set.
     * @internal
     */
    protected get _effectiveX2(): number;

    /**
     * Gets the effective y coordinate of the second point.
     * Takes into account the connected control's position if set.
     * @internal
     */
    protected get _effectiveY2(): number;

    /**
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Draws the line on the canvas context.
     * @param context - The 2D rendering context
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Measures the dimensions of the line.
     * @internal
     */
    protected _measure(): void;

    /**
     * Computes the alignment of the line within its parent container.
     * @param parentMeasure - The parent container's measurements
     * @internal
     */
    protected _computeAlignment(parentMeasure: any): void;

    /**
     * Moves the line to a projected 2D position.
     * @param projectedPosition - The projected position vector
     * @param isSecondPoint - If true, moves the second point; otherwise moves the first point
     * @internal
     */
    protected _moveToProjectedPosition(projectedPosition: Vector3, isSecondPoint?: boolean): void;

    /**
     * Observer for connected control's dirty state
     * @internal
     */
    private _connectedControlDirtyObserver: Observer<Control> | null;

    /**
     * Internal storage for line width
     * @internal
     */
    private _lineWidth: number;

    /**
     * Internal storage for x1 coordinate
     * @internal
     */
    private _x1: ValueAndUnit;

    /**
     * Internal storage for y1 coordinate
     * @internal
     */
    private _y1: ValueAndUnit;

    /**
     * Internal storage for x2 coordinate
     * @internal
     */
    private _x2: ValueAndUnit;

    /**
     * Internal storage for y2 coordinate
     * @internal
     */
    private _y2: ValueAndUnit;

    /**
     * Internal storage for dash pattern
     * @internal
     */
    private _dash: number[];

    /**
     * Internal storage for connected control reference
     * @internal
     */
    private _connectedControl: Control | null;

    /**
     * Offset for x coordinate when linking to 3D positions
     * @internal
     */
    private _linkOffsetX: ValueAndUnit;

    /**
     * Offset for y coordinate when linking to 3D positions
     * @internal
     */
    private _linkOffsetY: ValueAndUnit;
}