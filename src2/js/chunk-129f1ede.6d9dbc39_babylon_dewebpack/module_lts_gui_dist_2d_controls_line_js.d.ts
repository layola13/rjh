import { Observable, Observer } from "core/Misc/observable";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
import { Vector3, Matrix } from "core/Maths/math.vector";
import { Scene } from "core/scene";

/**
 * Class used to render 2D lines in GUI
 * @remarks
 * This control draws a line between two points (x1,y1) and (x2,y2).
 * The second point can optionally be connected to another control's center.
 */
export declare class Line extends Control {
    /**
     * The name of the control
     */
    name?: string;

    /**
     * Gets or sets the dash pattern used for the line
     * @remarks
     * An array of numbers which specify distances to alternately draw a line and a gap.
     * If the number of elements in the array is odd, the elements are copied and concatenated.
     * For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25].
     */
    dash: number[];

    /**
     * Gets or sets the control that the line's second point (x2, y2) is connected to
     * @remarks
     * When set, the line's endpoint will automatically follow the connected control's center position
     */
    connectedControl: Control | null;

    /**
     * Gets or sets the x coordinate of the line's start point
     * @remarks
     * Can be a pixel value (e.g., "100px") or a percentage (e.g., "50%")
     */
    x1: string | number;

    /**
     * Gets or sets the y coordinate of the line's start point
     * @remarks
     * Can be a pixel value (e.g., "100px") or a percentage (e.g., "50%")
     */
    y1: string | number;

    /**
     * Gets or sets the x coordinate of the line's end point
     * @remarks
     * Can be a pixel value (e.g., "100px") or a percentage (e.g., "50%")
     * If connectedControl is set, this acts as an offset from the connected control's center
     */
    x2: string | number;

    /**
     * Gets or sets the y coordinate of the line's end point
     * @remarks
     * Can be a pixel value (e.g., "100px") or a percentage (e.g., "50%")
     * If connectedControl is set, this acts as an offset from the connected control's center
     */
    y2: string | number;

    /**
     * Gets or sets the line width in pixels
     * @defaultValue 1
     */
    lineWidth: number;

    /**
     * Sets the horizontal alignment (disabled for Line control)
     * @remarks
     * Lines do not support horizontal alignment as they use absolute positioning
     */
    horizontalAlignment: number;

    /**
     * Sets the vertical alignment (disabled for Line control)
     * @remarks
     * Lines do not support vertical alignment as they use absolute positioning
     */
    verticalAlignment: number;

    /**
     * Creates a new Line control
     * @param name - The name of the control
     */
    constructor(name?: string);

    /**
     * Moves the line's start point (or end point) to a 3D position projected to 2D screen space
     * @param position - The 3D world position to project
     * @param scene - The scene containing the camera for projection
     * @param isEndPoint - If true, moves the end point (x2, y2); otherwise moves the start point (x1, y1)
     * @remarks
     * Automatically sets notRenderable to true if the position is outside the view frustum (z < 0 or z > 1)
     * The control must be at root level in the GUI hierarchy
     */
    moveToVector3(position: Vector3, scene: Scene, isEndPoint?: boolean): void;

    /**
     * @internal
     * Gets the effective x coordinate of the line's end point including connected control offset
     */
    protected get _effectiveX2(): number;

    /**
     * @internal
     * Gets the effective y coordinate of the line's end point including connected control offset
     */
    protected get _effectiveY2(): number;

    /**
     * @internal
     * Observer for connected control's dirty state
     */
    private _connectedControlDirtyObserver: Observer<Control> | null;

    /**
     * @internal
     * Internal storage for line width
     */
    private _lineWidth: number;

    /**
     * @internal
     * Internal storage for x1 coordinate
     */
    private _x1: ValueAndUnit;

    /**
     * @internal
     * Internal storage for y1 coordinate
     */
    private _y1: ValueAndUnit;

    /**
     * @internal
     * Internal storage for x2 coordinate
     */
    private _x2: ValueAndUnit;

    /**
     * @internal
     * Internal storage for y2 coordinate
     */
    private _y2: ValueAndUnit;

    /**
     * @internal
     * Internal storage for dash pattern
     */
    private _dash: number[];

    /**
     * @internal
     * Internal storage for connected control reference
     */
    private _connectedControl: Control | null;

    /**
     * @internal
     * Offset for linked position in x direction
     */
    private _linkOffsetX: ValueAndUnit;

    /**
     * @internal
     * Offset for linked position in y direction
     */
    private _linkOffsetY: ValueAndUnit;

    /**
     * @internal
     * Gets the type name of the control
     */
    protected _getTypeName(): string;

    /**
     * @internal
     * Draws the line on the canvas
     * @param context - The 2D rendering context
     */
    _draw(context: CanvasRenderingContext2D): void;

    /**
     * @internal
     * Measures the dimensions of the line
     */
    protected _measure(): void;

    /**
     * @internal
     * Computes the alignment of the line within its parent
     * @param parentMeasure - The parent container's measurements
     */
    protected _computeAlignment(parentMeasure: any): void;

    /**
     * @internal
     * Moves the line point to a projected 2D position
     * @param projectedPosition - The projected 2D position with z-depth
     * @param isEndPoint - If true, moves the end point; otherwise moves the start point
     */
    private _moveToProjectedPosition(projectedPosition: Vector3, isEndPoint?: boolean): void;
}