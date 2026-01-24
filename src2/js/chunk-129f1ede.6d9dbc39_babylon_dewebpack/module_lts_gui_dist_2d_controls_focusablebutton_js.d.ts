import { Button } from './button';
import { Observable } from 'core/Misc/observable';
import { IFocusableControl } from '../iFocusableControl';
import { Vector2WithInfo } from '../vector2WithInfo';
import { IKeyboardEvent } from '../events';

/**
 * Represents a button control that can receive and handle keyboard focus.
 * Extends the base Button class with focus management capabilities.
 * @public
 */
export declare class FocusableButton extends Button implements IFocusableControl {
    /**
     * The name identifier of the button.
     */
    name: string;

    /**
     * The color to apply when the button is focused.
     * If null, no color change occurs on focus.
     * @default null
     */
    focusedColor: string | null;

    /**
     * Observable that triggers when the button loses focus.
     * Notifies with the FocusableButton instance.
     */
    readonly onBlurObservable: Observable<FocusableButton>;

    /**
     * Observable that triggers when the button gains focus.
     * Notifies with the FocusableButton instance.
     */
    readonly onFocusObservable: Observable<FocusableButton>;

    /**
     * Observable that triggers when a keyboard event is processed.
     * Notifies with the IKeyboardEvent instance.
     */
    readonly onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;

    /**
     * Indicates whether the button currently has focus.
     * @internal
     */
    private _isFocused: boolean;

    /**
     * Stores the original color before focus was applied.
     * Used to restore the color when focus is lost.
     * @internal
     */
    private _unfocusedColor: string | null;

    /**
     * Creates a new FocusableButton instance.
     * @param name - The name identifier for the button
     */
    constructor(name: string);

    /**
     * Called when the button loses focus.
     * Restores the original color if focusedColor was set.
     * Notifies onBlurObservable subscribers.
     */
    onBlur(): void;

    /**
     * Called when the button gains focus.
     * Applies the focusedColor if set and stores the original color.
     * Notifies onFocusObservable subscribers.
     */
    onFocus(): void;

    /**
     * Determines which control should retain focus after this control.
     * @returns The control to keep focus with, or null if no specific control
     */
    keepsFocusWith(): IFocusableControl | null;

    /**
     * Programmatically sets focus to this button.
     * Requests the host to move focus to this control.
     */
    focus(): void;

    /**
     * Programmatically removes focus from this button.
     * Clears the host's focused control reference.
     */
    blur(): void;

    /**
     * Processes keyboard events when the button has focus.
     * Notifies onKeyboardEventProcessedObservable subscribers.
     * @param event - The keyboard event to process
     */
    processKeyboard(event: IKeyboardEvent): void;

    /**
     * Internal handler for pointer down events.
     * Automatically focuses the button unless it is read-only.
     * @param target - The control that was targeted
     * @param coordinates - The pointer coordinates with additional info
     * @param pointerId - The unique identifier of the pointer
     * @param buttonIndex - The mouse button index (0: left, 1: middle, 2: right)
     * @param canvasEventData - Raw canvas event data
     * @returns True if the event was handled
     * @internal
     */
    protected _onPointerDown(
        target: Button,
        coordinates: Vector2WithInfo,
        pointerId: number,
        buttonIndex: number,
        canvasEventData: any
    ): boolean;

    /**
     * Disposes of the button and cleans up all observables.
     * Clears all event listeners and releases resources.
     */
    dispose(): void;
}