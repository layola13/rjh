/**
 * Gizmo handle module for 3D GUI interactions
 * Provides base handle functionality and specialized side/corner handles
 */

import { Scene, TransformNode, Vector3, Mesh } from "@babylonjs/core";
import { Observable, Observer } from "@babylonjs/core/Misc/observable";
import { BaseSixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/baseSixDofDragBehavior";
import { HandleMaterial } from "../materials/handle/handleMaterial";

/**
 * Represents the visual/interaction state of a gizmo handle
 */
export enum HandleState {
  /** Handle is in idle state (not hovered or dragged) */
  IDLE = 0,
  /** Handle is being hovered over */
  HOVER = 1,
  /** Handle is being dragged */
  DRAG = 2
}

/**
 * Callback function invoked when drag starts
 */
export type DragStartCallback = (eventData: any) => void;

/**
 * Callback function invoked during dragging
 */
export type DraggingCallback = (eventData: any) => void;

/**
 * Callback function invoked when drag ends
 */
export type DragEndCallback = (eventData: any) => void;

/**
 * Interface for gizmo objects that can own handles
 */
export interface IGizmo {
  // Define gizmo properties as needed
}

/**
 * Base class for gizmo handles that can be hovered, dragged, and manipulated in 3D space
 */
export declare class GizmoHandle {
  /**
   * The root transform node for this handle
   */
  node: TransformNode;

  /**
   * Current state of the handle (idle, hover, or drag)
   */
  get state(): HandleState;

  /**
   * The parent gizmo that owns this handle
   */
  get gizmo(): IGizmo;

  /**
   * Set whether the handle is in hover state
   */
  set hover(value: boolean);

  /**
   * Set whether the handle is in drag state
   */
  set drag(value: boolean);

  /**
   * @param gizmo - The parent gizmo object
   * @param scene - The Babylon.js scene
   */
  constructor(gizmo: IGizmo, scene: Scene);

  /**
   * Create the visual node representation for this handle
   * Must be implemented by derived classes
   */
  protected createNode(): TransformNode;

  /**
   * Create a handle material with optional position offset
   * @param positionOffset - Offset to apply to material position
   * @returns The created handle material
   */
  protected _createMaterial(positionOffset?: Vector3): HandleMaterial;

  /**
   * Update material properties based on current handle state
   */
  protected _updateMaterial(): void;

  /**
   * Configure drag behavior for the handle with event callbacks
   * @param onDragStart - Callback invoked when drag starts
   * @param onDragging - Callback invoked during dragging
   * @param onDragEnd - Callback invoked when drag ends
   */
  setDragBehavior(
    onDragStart: DragStartCallback,
    onDragging: DraggingCallback,
    onDragEnd: DragEndCallback
  ): void;

  /**
   * Clean up resources and remove event listeners
   */
  dispose(): void;
}

/**
 * Handle displayed on the side of a gizmo (vertical bar)
 */
export declare class SideHandle extends GizmoHandle {
  /**
   * Create the side handle node as a vertical box
   * @returns The created transform node with attached mesh
   */
  protected createNode(): TransformNode;
}

/**
 * Handle displayed at the corner of a gizmo (L-shaped with horizontal and vertical bars)
 */
export declare class CornerHandle extends GizmoHandle {
  /**
   * Create the corner handle node as an L-shape with horizontal and vertical boxes
   * @returns The created transform node with attached meshes
   */
  protected createNode(): TransformNode;
}