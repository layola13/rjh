/**
 * GUI 3D Gizmos Module
 * Provides gizmo handles and slate gizmo components for 3D manipulation in the GUI
 */

/**
 * Enum representing the different states a gizmo handle can be in
 */
export enum HandleState {
  /** Handle is in its default, inactive state */
  Idle = 0,
  /** Handle is being hovered over by the pointer */
  Hovered = 1,
  /** Handle is currently being dragged/manipulated */
  Active = 2,
  /** Handle is disabled and cannot be interacted with */
  Disabled = 3
}

/**
 * Base class for gizmo handles that can be interacted with in 3D space
 */
export declare class GizmoHandle {
  /**
   * Current state of the handle
   */
  state: HandleState;

  /**
   * Creates a new gizmo handle instance
   * @param name - Unique identifier for this handle
   */
  constructor(name: string);

  /**
   * Updates the handle's visual representation based on its current state
   */
  updateVisuals(): void;

  /**
   * Handles pointer interaction events
   * @param event - The pointer event data
   * @returns True if the event was handled, false otherwise
   */
  onPointerEvent(event: PointerEvent): boolean;

  /**
   * Disposes of the handle and releases resources
   */
  dispose(): void;
}

/**
 * Corner handle for manipulating corners of a slate/panel in 3D space
 * Typically used for resizing operations from corner points
 */
export declare class CornerHandle extends GizmoHandle {
  /**
   * Creates a new corner handle
   * @param name - Unique identifier for this corner handle
   * @param position - Initial position vector for the corner
   */
  constructor(name: string, position: Vector3);

  /**
   * The corner position in local space
   */
  readonly position: Vector3;
}

/**
 * Side handle for manipulating edges of a slate/panel in 3D space
 * Typically used for resizing operations from edge midpoints
 */
export declare class SideHandle extends GizmoHandle {
  /**
   * Creates a new side handle
   * @param name - Unique identifier for this side handle
   * @param axis - The axis along which this side handle operates
   */
  constructor(name: string, axis: Vector3);

  /**
   * The axis direction for this side handle
   */
  readonly axis: Vector3;
}

/**
 * 3D gizmo for manipulating slate/panel objects in 3D space
 * Provides visual handles for resizing, rotating, and positioning
 */
export declare class SlateGizmo {
  /**
   * Collection of corner handles attached to this gizmo
   */
  readonly cornerHandles: CornerHandle[];

  /**
   * Collection of side handles attached to this gizmo
   */
  readonly sideHandles: SideHandle[];

  /**
   * Creates a new slate gizmo instance
   * @param target - The mesh or node that this gizmo will manipulate
   * @param scene - The scene that contains the gizmo
   */
  constructor(target: TransformNode, scene: Scene);

  /**
   * Whether the gizmo is currently visible
   */
  visible: boolean;

  /**
   * Updates the gizmo's position and scale based on its target
   */
  update(): void;

  /**
   * Attaches the gizmo to a new target node
   * @param target - The new target to attach to
   */
  attachToNode(target: TransformNode): void;

  /**
   * Detaches the gizmo from its current target
   */
  detach(): void;

  /**
   * Disposes of the gizmo and all its handles
   */
  dispose(): void;
}

/**
 * Helper type for 3D vector representation
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Base type for transformable nodes in the scene
 */
interface TransformNode {
  position: Vector3;
  rotation: Vector3;
  scaling: Vector3;
}

/**
 * Scene context for rendering
 */
interface Scene {
  // Scene properties would be defined by the rendering engine
}