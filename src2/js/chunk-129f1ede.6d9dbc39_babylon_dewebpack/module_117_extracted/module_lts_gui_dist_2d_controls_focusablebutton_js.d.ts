import { Button } from './button';
import { Observable } from 'core/Misc/observable';
import { Vector2 } from 'core/Maths/math.vector';
import { IKeyboardEvent } from 'core/Events/deviceInputEvents';

/**
 * Focusable button control that extends Button with focus management capabilities.
 * Provides focus/blur events and keyboard interaction support.
 */
export declare class FocusableButton extends Button {
    /**
     * The name identifier of the button
     */
    name: string;

    /**
     * The color to apply when the button is focused.
     * If null, no color change occurs on focus.
     */
    focusedColor: string | null;

    /**
     * Observable triggered when the button loses focus
     */
    readonly onBlurObservable: Observable<FocusableButton>;

    /**
     * Observable triggered when the button gains focus
     */
    readonly onFocusObservable: Observable<FocusableButton>;

    /**
     * Observable triggered when a keyboard event is processed by this button
     */
    readonly onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;

    /**
     * Indicates whether the button currently has focus
     */
    protected _isFocused: boolean;

    /**
     * Stores the original color before focus was applied
     */
    protected _unfocusedColor: string | null;

    /**
     * Creates a new FocusableButton instance
     * @param name - The name identifier for the button
     */
    constructor(name: string);

    /**
     * Called when the button loses focus.
     * Restores the unfocused color and notifies observers.
     */
    onBlur(): void;

    /**
     * Called when the button gains focus.
     * Applies the focused color and notifies observers.
     */
    onFocus(): void;

    /**
     * Determines which control should maintain focus relationship with this button.
     * @returns The control to keep focus with, or null
     */
    keepsFocusWith(): null;

    /**
     * Requests focus for this button by notifying the host to move focus to it
     */
    focus(): void;

    /**
     * Removes focus from this button by clearing the host's focused control
     */
    blur(): void;

    /**
     * Processes keyboard events for this button
     * @param event - The keyboard event to process
     */
    processKeyboard(event: IKeyboardEvent): void;

    /**
     * Internal pointer down handler that requests focus before processing the event
     * @param target - The control receiving the pointer event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pointerEvent - The original pointer event
     * @returns True if the event was handled
     */
    protected _onPointerDown(
        target: Button,
        coordinates: Vector2,
        pointerId: number,
        buttonIndex: number,
        pointerEvent: PointerEvent
    ): boolean;

    /**
     * Disposes of the button and clears all observables
     */
    dispose(): void;
}