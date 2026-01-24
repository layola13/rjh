import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control";
import { ValueAndUnit } from "../../../lts/gui/dist/2D/valueAndUnit";

/**
 * Base class for slider controls (horizontal/vertical sliders)
 * Provides common functionality for thumb-based value selection
 */
export declare class BaseSlider extends Control {
    /**
     * Control name identifier
     */
    name: string;

    /**
     * Observable triggered when the slider value changes
     */
    onValueChangedObservable: Observable<number>;

    /**
     * Whether to display the draggable thumb element
     */
    get displayThumb(): boolean;
    set displayThumb(value: boolean);

    /**
     * Step increment for value changes (0 = continuous)
     */
    get step(): number;
    set step(value: number);

    /**
     * Offset of the bar from the control edges (with units)
     */
    get barOffset(): string;
    set barOffset(value: string);

    /**
     * Bar offset converted to pixel value
     * @readonly
     */
    get barOffsetInPixels(): number;

    /**
     * Width of the draggable thumb (with units)
     */
    get thumbWidth(): string;
    set thumbWidth(value: string);

    /**
     * Thumb width converted to pixel value
     * @readonly
     */
    get thumbWidthInPixels(): number;

    /**
     * Minimum allowable value
     */
    get minimum(): number;
    set minimum(value: number);

    /**
     * Maximum allowable value
     */
    get maximum(): number;
    set maximum(value: number);

    /**
     * Current slider value (clamped between minimum and maximum)
     */
    get value(): number;
    set value(value: number);

    /**
     * Whether the slider is oriented vertically (true) or horizontally (false)
     */
    get isVertical(): boolean;
    set isVertical(value: boolean);

    /**
     * Whether the thumb should be clamped within the bar boundaries
     */
    get isThumbClamped(): boolean;
    set isThumbClamped(value: boolean);

    /**
     * Creates a new BaseSlider instance
     * @param name - Identifier for the slider control
     */
    constructor(name: string);

    /**
     * Gets the type name of the control
     * @returns "BaseSlider"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Calculates the current thumb position along the slider track
     * @returns Position in pixels
     * @internal
     */
    protected _getThumbPosition(): number;

    /**
     * Calculates the thumb thickness based on shape type
     * @param thumbShape - Shape type ("circle" or "rectangle")
     * @returns Thickness in pixels
     * @internal
     */
    protected _getThumbThickness(thumbShape: "circle" | "rectangle"): number;

    /**
     * Prepares rendering measurements and dimensions
     * @param thumbShape - Shape type for thumb rendering
     * @internal
     */
    protected _prepareRenderingData(thumbShape: "circle" | "rectangle"): void;

    /**
     * Updates the slider value based on pointer coordinates
     * @param x - Pointer X coordinate
     * @param y - Pointer Y coordinate
     * @internal
     */
    protected _updateValueFromPointer(x: number, y: number): void;

    /**
     * Handles pointer down events
     * @internal
     */
    protected _onPointerDown(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        pi: unknown
    ): boolean;

    /**
     * Handles pointer move events
     * @internal
     */
    protected _onPointerMove(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        pi: unknown
    ): void;

    /**
     * Handles pointer up events
     * @internal
     */
    protected _onPointerUp(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        notifyClick: boolean
    ): void;

    /**
     * Handles canvas blur events
     * @internal
     */
    protected _onCanvasBlur(): void;

    // Internal properties
    /** @internal */
    protected _thumbWidth: ValueAndUnit;
    /** @internal */
    protected _minimum: number;
    /** @internal */
    protected _maximum: number;
    /** @internal */
    protected _value: number;
    /** @internal */
    protected _isVertical: boolean;
    /** @internal */
    protected _barOffset: ValueAndUnit;
    /** @internal */
    protected _isThumbClamped: boolean;
    /** @internal */
    protected _displayThumb: boolean;
    /** @internal */
    protected _step: number;
    /** @internal */
    protected _lastPointerDownId: number;
    /** @internal */
    protected _effectiveBarOffset: number;
    /** @internal */
    protected _pointerIsDown: boolean;
    /** @internal */
    protected _backgroundBoxLength: number;
    /** @internal */
    protected _backgroundBoxThickness: number;
    /** @internal */
    protected _effectiveThumbThickness: number;
    /** @internal */
    protected _renderLeft: number;
    /** @internal */
    protected _renderTop: number;
    /** @internal */
    protected _renderWidth: number;
    /** @internal */
    protected _renderHeight: number;
}