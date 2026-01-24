import type { Observable, Observer } from "core/Misc/observable";
import type { Vector3 } from "core/Maths/math.vector";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Matrix } from "core/Maths/math.matrix";
import type { Scene } from "core/scene";
import type { ValueAndUnit } from "./valueAndUnit";
import type { Control } from "./control";

/**
 * Represents a point in a multi-line GUI system that can be positioned via:
 * - Explicit x/y coordinates (with units)
 * - Attachment to a GUI Control
 * - Attachment to a 3D Mesh (with automatic projection)
 */
export declare class MultiLinePoint {
    /**
     * Reference to the parent MultiLine container
     * @internal
     */
    private _multiLine: IMultiLineContainer;

    /**
     * X coordinate with unit support (px, %, etc.)
     * @internal
     */
    private _x: ValueAndUnit;

    /**
     * Y coordinate with unit support (px, %, etc.)
     * @internal
     */
    private _y: ValueAndUnit;

    /**
     * Cached 3D position of this point after translation
     * @internal
     */
    private _point: Vector3;

    /**
     * Optional GUI control this point is attached to
     * @internal
     */
    private _control: Control | null;

    /**
     * Observer tracking control dirty state changes
     * @internal
     */
    private _controlObserver: Observer<Control> | null;

    /**
     * Optional 3D mesh this point is attached to
     * @internal
     */
    private _mesh: AbstractMesh | null;

    /**
     * Observer tracking mesh position changes via camera render updates
     * @internal
     */
    private _meshObserver: Observer<Scene> | null;

    /**
     * Creates a new MultiLinePoint instance
     * @param multiLine - Parent multi-line container managing this point
     */
    constructor(multiLine: IMultiLineContainer);

    /**
     * Gets the x coordinate as a string with unit (e.g., "100px", "50%")
     */
    get x(): string;

    /**
     * Sets the x coordinate from a string with unit
     * Triggers parent dirty marking if value changes
     */
    set x(value: string);

    /**
     * Gets the y coordinate as a string with unit (e.g., "100px", "50%")
     */
    get y(): string;

    /**
     * Sets the y coordinate from a string with unit
     * Triggers parent dirty marking if value changes
     */
    set y(value: string);

    /**
     * Gets the GUI control this point is attached to (if any)
     */
    get control(): Control | null;

    /**
     * Sets the GUI control this point should track
     * Automatically sets up observers to detect control position changes
     * Removes previous control observers if switching controls
     */
    set control(value: Control | null);

    /**
     * Gets the 3D mesh this point is attached to (if any)
     */
    get mesh(): AbstractMesh | null;

    /**
     * Sets the 3D mesh this point should track
     * Automatically sets up observers to detect mesh position changes via camera render
     * Removes previous mesh observers if switching meshes
     */
    set mesh(value: AbstractMesh | null);

    /**
     * Removes all attachments (control and mesh links)
     * Cleans up associated observers
     */
    resetLinks(): void;

    /**
     * Translates this point to its current 3D position based on:
     * - Mesh bounding sphere center (if mesh is set)
     * - Control center position (if control is set)
     * - Explicit x/y coordinates (if neither mesh nor control is set)
     * @returns The calculated 3D position vector
     */
    translate(): Vector3;

    /**
     * Internal method that performs the actual position translation
     * @internal
     * @returns The calculated 3D position vector
     */
    private _translatePoint(): Vector3;

    /**
     * Disposes this point and cleans up all references and observers
     */
    dispose(): void;
}

/**
 * Internal interface representing the parent multi-line container
 * @internal
 */
interface IMultiLineContainer {
    /**
     * GUI host providing canvas and projection utilities
     */
    _host: IMultiLineHost;

    /**
     * Callback invoked when a point is updated
     */
    onPointUpdate: () => void;

    /**
     * Marks the multi-line as needing re-render
     */
    _markAsDirty(): void;
}

/**
 * Internal interface representing the GUI host environment
 * @internal
 */
interface IMultiLineHost {
    /**
     * Canvas element for dimension calculations
     */
    _canvas: HTMLCanvasElement;

    /**
     * Projects a 3D world position to 2D screen space with depth
     * @param position - World space position to project
     * @param worldMatrix - Transformation matrix of the object
     * @returns Screen space position with Z depth
     */
    getProjectedPositionWithZ(position: Vector3, worldMatrix: Matrix): Vector3;
}