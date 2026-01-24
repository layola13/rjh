import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { StackPanel } from "./stackPanel";
import { TextBlock } from "./textBlock";

/**
 * Checkbox control for GUI
 * Represents a clickable checkbox with checked/unchecked states
 */
export declare class Checkbox extends Control {
    /**
     * The name of the checkbox control
     */
    name: string;

    /**
     * Internal state tracking whether the checkbox is checked
     * @internal
     */
    private _isChecked: boolean;

    /**
     * Internal background color of the checkbox
     * @internal
     */
    private _background: string;

    /**
     * Internal ratio determining the size of the check mark relative to the box
     * @internal
     */
    private _checkSizeRatio: number;

    /**
     * Internal border thickness of the checkbox
     * @internal
     */
    private _thickness: number;

    /**
     * Observable that fires when the checkbox checked state changes
     * Notifies observers with the new checked state (boolean)
     */
    onIsCheckedChangedObservable: Observable<boolean>;

    /**
     * Whether the checkbox blocks pointer events from passing through
     */
    isPointerBlocker: boolean;

    /**
     * Creates a new Checkbox instance
     * @param name - The name identifier for this checkbox
     */
    constructor(name: string);

    /**
     * Gets the border thickness of the checkbox
     */
    get thickness(): number;

    /**
     * Sets the border thickness of the checkbox
     * @param value - The thickness value in pixels
     */
    set thickness(value: number);

    /**
     * Gets the ratio of the check mark size to the checkbox size
     * Value is clamped between 0 and 1
     */
    get checkSizeRatio(): number;

    /**
     * Sets the ratio of the check mark size to the checkbox size
     * @param value - The ratio value (automatically clamped to 0-1 range)
     */
    set checkSizeRatio(value: number);

    /**
     * Gets the background color of the checkbox
     */
    get background(): string;

    /**
     * Sets the background color of the checkbox
     * @param value - The color value (CSS color string)
     */
    set background(value: string);

    /**
     * Gets whether the checkbox is currently checked
     */
    get isChecked(): boolean;

    /**
     * Sets whether the checkbox is currently checked
     * Triggers the onIsCheckedChangedObservable when changed
     * @param value - The checked state
     */
    set isChecked(value: boolean);

    /**
     * Gets the type name of this control
     * @returns "Checkbox"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Draws the checkbox on the canvas
     * @param context - The 2D rendering context
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Handles pointer down events on the checkbox
     * Toggles the checked state if not read-only
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The identifier of the pointer
     * @param buttonIndex - The mouse button index
     * @param deltaX - The X offset since last event (optional)
     * @param deltaY - The Y offset since last event (optional)
     * @returns True if the event was handled
     * @internal
     */
    protected _onPointerDown(
        target: Control,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        deltaX?: number,
        deltaY?: number
    ): boolean;

    /**
     * Creates a checkbox with an associated text header in a horizontal layout
     * @param headerText - The text to display next to the checkbox
     * @param onValueChanged - Callback function triggered when checkbox state changes
     * @returns A StackPanel containing the checkbox and text
     */
    static AddCheckBoxWithHeader(
        headerText: string,
        onValueChanged: (value: boolean) => void
    ): StackPanel;
}

/**
 * Type alias for 2D vector coordinates
 */
interface Vector2 {
    x: number;
    y: number;
}