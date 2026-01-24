import { Observable } from "core/Misc/observable";
import { Vector3, Matrix, TmpVectors } from "core/Maths/math.vector";
import { PointerEventTypes } from "core/Events/pointerEvents";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { Button3D } from "./button3D";
import { Scene } from "core/scene";

/**
 * Reserved data store interface for GUI3D controls
 */
interface GUI3DReservedDataStore {
    GUI3D?: {
        control?: TouchButton3D;
    };
}

/**
 * Class used to create a touchable 3D button with near interaction support
 * Extends Button3D to provide touch-based interaction capabilities including:
 * - Near interaction detection
 * - Press depth calculation
 * - Toggle button functionality
 * - Collision-based interaction
 */
export declare class TouchButton3D extends Button3D {
    /**
     * Internal flag tracking if the button is currently being pressed via near interaction
     * @internal
     */
    private _isNearPressed: boolean;

    /**
     * Height of the interaction surface when touch begins
     * @internal
     */
    private _interactionSurfaceHeight: number;

    /**
     * Flag indicating if this button behaves as a toggle button
     * @internal
     */
    private _isToggleButton: boolean;

    /**
     * Current toggle state of the button (true = toggled on, false = toggled off)
     * @internal
     */
    private _toggleState: boolean;

    /**
     * Collision mesh used for near interaction detection
     * @internal
     */
    private _collisionMesh?: AbstractMesh;

    /**
     * Direction vector defining the front face of the collidable area
     * @internal
     */
    private _collidableFrontDirection: Vector3;

    /**
     * Callback function invoked when toggle button is released
     * @internal
     */
    private _toggleButtonCallback: () => void;

    /**
     * Observable that fires when the button's toggle state changes
     * Callback receives the new toggle state (true/false)
     */
    public onToggleObservable: Observable<boolean>;

    /**
     * Gets whether the button is currently being pressed via near interaction
     * @returns True if near interaction is active, false otherwise
     */
    get isActiveNearInteraction(): boolean;

    /**
     * Gets the world-space direction vector of the collidable front face
     * Transforms the local front direction by the collision mesh's world matrix
     * @returns Normalized world-space front direction vector
     */
    get collidableFrontDirection(): Vector3;

    /**
     * Sets the local-space direction vector of the collidable front face
     * If collision mesh exists, transforms to local space
     * @param value - The new front direction vector (will be normalized)
     */
    set collidableFrontDirection(value: Vector3);

    /**
     * Sets the collision mesh used for near interaction detection
     * Configures isNearPickable and GUI3D reserved data for the mesh and its children
     * @param mesh - The mesh to use for collision detection
     */
    set collisionMesh(mesh: AbstractMesh);

    /**
     * Gets whether this button behaves as a toggle button
     * @returns True if toggle mode is enabled
     */
    get isToggleButton(): boolean;

    /**
     * Sets whether this button behaves as a toggle button
     * When enabled, registers toggle callback; when disabled, clears toggle state
     * @param value - True to enable toggle behavior, false to disable
     */
    set isToggleButton(value: boolean);

    /**
     * Gets the current toggle state of the button
     * @returns True if toggled on, false if toggled off
     */
    get isToggled(): boolean;

    /**
     * Sets the toggle state of the button
     * Only applies if isToggleButton is true
     * @param value - The new toggle state
     */
    set isToggled(value: boolean);

    /**
     * Creates a new TouchButton3D instance
     * @param name - Unique name for the button control
     * @param collisionMesh - Optional collision mesh for near interaction detection
     */
    constructor(name: string, collisionMesh?: AbstractMesh);

    /**
     * Internal method to handle toggle state changes
     * Notifies observers when toggle state changes
     * @param newState - The new toggle state
     * @internal
     */
    private _onToggle(newState: boolean): void;

    /**
     * Checks if the interaction point is in front of the button's collision surface
     * @param interactionPosition - World-space position of the interaction point
     * @returns True if interaction is in front of the button
     * @internal
     */
    private _isInteractionInFrontOfButton(interactionPosition: Vector3): boolean;

    /**
     * Calculates the press depth of the current near interaction
     * @param interactionPosition - World-space position of the interaction point
     * @returns Press depth in world units (0 if not pressed)
     */
    public getPressDepth(interactionPosition: Vector3): number;

    /**
     * Calculates the height/distance of an interaction point relative to the button surface
     * @param interactionPosition - World-space position of the interaction point
     * @param buttonPosition - World-space position of the button
     * @returns Signed distance along the collidable front direction
     * @internal
     */
    private _getInteractionHeight(interactionPosition: Vector3, buttonPosition: Vector3): number;

    /**
     * Generates the appropriate pointer event type based on interaction state
     * Converts raw pointer events to context-aware events considering near interaction
     * @param baseEventType - The original pointer event type
     * @param interactionPosition - World-space position of the interaction
     * @param previousPressDepth - Press depth from previous frame
     * @returns The adjusted pointer event type
     * @internal
     */
    private _generatePointerEventType(
        baseEventType: number,
        interactionPosition: Vector3,
        previousPressDepth: number
    ): number;

    /**
     * Gets the type name of this control
     * @returns "TouchButton3D"
     * @internal
     */
    public _getTypeName(): string;

    /**
     * Creates the node hierarchy for this button
     * @param scene - The scene to create the node in
     * @returns The root node of the button
     * @internal
     */
    protected _createNode(scene: Scene): any;

    /**
     * Injects GUI3D reserved data store into a mesh
     * @param mesh - The mesh to inject data into
     * @returns The mesh's reserved data store
     * @internal
     */
    private _injectGUI3DReservedDataStore(mesh: AbstractMesh): GUI3DReservedDataStore;

    /**
     * Disposes of the button and releases all associated resources
     * Cleans up observables, callbacks, and collision mesh
     */
    public dispose(): void;
}