import { Observable } from "core/Misc/observable";
import { Rectangle } from "../../../lts/gui/dist/2D/controls/rectangle";
import { Control } from "../../../lts/gui/dist/2D/controls/control";
import { Vector2WithInfo } from "../../../lts/gui/dist/2D/math2D";
import { IPointerEvent } from "../../../lts/gui/dist/2D/IEvents";

/**
 * Represents a toggle button control that can switch between active and inactive states.
 * Extends Rectangle to provide a clickable button with customizable animations.
 */
export declare class ToggleButton extends Rectangle {
    /**
     * The name identifier of the toggle button
     */
    name: string;

    /**
     * Observable that fires when the isActive state changes
     */
    onIsActiveChangedObservable: Observable<boolean>;

    /**
     * When true, allows child controls to handle picking events instead of the button itself
     * @defaultValue false
     */
    delegatePickingToChildren: boolean;

    /**
     * Gets or sets the group name for this toggle button.
     * Toggle buttons in the same group will automatically deactivate when another in the group is activated (radio button behavior).
     */
    get group(): string;
    set group(value: string);

    /**
     * Gets or sets whether the toggle button is in the active state.
     * Setting this value triggers the appropriate animation and notifies observers.
     */
    get isActive(): boolean;
    set isActive(value: boolean);

    /**
     * Animation function called when transitioning to active state.
     * Default implementation sets thickness to 1.
     */
    toActiveAnimation?: () => void;

    /**
     * Animation function called when transitioning to inactive state.
     * Default implementation sets thickness to 0.
     */
    toInactiveAnimation?: () => void;

    /**
     * Animation function called when pointer enters while button is active.
     * Default implementation reduces alpha by 0.1.
     */
    pointerEnterActiveAnimation?: () => void;

    /**
     * Animation function called when pointer exits while button is active.
     * Default implementation restores original alpha.
     */
    pointerOutActiveAnimation?: () => void;

    /**
     * Animation function called when pointer is pressed down while button is active.
     * Default implementation reduces scale by 0.05 on both axes.
     */
    pointerDownActiveAnimation?: () => void;

    /**
     * Animation function called when pointer is released while button is active.
     * Default implementation increases scale by 0.05 on both axes.
     */
    pointerUpActiveAnimation?: () => void;

    /**
     * Animation function called when pointer enters while button is inactive.
     * Default implementation reduces alpha by 0.1.
     */
    pointerEnterInactiveAnimation?: () => void;

    /**
     * Animation function called when pointer exits while button is inactive.
     * Default implementation restores original alpha.
     */
    pointerOutInactiveAnimation?: () => void;

    /**
     * Animation function called when pointer is pressed down while button is inactive.
     * Default implementation reduces scale by 0.05 on both axes.
     */
    pointerDownInactiveAnimation?: () => void;

    /**
     * Animation function called when pointer is released while button is inactive.
     * Default implementation increases scale by 0.05 on both axes.
     */
    pointerUpInactiveAnimation?: () => void;

    /**
     * Creates a new ToggleButton instance
     * @param name - The name identifier for the button
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
     * Processes pointer picking for hit testing and event handling
     * @param x - X coordinate in local space
     * @param y - Y coordinate in local space
     * @param pointerId - The pointer identifier
     * @param type - The pointer event type
     * @param buttonIndex - The mouse button index
     * @param deltaX - Delta X movement
     * @param deltaY - Delta Y movement
     * @param pi - Pointer info object
     * @returns True if the control was picked, false otherwise
     * @internal
     */
    _processPicking(
        x: number,
        y: number,
        pointerId: number,
        type: number,
        buttonIndex: number,
        deltaX?: number,
        deltaY?: number,
        pi?: IPointerEvent
    ): boolean;

    /**
     * Handles pointer enter event
     * @param target - The control that received the event
     * @param pi - Pointer info object
     * @returns True if the event was handled
     * @internal
     */
    _onPointerEnter(target: Control, pi: Vector2WithInfo): boolean;

    /**
     * Handles pointer out event
     * @param target - The control that received the event
     * @param pi - Pointer info object
     * @param force - Whether to force the event
     * @internal
     */
    _onPointerOut(target: Control, pi: Vector2WithInfo, force?: boolean): void;

    /**
     * Handles pointer down event
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The pointer identifier
     * @param buttonIndex - The mouse button index
     * @param pi - Pointer info object
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
     * Handles pointer up event
     * @param target - The control that received the event
     * @param coordinates - The pointer coordinates
     * @param pointerId - The pointer identifier
     * @param buttonIndex - The mouse button index
     * @param notifyClick - Whether to notify click observers
     * @param pi - Pointer info object
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