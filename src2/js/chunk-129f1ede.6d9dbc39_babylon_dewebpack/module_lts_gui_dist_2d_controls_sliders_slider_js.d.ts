import type { Observable } from "core/Misc/observable";
import type { BaseSlider } from "./baseSlider";
import type { Gradient } from "../../gradient";
import type { ICanvasRenderingContext } from "../../iCanvasRenderingContext";
import type { Measure } from "../../measure";

/**
 * Class used to create slider controls in 2D GUI
 * A slider allows users to select a value from a continuous range by dragging a thumb along a track
 */
export declare class Slider extends BaseSlider {
    /**
     * The name identifier of the slider control
     */
    name: string;

    /**
     * Gets or sets whether to display the colored value bar
     * The value bar shows the filled portion of the slider from the start to the current value
     * @defaultValue true
     */
    displayValueBar: boolean;

    /**
     * Gets or sets the border color of the slider thumb
     * @defaultValue "white"
     */
    borderColor: string;

    /**
     * Gets or sets the background color of the slider track
     * This is used when backgroundGradient is not set
     * @defaultValue "black"
     */
    background: string;

    /**
     * Gets or sets the background gradient for the slider track
     * When set, this takes precedence over the solid background color
     * @defaultValue null
     */
    backgroundGradient: Gradient | null;

    /**
     * Gets or sets the color of the slider thumb
     * If empty, defaults to the control's primary color
     * @defaultValue ""
     */
    thumbColor: string;

    /**
     * Gets or sets whether the thumb should be rendered as a circle
     * When false, the thumb is rendered as a rectangle
     * @defaultValue false
     */
    isThumbCircle: boolean;

    /**
     * Creates a new Slider instance
     * @param name - The name identifier for this slider control
     */
    constructor(name?: string);

    /**
     * Gets the type name of this control
     * @returns The string "Slider"
     */
    protected _getTypeName(): string;

    /**
     * Gets the background color or gradient to use for rendering
     * @param context - The canvas rendering context
     * @returns The background color string or CanvasGradient object
     */
    protected _getBackgroundColor(context: ICanvasRenderingContext): string | CanvasGradient;

    /**
     * Renders the slider control to the canvas
     * Handles drawing the background track, value bar, and thumb based on current settings
     * @param context - The canvas 2D rendering context to draw on
     */
    protected _draw(context: ICanvasRenderingContext): void;

    /**
     * Serializes the slider control to a JSON object
     * @param serializationObject - The object to serialize properties into
     */
    serialize(serializationObject: Record<string, unknown>): void;

    /**
     * Parses and reconstructs the slider control from serialized content
     * @param serializedObject - The serialized data object to parse
     * @param host - The host context for instantiation
     */
    protected _parseFromContent(
        serializedObject: Record<string, unknown>,
        host: unknown
    ): void;

    // Inherited from BaseSlider
    /**
     * Observable triggered when the slider value changes
     */
    onValueChangedObservable: Observable<number>;

    /**
     * Gets or sets the minimum value of the slider range
     */
    minimum: number;

    /**
     * Gets or sets the maximum value of the slider range
     */
    maximum: number;

    /**
     * Gets or sets the current value of the slider
     */
    value: number;

    /**
     * Gets or sets whether the slider is vertical (true) or horizontal (false)
     */
    isVertical: boolean;

    /**
     * Gets or sets whether to display the thumb indicator
     */
    displayThumb: boolean;

    /**
     * Gets or sets whether the thumb is clamped within the track bounds
     */
    isThumbClamped: boolean;

    /**
     * Gets or sets the step increment for discrete value changes
     */
    step: number;

    /**
     * The current measure (dimensions and position) of the control
     */
    protected _currentMeasure: Measure;

    /**
     * Calculated render position - left coordinate
     */
    protected _renderLeft: number;

    /**
     * Calculated render position - top coordinate
     */
    protected _renderTop: number;

    /**
     * Calculated render dimension - width
     */
    protected _renderWidth: number;

    /**
     * Calculated render dimension - height
     */
    protected _renderHeight: number;

    /**
     * Effective thickness of the thumb in pixels
     */
    protected _effectiveThumbThickness: number;

    /**
     * Effective offset of the bar from the edge
     */
    protected _effectiveBarOffset: number;

    /**
     * Thickness of the background box
     */
    protected _backgroundBoxThickness: number;

    /**
     * Length of the background box
     */
    protected _backgroundBoxLength: number;

    /**
     * Shadow blur radius in pixels
     */
    shadowBlur: number;

    /**
     * Shadow offset on the X axis in pixels
     */
    shadowOffsetX: number;

    /**
     * Shadow offset on the Y axis in pixels
     */
    shadowOffsetY: number;

    /**
     * Color of the drop shadow
     */
    shadowColor: string;

    /**
     * Prepares rendering data for the control
     * @param thumbShape - The shape of the thumb ("circle" or "rectangle")
     */
    protected _prepareRenderingData(thumbShape: "circle" | "rectangle"): void;

    /**
     * Gets the current position of the thumb along the track
     * @returns The thumb position in pixels
     */
    protected _getThumbPosition(): number;

    /**
     * Gets the primary color for rendering
     * @param context - The canvas rendering context
     * @returns The color string or gradient
     */
    protected _getColor(context: ICanvasRenderingContext): string | CanvasGradient;

    /**
     * Applies visual states (hover, pressed, etc.) to the rendering context
     * @param context - The canvas rendering context
     */
    protected _applyStates(context: ICanvasRenderingContext): void;

    /**
     * Marks the control as dirty, requiring a redraw
     */
    protected _markAsDirty(): void;
}