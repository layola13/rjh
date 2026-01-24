import { BaseSlider } from "./baseSlider";
import { Measure } from "../measure";
import { Observable } from "core/Misc/observable";
import { Image } from "../image";

/**
 * Image-based scroll bar control for 2D GUI
 * Extends BaseSlider to provide visual scrolling with custom background and thumb images
 */
export class ImageScrollBar extends BaseSlider {
    /**
     * The name identifier for this control
     */
    name: string;

    /**
     * Number of 90-degree rotations to apply when in vertical mode
     * @default 1
     */
    num90RotationInVerticalMode: number;

    /**
     * Whether to invert the scroll direction
     * When true, scrolling moves in opposite direction
     */
    get invertScrollDirection(): boolean;
    set invertScrollDirection(value: boolean);

    /**
     * The background image for the scroll bar track
     * Automatically rotated based on orientation and num90RotationInVerticalMode
     */
    get backgroundImage(): Image;
    set backgroundImage(value: Image);

    /**
     * The thumb (draggable handle) image
     * Automatically rotated based on orientation and num90RotationInVerticalMode
     */
    get thumbImage(): Image;
    set thumbImage(value: Image);

    /**
     * The length of the thumb along the scroll direction as a ratio (0-1)
     * @default 0.5
     */
    get thumbLength(): number;
    set thumbLength(value: number);

    /**
     * The height of the thumb perpendicular to scroll direction as a ratio (0-1)
     * @default 1
     */
    get thumbHeight(): number;
    set thumbHeight(value: number);

    /**
     * The height of the background bar image as a ratio (0-1)
     * @default 1
     */
    get barImageHeight(): number;
    set barImageHeight(value: number);

    /**
     * Creates a new ImageScrollBar
     * @param name - The name identifier for this scroll bar
     */
    constructor(name: string);

    /**
     * Gets the type name of this control
     * @returns "ImageScrollBar"
     */
    protected _getTypeName(): string;

    /**
     * Calculates the thickness of the thumb element
     * @returns The computed thumb thickness in pixels
     */
    protected _getThumbThickness(): number;

    /**
     * Renders the scroll bar to the canvas
     * @param context - The 2D rendering context
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Updates the scroll value based on pointer position
     * @param x - The pointer X coordinate
     * @param y - The pointer Y coordinate
     */
    protected _updateValueFromPointer(x: number, y: number): void;

    /**
     * Handles pointer down events on the scroll bar
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The unique pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pi - Additional pointer info
     * @returns True if the event was handled
     */
    protected _onPointerDown(
        target: unknown,
        coordinates: unknown,
        pointerId: number,
        buttonIndex: number,
        pi: unknown
    ): boolean;

    // Private fields (internal implementation details)
    private _thumbLength: number;
    private _thumbHeight: number;
    private _barImageHeight: number;
    private _tempMeasure: Measure;
    private _invertScrollDirection: boolean;
    private _backgroundBaseImage: Image;
    private _backgroundImage: Image;
    private _thumbBaseImage: Image;
    private _thumbImage: Image;
    private _first: boolean;
    private _originX: number;
    private _originY: number;
    private _effectiveThumbThickness: number;
    private _effectiveBarOffset: number;
    private _backgroundBoxThickness: number;
    private _thumbWidth: { isPixel: boolean; getValue(host: unknown): number };
    private _transformedPosition: { x: number; y: number };
    private _invertTransformMatrix: {
        transformCoordinates(
            x: number,
            y: number,
            result: { x: number; y: number }
        ): void;
    };
}