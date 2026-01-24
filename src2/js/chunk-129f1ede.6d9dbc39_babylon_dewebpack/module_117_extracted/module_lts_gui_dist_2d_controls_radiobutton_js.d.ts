import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { StackPanel } from "./stackPanel";
import { TextBlock } from "./textBlock";

/**
 * Callback function invoked when a radio button's checked state changes
 * @param radioButton - The radio button that changed
 * @param isChecked - The new checked state
 */
export type RadioButtonCheckedCallback = (radioButton: RadioButton, isChecked: boolean) => void;

/**
 * Class used to create radio button controls
 * Radio buttons allow single selection within a group of mutually exclusive options
 */
export declare class RadioButton extends Control {
    /**
     * The name identifier for this radio button
     */
    name: string;

    /**
     * Indicates whether this radio button is currently checked
     */
    isChecked: boolean;

    /**
     * The background color of the radio button circle
     * @defaultValue "black"
     */
    background: string;

    /**
     * The ratio of the inner check circle size relative to the outer circle
     * Valid range: 0.0 to 1.0
     * @defaultValue 0.8
     */
    checkSizeRatio: number;

    /**
     * The thickness of the radio button border in pixels
     * @defaultValue 1
     */
    thickness: number;

    /**
     * The group name for mutual exclusion
     * Radio buttons with the same group name will uncheck others when one is checked
     * @defaultValue ""
     */
    group: string;

    /**
     * Observable that fires when the checked state changes
     * Notifies observers with the new isChecked boolean value
     */
    readonly onIsCheckedChangedObservable: Observable<boolean>;

    /**
     * Whether this control blocks pointer events from passing through
     * @defaultValue true
     */
    isPointerBlocker: boolean;

    /**
     * Creates a new RadioButton instance
     * @param name - The name identifier for this radio button
     */
    constructor(name: string);

    /**
     * Factory method to create a radio button with an associated text label
     * @param headerText - The text to display next to the radio button
     * @param group - The group name for mutual exclusion
     * @param isChecked - Initial checked state
     * @param onValueChanged - Callback invoked when the checked state changes
     * @returns A StackPanel containing the radio button and text label
     */
    static AddRadioButtonWithHeader(
        headerText: string,
        group: string,
        isChecked: boolean,
        onValueChanged: RadioButtonCheckedCallback
    ): StackPanel;

    /**
     * Internal method to get the type name for serialization
     * @returns The string "RadioButton"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Internal method to render the radio button to the canvas context
     * @param context - The 2D canvas rendering context
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Internal method to handle pointer down events
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The unique pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pickingInfo - Additional picking information
     * @returns True if the event was handled
     * @internal
     */
    protected _onPointerDown(
        target: Control,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        pickingInfo: any
    ): boolean;
}