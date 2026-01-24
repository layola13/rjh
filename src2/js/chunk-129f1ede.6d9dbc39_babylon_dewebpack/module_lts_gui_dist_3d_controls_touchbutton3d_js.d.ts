import { Observable } from "core/Misc/observable";
import { Vector3, Matrix, TmpVectors } from "core/Maths/math.vector";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { PointerEventTypes, PointerInfo } from "core/Events/pointerEvents";
import { Button3D } from "./button3D";

/**
 * 3D touch button control that supports near interaction and toggle functionality
 */
export declare class TouchButton3D extends Button3D {
    /**
     * Observable triggered when the button's toggle state changes
     */
    onToggleObservable: Observable<boolean>;

    /**
     * Indicates whether the button is currently being pressed via near interaction
     * @readonly
     */
    get isActiveNearInteraction(): boolean;

    /**
     * Gets the collidable front direction in world space
     * The direction vector pointing forward from the collision mesh
     */
    get collidableFrontDirection(): Vector3;

    /**
     * Sets the collidable front direction
     * Normalizes the vector and transforms it to the collision mesh's local space
     */
    set collidableFrontDirection(value: Vector3);

    /**
     * Sets the collision mesh used for near interaction detection
     * Automatically configures near pickability and stores GUI3D control references
     */
    set collisionMesh(mesh: AbstractMesh);

    /**
     * Gets whether this button operates in toggle mode
     * Toggle buttons maintain state between presses
     */
    get isToggleButton(): boolean;

    /**
     * Sets whether this button operates in toggle mode
     * When enabled, button maintains pressed/unpressed state
     */
    set isToggleButton(value: boolean);

    /**
     * Gets the current toggle state of the button
     * Only meaningful when isToggleButton is true
     */
    get isToggled(): boolean;

    /**
     * Sets the toggle state of the button
     * Only applies when isToggleButton is true
     */
    set isToggled(value: boolean);

    /**
     * Creates a new TouchButton3D instance
     * @param name - Unique name for the button control
     * @param collisionMesh - Optional mesh to use for collision detection
     */
    constructor(name: string, collisionMesh?: AbstractMesh);

    /**
     * Calculates the press depth based on interaction position
     * @param interactionPosition - World space position of the interaction point
     * @returns Press depth in world units, 0 if not pressed
     */
    getPressDepth(interactionPosition: Vector3): number;

    /**
     * Gets the type name of this control
     * @returns "TouchButton3D"
     */
    protected _getTypeName(): string;

    /**
     * Disposes of the button and cleans up resources
     * Removes observers, clears observables, and disposes collision mesh
     */
    dispose(): void;

    /**
     * Internal: Handles toggle state changes
     * @param newState - The new toggle state
     */
    protected _onToggle(newState: boolean): void;

    /**
     * Internal: Checks if interaction point is in front of the button
     * @param interactionPosition - World space position to check
     * @returns True if position is in front of button surface
     */
    protected _isInteractionInFrontOfButton(interactionPosition: Vector3): boolean;

    /**
     * Internal: Calculates height of interaction point relative to button surface
     * @param interactionPosition - World space position of interaction
     * @param surfacePosition - World space position of button surface
     * @returns Signed distance along front direction vector
     */
    protected _getInteractionHeight(
        interactionPosition: Vector3,
        surfacePosition: Vector3
    ): number;

    /**
     * Internal: Converts raw pointer events to appropriate event types based on button state
     * @param eventType - Original pointer event type
     * @param interactionPosition - World space position of the interaction
     * @param pointerId - Identifier for the pointer
     * @returns Mapped pointer event type
     */
    protected _generatePointerEventType(
        eventType: number,
        interactionPosition: Vector3,
        pointerId: number
    ): number;

    /**
     * Internal: Injects GUI3D metadata into mesh's reserved data store
     * @param mesh - Mesh to inject metadata into
     * @returns The GUI3D reserved data store object
     */
    protected _injectGUI3DReservedDataStore(mesh: AbstractMesh): any;

    /**
     * Internal: Creates the scene node for this control
     * @param scene - The scene to create the node in
     * @returns The created node
     */
    protected _createNode(scene: any): any;

    /** @internal */
    private _isNearPressed: boolean;

    /** @internal */
    private _interactionSurfaceHeight: number;

    /** @internal */
    private _collisionMesh: AbstractMesh;

    /** @internal */
    private _collidableFrontDirection: Vector3;

    /** @internal */
    private _isToggleButton: boolean;

    /** @internal */
    private _toggleState: boolean;

    /** @internal */
    private _toggleButtonCallback: () => void;
}