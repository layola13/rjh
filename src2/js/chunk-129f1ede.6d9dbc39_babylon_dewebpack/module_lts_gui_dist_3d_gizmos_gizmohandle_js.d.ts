/**
 * 3D Gizmo handle components for interactive manipulation
 * Provides base handle functionality and specialized handles for sides and corners
 */

import { Observable, Observer } from "core/Misc/observable";
import { Scene } from "core/scene";
import { TransformNode } from "core/Nodes/transformNode";
import { Mesh } from "core/Meshes/mesh";
import { Vector3 } from "core/Maths/math.vector";
import { HandleMaterial } from "../materials/handle/handleMaterial";
import { BaseSixDofDragBehavior } from "core/Behaviors/Meshes/baseSixDofDragBehavior";

/**
 * Represents the interactive state of a gizmo handle
 */
export enum HandleState {
    /** Handle is in its default state */
    IDLE = 0,
    /** Handle is being hovered over by the pointer */
    HOVER = 1,
    /** Handle is being actively dragged */
    DRAG = 2
}

/**
 * Callback invoked when drag operation starts
 */
export type DragStartCallback = (event: DragStartEvent) => void;

/**
 * Callback invoked during active dragging
 */
export type DraggingCallback = (event: DragEvent) => void;

/**
 * Callback invoked when drag operation ends
 */
export type DragEndCallback = (event: DragEndEvent) => void;

/**
 * Event data for drag operations
 */
export interface DragStartEvent {
    position: Vector3;
}

export interface DragEvent {
    delta: Vector3;
    position: Vector3;
}

export interface DragEndEvent {
    position: Vector3;
}

/**
 * Interface for gizmo objects that own handles
 */
export interface IGizmo {
    readonly scene: Scene;
}

/**
 * Base class for interactive gizmo handles
 * Manages visual state, materials, and drag behavior for 3D manipulation controls
 */
export declare abstract class GizmoHandle {
    /** Current interaction state (IDLE, HOVER, or DRAG) */
    protected _state: HandleState;
    
    /** Materials applied to handle geometry, updated based on state */
    protected _materials: HandleMaterial[];
    
    /** Scene containing this handle */
    protected _scene: Scene;
    
    /** Parent gizmo that owns this handle */
    protected _gizmo: IGizmo;
    
    /** Drag behavior managing pointer interactions */
    protected _dragBehavior?: BaseSixDofDragBehavior;
    
    /** Observer for drag start events */
    protected _dragStartObserver?: Observer<DragStartEvent>;
    
    /** Observer for active dragging events */
    protected _draggingObserver?: Observer<DragEvent>;
    
    /** Observer for drag end events */
    protected _dragEndObserver?: Observer<DragEndEvent>;
    
    /** Root scene node representing this handle */
    node: TransformNode;

    /**
     * Creates a new gizmo handle
     * @param gizmo - Parent gizmo owning this handle
     * @param scene - Scene to create the handle in
     */
    constructor(gizmo: IGizmo, scene: Scene);

    /** Gets the current interaction state */
    get state(): HandleState;

    /** Gets the parent gizmo */
    get gizmo(): IGizmo;

    /**
     * Sets the hover state of the handle
     * @param value - True to enable hover state, false to disable
     */
    set hover(value: boolean);

    /**
     * Sets the drag state of the handle
     * @param value - True to enable drag state, false to disable
     */
    set drag(value: boolean);

    /**
     * Creates the visual node hierarchy for this handle
     * Must be implemented by derived classes to define handle geometry
     * @returns Root transform node for the handle
     */
    abstract createNode(): TransformNode;

    /**
     * Creates a handle material with optional position offset
     * @param positionOffset - Offset applied to material shader for visual effects
     * @returns Configured handle material
     */
    protected _createMaterial(positionOffset?: Vector3): HandleMaterial;

    /**
     * Updates all materials based on current interaction state
     * Applies hover or drag visual feedback to materials
     */
    protected _updateMaterial(): void;

    /**
     * Configures drag behavior with callback handlers
     * @param onDragStart - Callback invoked when dragging starts
     * @param onDragging - Callback invoked during active dragging
     * @param onDragEnd - Callback invoked when dragging ends
     */
    setDragBehavior(
        onDragStart: DragStartCallback,
        onDragging: DraggingCallback,
        onDragEnd: DragEndCallback
    ): void;

    /**
     * Disposes the handle and cleans up resources
     * Removes observers, detaches behaviors, disposes materials and nodes
     */
    dispose(): void;
}

/**
 * Handle representing a side edge of a bounding volume
 * Creates a rectangular bar geometry for edge manipulation
 */
export declare class SideHandle extends GizmoHandle {
    /**
     * Creates the vertical side handle node
     * @returns Transform node with box mesh child (1x10x0.1 units)
     */
    createNode(): TransformNode;
}

/**
 * Handle representing a corner vertex of a bounding volume
 * Creates perpendicular bars forming an L-shape for corner manipulation
 */
export declare class CornerHandle extends GizmoHandle {
    /**
     * Creates the corner handle node with horizontal and vertical elements
     * @returns Transform node with two box mesh children (3x1x0.1 and 1x3x0.1 units)
     */
    createNode(): TransformNode;
}