import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { StackPanel } from "./stackPanel";
import { TextBlock } from "./textBlock";

/**
 * Class used to represent a checkbox control
 */
export declare class Checkbox extends Control {
    /**
     * The name of the checkbox
     */
    name: string;

    /**
     * Gets or sets the border thickness of the checkbox
     */
    thickness: number;

    /**
     * Gets or sets the ratio of the inner check mark size relative to the checkbox size
     * Value is clamped between 0 and 1
     */
    checkSizeRatio: number;

    /**
     * Gets or sets the background color of the checkbox
     */
    background: string;

    /**
     * Gets or sets the checked state of the checkbox
     */
    isChecked: boolean;

    /**
     * Observable raised when the checked state changes
     */
    onIsCheckedChangedObservable: Observable<boolean>;

    /**
     * Gets or sets whether the checkbox blocks pointer events
     */
    isPointerBlocker: boolean;

    /**
     * Gets or sets whether the checkbox is read-only
     */
    isReadOnly?: boolean;

    /**
     * Gets or sets the color when the checkbox is disabled
     */
    protected _disabledColor: string;

    /**
     * Gets or sets the color of the check mark when disabled
     */
    protected _disabledColorItem: string;

    /**
     * Creates a new Checkbox
     * @param name - The name of the checkbox
     */
    constructor(name: string);

    /**
     * Gets the type name of the control
     * @returns The string "Checkbox"
     */
    protected _getTypeName(): string;

    /**
     * Draws the checkbox on the canvas
     * @param context - The 2D rendering context
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Handles pointer down events
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pi - Pointer info object
     * @returns True if the event was handled
     */
    protected _onPointerDown(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        pi: unknown
    ): boolean;

    /**
     * Creates a checkbox with a header text in a horizontal stack panel
     * @param text - The header text to display
     * @param onValueChanged - Callback function when the checkbox state changes
     * @returns A StackPanel containing the checkbox and text
     */
    static AddCheckBoxWithHeader(
        text: string,
        onValueChanged: (value: boolean) => void
    ): StackPanel;
}