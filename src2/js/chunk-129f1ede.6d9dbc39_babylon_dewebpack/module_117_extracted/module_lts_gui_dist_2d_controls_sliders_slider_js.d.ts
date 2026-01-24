import { BaseSlider } from "./baseSlider";
import { Nullable } from "core/types";
import { BaseGradient } from "../gradients/baseGradient";
import { ICanvasRenderingContext } from "core/Engines/ICanvas";

/**
 * Slider control for Babylon.js GUI
 * Extends BaseSlider to provide a visual slider with customizable appearance
 */
export declare class Slider extends BaseSlider {
    /**
     * Creates a new Slider instance
     * @param name - The name identifier for this slider control
     */
    constructor(name?: string);

    /**
     * The name identifier of the slider
     */
    name: string;

    /**
     * Gets or sets whether to display the value bar (filled portion of the slider)
     * When true, shows a filled bar from the start to the current thumb position
     */
    get displayValueBar(): boolean;
    set displayValueBar(value: boolean);

    /**
     * Gets or sets the border color of the slider thumb
     * Accepts any valid CSS color string (e.g., "white", "#FFFFFF", "rgb(255,255,255)")
     */
    get borderColor(): string;
    set borderColor(value: string);

    /**
     * Gets or sets the background color of the slider track
     * Accepts any valid CSS color string
     * Note: If backgroundGradient is set, it takes precedence over this solid color
     */
    get background(): string;
    set background(value: string);

    /**
     * Gets or sets the background gradient for the slider track
     * When set, this gradient is used instead of the solid background color
     */
    get backgroundGradient(): Nullable<BaseGradient>;
    set backgroundGradient(value: Nullable<BaseGradient>);

    /**
     * Gets or sets the color of the slider thumb
     * If empty string, falls back to the control's default color
     * Accepts any valid CSS color string
     */
    get thumbColor(): string;
    set thumbColor(value: string);

    /**
     * Gets or sets whether the thumb should be rendered as a circle
     * When false, the thumb is rendered as a rectangle
     * @defaultValue false
     */
    get isThumbCircle(): boolean;
    set isThumbCircle(value: boolean);

    /**
     * Gets the type name of this control
     * @returns The string "Slider"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Gets the background color or gradient for rendering
     * @param context - The canvas rendering context
     * @returns Canvas gradient if backgroundGradient is set, otherwise the solid background color
     * @internal
     */
    protected _getBackgroundColor(context: ICanvasRenderingContext): string | CanvasGradient;

    /**
     * Draws the slider control on the canvas
     * Handles rendering of:
     * - Background track (with optional gradient)
     * - Value bar (if displayValueBar is true)
     * - Thumb (circle or rectangle based on isThumbCircle)
     * - Shadows and borders
     * @param context - The canvas 2D rendering context
     * @internal
     */
    protected _draw(context: ICanvasRenderingContext): void;

    /**
     * Serializes the slider properties to a JSON object
     * @param serializationObject - The object to serialize properties into
     */
    serialize(serializationObject: any): void;

    /**
     * Parses slider properties from a serialized object
     * @param serializedObject - The serialized slider data
     * @param host - The host GUI system instance
     * @internal
     */
    protected _parseFromContent(serializedObject: any, host: any): void;

    /**
     * Internal flag for displaying the value bar
     * @internal
     */
    private _displayValueBar: boolean;

    /**
     * Internal storage for border color
     * @internal
     */
    private _borderColor: string;

    /**
     * Internal storage for background color
     * @internal
     */
    private _background: string;

    /**
     * Internal storage for background gradient
     * @internal
     */
    private _backgroundGradient: Nullable<BaseGradient>;

    /**
     * Internal storage for thumb color
     * @internal
     */
    private _thumbColor: string;

    /**
     * Internal flag for circular thumb shape
     * @internal
     */
    private _isThumbCircle: boolean;
}