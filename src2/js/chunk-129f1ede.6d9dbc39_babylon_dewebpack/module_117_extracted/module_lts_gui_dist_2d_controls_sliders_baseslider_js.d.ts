import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control";
import { ValueAndUnit } from "../../../lts/gui/dist/2D/valueAndUnit";
import { Vector2 } from "core/Maths/math.vector";
import { Measure } from "../../../lts/gui/dist/2D/measure";

/**
 * Base class for all slider controls (horizontal and vertical sliders)
 * Provides common functionality for value selection within a range
 */
export declare class BaseSlider extends Control {
    /**
     * Creates a new BaseSlider instance
     * @param name - The name identifier for this slider control
     */
    constructor(name: string);

    /**
     * The name identifier of the slider
     */
    name: string;

    /**
     * Gets or sets whether the thumb (handle) is visible
     * @defaultValue true
     */
    displayThumb: boolean;

    /**
     * Gets or sets the step increment for value changes
     * When set to 0, values can change continuously
     * @defaultValue 0
     */
    step: number;

    /**
     * Gets or sets the offset of the bar from the control edges as a string
     * Can be specified in pixels or percentage (e.g., "5px" or "10%")
     * @defaultValue "5px"
     */
    barOffset: string;

    /**
     * Gets the bar offset value in pixels
     * Computed based on the current control dimensions
     * @readonly
     */
    readonly barOffsetInPixels: number;

    /**
     * Gets or sets the width of the thumb (handle) as a string
     * Can be specified in pixels or percentage (e.g., "20px" or "10%")
     * @defaultValue "20px"
     */
    thumbWidth: string;

    /**
     * Gets the thumb width value in pixels
     * Computed based on the current control dimensions
     * @readonly
     */
    readonly thumbWidthInPixels: number;

    /**
     * Gets or sets the minimum value of the slider range
     * @defaultValue 0
     */
    minimum: number;

    /**
     * Gets or sets the maximum value of the slider range
     * @defaultValue 100
     */
    maximum: number;

    /**
     * Gets or sets the current value of the slider
     * Value is automatically clamped between minimum and maximum
     * @defaultValue 50
     */
    value: number;

    /**
     * Gets or sets whether the slider is oriented vertically
     * @defaultValue false
     */
    isVertical: boolean;

    /**
     * Gets or sets whether the thumb is clamped to the bar boundaries
     * When true, thumb doesn't extend beyond the slider bar
     * @defaultValue false
     */
    isThumbClamped: boolean;

    /**
     * Observable triggered when the slider value changes
     * Notifies with the new value
     */
    onValueChangedObservable: Observable<number>;

    /**
     * Internal: ValueAndUnit instance for thumb width calculations
     * @internal
     */
    protected _thumbWidth: ValueAndUnit;

    /**
     * Internal: Minimum value storage
     * @internal
     */
    protected _minimum: number;

    /**
     * Internal: Maximum value storage
     * @internal
     */
    protected _maximum: number;

    /**
     * Internal: Current value storage
     * @internal
     */
    protected _value: number;

    /**
     * Internal: Vertical orientation flag
     * @internal
     */
    protected _isVertical: boolean;

    /**
     * Internal: ValueAndUnit instance for bar offset calculations
     * @internal
     */
    protected _barOffset: ValueAndUnit;

    /**
     * Internal: Thumb clamping flag
     * @internal
     */
    protected _isThumbClamped: boolean;

    /**
     * Internal: Thumb display flag
     * @internal
     */
    protected _displayThumb: boolean;

    /**
     * Internal: Step increment value
     * @internal
     */
    protected _step: number;

    /**
     * Internal: Last recorded pointer ID for tracking
     * @internal
     */
    protected _lastPointerDownId: number;

    /**
     * Internal: Computed effective bar offset in pixels
     * @internal
     */
    protected _effectiveBarOffset: number;

    /**
     * Internal: Tracks whether pointer is currently pressed down
     * @internal
     */
    protected _pointerIsDown: boolean;

    /**
     * Internal: Left position for rendering
     * @internal
     */
    protected _renderLeft: number;

    /**
     * Internal: Top position for rendering
     * @internal
     */
    protected _renderTop: number;

    /**
     * Internal: Width for rendering
     * @internal
     */
    protected _renderWidth: number;

    /**
     * Internal: Height for rendering
     * @internal
     */
    protected _renderHeight: number;

    /**
     * Internal: Length of the background box (longer dimension)
     * @internal
     */
    protected _backgroundBoxLength: number;

    /**
     * Internal: Thickness of the background box (shorter dimension)
     * @internal
     */
    protected _backgroundBoxThickness: number;

    /**
     * Internal: Computed effective thumb thickness in pixels
     * @internal
     */
    protected _effectiveThumbThickness: number;

    /**
     * Gets the type name of this control
     * @returns "BaseSlider"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Calculates the thumb position along the slider bar
     * @returns Position in pixels from the start of the bar
     * @internal
     */
    protected _getThumbPosition(): number;

    /**
     * Calculates the thumb thickness based on shape and settings
     * @param thumbShape - Shape of the thumb ("circle" or "rectangle")
     * @returns Thickness in pixels
     * @internal
     */
    protected _getThumbThickness(thumbShape: "circle" | "rectangle"): number;

    /**
     * Prepares rendering data and dimensions before drawing
     * @param thumbShape - Shape of the thumb ("circle" or "rectangle")
     * @internal
     */
    protected _prepareRenderingData(thumbShape: "circle" | "rectangle"): void;

    /**
     * Updates the slider value based on pointer coordinates
     * @param x - X coordinate in pixels
     * @param y - Y coordinate in pixels
     * @internal
     */
    protected _updateValueFromPointer(x: number, y: number): void;

    /**
     * Handles pointer down events on the slider
     * @param target - The control that received the event
     * @param coordinates - Pointer coordinates
     * @param pointerId - Unique identifier for the pointer
     * @param buttonIndex - Mouse button index
     * @param type - Event type
     * @returns True if event was handled
     * @internal
     */
    protected _onPointerDown(
        target: Control,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        type: number
    ): boolean;

    /**
     * Handles pointer move events on the slider
     * @param target - The control that received the event
     * @param coordinates - Pointer coordinates
     * @param pointerId - Unique identifier for the pointer
     * @param type - Event type
     * @internal
     */
    protected _onPointerMove(
        target: Control,
        coordinates: Vector2,
        pointerId: number,
        type: number
    ): void;

    /**
     * Handles pointer up events on the slider
     * @param target - The control that received the event
     * @param coordinates - Pointer coordinates
     * @param pointerId - Unique identifier for the pointer
     * @param buttonIndex - Mouse button index
     * @param notifyClick - Whether to notify click observers
     * @internal
     */
    protected _onPointerUp(
        target: Control,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        notifyClick: boolean
    ): void;

    /**
     * Handles canvas blur events (when canvas loses focus)
     * @internal
     */
    protected _onCanvasBlur(): void;
}