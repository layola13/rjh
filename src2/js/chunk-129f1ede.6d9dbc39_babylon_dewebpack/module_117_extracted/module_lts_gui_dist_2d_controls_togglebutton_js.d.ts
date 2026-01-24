import { Observable } from "core/Misc/observable";
import { Rectangle } from "../../../lts/gui/dist/2D/controls/rectangle";
import { Control } from "../../../lts/gui/dist/2D/controls/control";
import { Vector2WithInfo } from "core/Maths/math.vector";
import { IPointerEvent } from "core/Events/deviceInputEvents";

/**
 * Class used to create a toggle button that can switch between active and inactive states
 * @remarks
 * ToggleButton extends Rectangle and provides interactive state management with customizable animations
 */
export declare class ToggleButton extends Rectangle {
    /**
     * The name of the toggle button
     */
    name: string;

    /**
     * Observable raised when the active state changes
     * @remarks
     * Observers are notified with the new isActive boolean value
     */
    onIsActiveChangedObservable: Observable<boolean>;

    /**
     * Determines whether pointer events should be delegated to child controls
     * @defaultValue false
     */
    delegatePickingToChildren: boolean;

    /**
     * Gets or sets the group name for this toggle button
     * @remarks
     * Toggle buttons in the same group exhibit radio button behavior - only one can be active at a time
     */
    get group(): string;
    set group(value: string);

    /**
     * Gets or sets whether this toggle button is in the active state
     * @remarks
     * Setting this property triggers state change animations and group synchronization
     */
    get isActive(): boolean;
    set isActive(value: boolean);

    /**
     * Animation callback invoked when transitioning to active state
     * @remarks
     * Default implementation sets thickness to 1
     */
    toActiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when transitioning to inactive state
     * @remarks
     * Default implementation sets thickness to 0
     */
    toInactiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer enters an active button
     * @remarks
     * Default implementation reduces alpha by 0.1
     */
    pointerEnterActiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer leaves an active button
     * @remarks
     * Default implementation restores the original alpha value
     */
    pointerOutActiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer is pressed on an active button
     * @remarks
     * Default implementation reduces scale by 0.05 on both axes
     */
    pointerDownActiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer is released on an active button
     * @remarks
     * Default implementation increases scale by 0.05 on both axes
     */
    pointerUpActiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer enters an inactive button
     * @remarks
     * Default implementation reduces alpha by 0.1
     */
    pointerEnterInactiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer leaves an inactive button
     * @remarks
     * Default implementation restores the original alpha value
     */
    pointerOutInactiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer is pressed on an inactive button
     * @remarks
     * Default implementation reduces scale by 0.05 on both axes
     */
    pointerDownInactiveAnimation: (() => void) | null;

    /**
     * Animation callback invoked when pointer is released on an inactive button
     * @remarks
     * Default implementation increases scale by 0.05 on both axes
     */
    pointerUpInactiveAnimation: (() => void) | null;

    /**
     * Creates a new ToggleButton
     * @param name - The name identifier for this toggle button
     * @param group - Optional group name for radio button behavior (default: empty string)
     */
    constructor(name: string, group?: string);

    /**
     * Gets the type name of this control
     * @returns The string "ToggleButton"
     * @internal
     */
    _getTypeName(): string;

    /**
     * Processes pointer picking to determine if this control was clicked
     * @param x - The x coordinate in local space
     * @param y - The y coordinate in local space
     * @param pi - Pointer info data
     * @param type - The pointer event type
     * @param pointerId - The unique pointer identifier
     * @param buttonIndex - The mouse button index
     * @param deltaX - The horizontal movement delta
     * @param deltaY - The vertical movement delta
     * @returns True if the control was successfully picked
     * @internal
     */
    _processPicking(
        x: number,
        y: number,
        pi: IPointerEvent,
        type: number,
        pointerId: number,
        buttonIndex: number,
        deltaX: number,
        deltaY: number
    ): boolean;

    /**
     * Handles pointer enter events
     * @param target - The control that was entered
     * @param pi - Pointer info data
     * @returns True if the event was handled
     * @internal
     */
    _onPointerEnter(target: Control, pi: IPointerEvent): boolean;

    /**
     * Handles pointer out events
     * @param target - The control that was exited
     * @param pi - Pointer info data
     * @param force - Whether to force the pointer out behavior
     * @internal
     */
    _onPointerOut(target: Control, pi: IPointerEvent, force?: boolean): void;

    /**
     * Handles pointer down events
     * @param target - The control that received the pointer down
     * @param coordinates - The pointer coordinates
     * @param pointerId - The unique pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pi - Pointer info data
     * @returns True if the event was handled
     * @internal
     */
    _onPointerDown(
        target: Control,
        coordinates: Vector2WithInfo,
        pointerId: number,
        buttonIndex: number,
        pi: IPointerEvent
    ): boolean;

    /**
     * Handles pointer up events
     * @param target - The control that received the pointer up
     * @param coordinates - The pointer coordinates
     * @param pointerId - The unique pointer identifier
     * @param buttonIndex - The mouse button index
     * @param notifyClick - Whether to notify click observers
     * @param pi - Pointer info data
     * @internal
     */
    _onPointerUp(
        target: Control,
        coordinates: Vector2WithInfo,
        pointerId: number,
        buttonIndex: number,
        notifyClick: boolean,
        pi: IPointerEvent
    ): void;
}