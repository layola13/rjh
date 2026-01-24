import { BaseSlider } from './baseSlider';
import { Measure } from '../../measure';
import { Image } from '../image';
import { Observable } from 'core/Misc/observable';
import { ICanvasRenderingContext } from '../../ICanvasRenderingContext';

/**
 * Image-based slider control that uses images for background, value bar, and thumb.
 * Extends BaseSlider to provide visual customization through image assets.
 */
export declare class ImageBasedSlider extends BaseSlider {
    /**
     * The name of the slider control.
     */
    name: string;

    /**
     * Internal measure object for temporary calculations during rendering.
     * @internal
     */
    private _tempMeasure: Measure;

    /**
     * Internal flag controlling thumb visibility.
     * @internal
     */
    private _displayThumb: boolean;

    /**
     * Internal reference to the background image.
     * @internal
     */
    private _backgroundImage: Image;

    /**
     * Internal reference to the value bar image.
     * @internal
     */
    private _valueBarImage: Image;

    /**
     * Internal reference to the thumb image.
     * @internal
     */
    private _thumbImage: Image;

    /**
     * Creates a new ImageBasedSlider.
     * @param name - The name identifier for this slider control
     */
    constructor(name: string);

    /**
     * Gets whether the thumb should be displayed.
     * Returns true only if _displayThumb is true and thumbImage is not null.
     */
    get displayThumb(): boolean;

    /**
     * Sets whether the thumb should be displayed.
     * Marks the control as dirty when the value changes.
     */
    set displayThumb(value: boolean);

    /**
     * Gets the background image for the slider.
     */
    get backgroundImage(): Image;

    /**
     * Sets the background image for the slider.
     * Automatically marks the control as dirty when the image loads or changes.
     * @param value - The image to use as background
     */
    set backgroundImage(value: Image);

    /**
     * Gets the value bar image that represents the filled portion of the slider.
     */
    get valueBarImage(): Image;

    /**
     * Sets the value bar image that represents the filled portion of the slider.
     * Automatically marks the control as dirty when the image loads or changes.
     * @param value - The image to use as value bar
     */
    set valueBarImage(value: Image);

    /**
     * Gets the thumb image (the draggable handle).
     */
    get thumbImage(): Image;

    /**
     * Sets the thumb image (the draggable handle).
     * Automatically marks the control as dirty when the image loads or changes.
     * @param value - The image to use as thumb
     */
    set thumbImage(value: Image);

    /**
     * Gets the type name of this control.
     * @returns "ImageBasedSlider"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Renders the slider control to the canvas context.
     * Draws background image, value bar image, and thumb image in sequence.
     * @param context - The canvas rendering context
     * @internal
     */
    protected _draw(context: ICanvasRenderingContext): void;

    /**
     * Serializes the slider configuration to a JSON object.
     * Includes background, thumb, and value bar image configurations.
     * @param serializationObject - The object to serialize into
     */
    serialize(serializationObject: Record<string, unknown>): void;

    /**
     * Parses and reconstructs the slider from serialized content.
     * @param serializedObject - The serialized configuration object
     * @param host - The host control or manager
     * @internal
     */
    protected _parseFromContent(serializedObject: Record<string, unknown>, host: unknown): void;

    /**
     * Gets the current thumb position along the slider track.
     * @returns The position value in pixels
     * @internal
     */
    protected _getThumbPosition(): number;

    /**
     * Gets the effective thickness of the thumb element.
     * @internal
     */
    protected get _effectiveThumbThickness(): number;

    /**
     * Gets the effective bar offset for positioning.
     * @internal
     */
    protected get _effectiveBarOffset(): number;

    /**
     * Indicates whether the slider is oriented vertically.
     * @internal
     */
    protected get isVertical(): boolean;

    /**
     * Indicates whether the thumb is clamped to the slider bounds.
     * @internal
     */
    protected get isThumbClamped(): boolean;

    /**
     * The left position of the rendered area.
     * @internal
     */
    protected get _renderLeft(): number;

    /**
     * The top position of the rendered area.
     * @internal
     */
    protected get _renderTop(): number;

    /**
     * The width of the rendered area.
     * @internal
     */
    protected get _renderWidth(): number;

    /**
     * The height of the rendered area.
     * @internal
     */
    protected get _renderHeight(): number;

    /**
     * The current measure (dimensions and position) of the control.
     * @internal
     */
    protected get _currentMeasure(): Measure;

    /**
     * Applies rendering states to the canvas context.
     * @param context - The canvas rendering context
     * @internal
     */
    protected _applyStates(context: ICanvasRenderingContext): void;

    /**
     * Prepares rendering data for the specified shape type.
     * @param shapeType - The type of shape to prepare for rendering
     * @internal
     */
    protected _prepareRenderingData(shapeType: string): void;

    /**
     * Marks the control as needing a redraw.
     * @internal
     */
    protected _markAsDirty(): void;
}