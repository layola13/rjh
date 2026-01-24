import { Observable } from "core/Misc/observable";
import { BaseSlider } from "../../../lts/gui/dist/2D/controls/sliders/baseSlider";
import { Measure } from "../../../lts/gui/dist/2D/measure";
import { Image } from "../../../lts/gui/dist/2D/controls/image";
import { ICanvasRenderingContext } from "../../../lts/gui/dist/2D/ICanvasRenderingContext";
import { Vector2 } from "core/Maths/math.vector";

/**
 * Class representing an image-based scrollbar control for 2D GUI
 * Extends BaseSlider to provide scrolling functionality with custom images for background and thumb
 */
export declare class ImageScrollBar extends BaseSlider {
    /**
     * The name identifier for this scrollbar control
     */
    name: string;

    /**
     * Number of 90-degree rotations to apply when in vertical mode
     * @default 1
     */
    num90RotationInVerticalMode: number;

    /**
     * Gets or sets whether the scroll direction should be inverted
     * When true, scrolling direction is reversed
     */
    invertScrollDirection: boolean;

    /**
     * Gets or sets the background image for the scrollbar track
     * Automatically handles rotation when in vertical mode
     */
    backgroundImage: Image;

    /**
     * Gets or sets the thumb (draggable handle) image
     * Automatically handles rotation when in vertical mode
     */
    thumbImage: Image;

    /**
     * Gets or sets the length of the thumb as a ratio (0-1) of the scrollbar
     * @default 0.5
     */
    thumbLength: number;

    /**
     * Gets or sets the height/thickness of the thumb as a ratio (0-1)
     * @default 1
     */
    thumbHeight: number;

    /**
     * Gets or sets the height of the background bar image as a ratio (0-1)
     * @default 1
     */
    barImageHeight: number;

    /**
     * Internal storage for the base background image (before rotation)
     * @internal
     */
    protected _backgroundBaseImage: Image;

    /**
     * Internal storage for the processed background image (after rotation if needed)
     * @internal
     */
    protected _backgroundImage: Image;

    /**
     * Internal storage for the base thumb image (before rotation)
     * @internal
     */
    protected _thumbBaseImage: Image;

    /**
     * Internal storage for the processed thumb image (after rotation if needed)
     * @internal
     */
    protected _thumbImage: Image;

    /**
     * Internal storage for thumb length ratio
     * @internal
     */
    protected _thumbLength: number;

    /**
     * Internal storage for thumb height ratio
     * @internal
     */
    protected _thumbHeight: number;

    /**
     * Internal storage for bar image height ratio
     * @internal
     */
    protected _barImageHeight: number;

    /**
     * Temporary measure object for layout calculations
     * @internal
     */
    protected _tempMeasure: Measure;

    /**
     * Flag to invert scroll direction
     * @internal
     */
    protected _invertScrollDirection: boolean;

    /**
     * Flag to track first pointer interaction
     * @internal
     */
    protected _first: boolean;

    /**
     * Original X coordinate for pointer tracking
     * @internal
     */
    protected _originX: number;

    /**
     * Original Y coordinate for pointer tracking
     * @internal
     */
    protected _originY: number;

    /**
     * Creates a new ImageScrollBar instance
     * @param name - The name identifier for this control
     */
    constructor(name: string);

    /**
     * Gets the type name of this control
     * @returns The string "ImageScrollBar"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Calculates the thickness of the thumb based on width settings
     * @returns The computed thickness in pixels
     * @internal
     */
    protected _getThumbThickness(): number;

    /**
     * Renders the scrollbar to the canvas context
     * @param context - The canvas rendering context
     * @internal
     */
    protected _draw(context: ICanvasRenderingContext): void;

    /**
     * Updates the scrollbar value based on pointer position
     * @param pointerX - The X coordinate of the pointer
     * @param pointerY - The Y coordinate of the pointer
     * @internal
     */
    protected _updateValueFromPointer(pointerX: number, pointerY: number): void;

    /**
     * Handles pointer down events on the scrollbar
     * @param target - The control that was clicked
     * @param coordinates - The pointer coordinates
     * @param pointerId - The unique identifier for the pointer
     * @param buttonIndex - The button index that was pressed
     * @param ignorePressure - The pressure event object
     * @returns True if the event was handled
     * @internal
     */
    protected _onPointerDown(
        target: unknown,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        ignorePressure: unknown
    ): boolean;
}