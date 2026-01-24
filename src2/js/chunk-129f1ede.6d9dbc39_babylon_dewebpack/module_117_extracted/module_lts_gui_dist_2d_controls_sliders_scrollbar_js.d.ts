import type { BaseSlider } from './baseSlider';
import type { Measure } from '../measure';
import type { Observable } from 'core/Misc/observable';
import type { ICanvasGradient } from '../gradients';

/**
 * Represents a scrollbar control for GUI.
 * Extends BaseSlider to provide scrolling functionality with customizable appearance.
 */
export declare class ScrollBar extends BaseSlider {
    /**
     * The name identifier of the scrollbar control.
     */
    name: string;

    /**
     * Gets or sets the border color of the scrollbar.
     * @remarks When set, triggers a redraw of the control.
     */
    borderColor: string;

    /**
     * Gets or sets the background color of the scrollbar.
     * @remarks When set, triggers a redraw of the control.
     */
    background: string;

    /**
     * Gets or sets the background gradient of the scrollbar.
     * @remarks If set, this gradient will be used instead of the solid background color.
     */
    backgroundGradient: ICanvasGradient | null;

    /**
     * Gets or sets whether the scroll direction should be inverted.
     * @remarks When true, scrolling behaves in the opposite direction.
     */
    invertScrollDirection: boolean;

    /**
     * Internal storage for border color.
     * @internal
     */
    private _borderColor: string;

    /**
     * Internal storage for background color.
     * @internal
     */
    private _background: string;

    /**
     * Internal storage for background gradient.
     * @internal
     */
    private _backgroundGradient: ICanvasGradient | null;

    /**
     * Temporary measure object used for rendering calculations.
     * @internal
     */
    private _tempMeasure: Measure;

    /**
     * Flag to invert scroll direction.
     * @internal
     */
    private _invertScrollDirection: boolean;

    /**
     * Creates a new ScrollBar instance.
     * @param name - The name identifier for the scrollbar.
     */
    constructor(name: string);

    /**
     * Gets the type name of this control.
     * @returns The string "Scrollbar".
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Calculates the thickness of the scrollbar thumb.
     * @returns The computed thumb thickness in pixels.
     * @internal
     */
    protected _getThumbThickness(): number;

    /**
     * Gets the background color or gradient for rendering.
     * @param context - The canvas rendering context.
     * @returns A color string or canvas gradient.
     * @internal
     */
    protected _getBackgroundColor(context: CanvasRenderingContext2D): string | CanvasGradient;

    /**
     * Renders the scrollbar to the canvas.
     * @param context - The canvas rendering context.
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Updates the scrollbar value based on pointer/mouse position.
     * @param x - The x-coordinate of the pointer.
     * @param y - The y-coordinate of the pointer.
     * @internal
     */
    protected _updateValueFromPointer(x: number, y: number): void;

    /**
     * Handles pointer down events on the scrollbar.
     * @param target - The control that received the pointer event.
     * @param coordinates - The pointer coordinates.
     * @param pointerId - The unique identifier for the pointer.
     * @param buttonIndex - The mouse button index.
     * @param type - The pointer event type.
     * @returns True if the event was handled.
     * @internal
     */
    protected _onPointerDown(
        target: unknown,
        coordinates: unknown,
        pointerId: number,
        buttonIndex: number,
        type: number
    ): boolean;

    /**
     * Serializes the scrollbar configuration to a JSON object.
     * @param serializationObject - The object to serialize into.
     */
    serialize(serializationObject: Record<string, unknown>): void;

    /**
     * Parses and applies configuration from a serialized object.
     * @param serializedObject - The serialized configuration object.
     * @param host - The host advanced dynamic texture.
     * @internal
     */
    protected _parseFromContent(
        serializedObject: Record<string, unknown>,
        host: unknown
    ): void;
}