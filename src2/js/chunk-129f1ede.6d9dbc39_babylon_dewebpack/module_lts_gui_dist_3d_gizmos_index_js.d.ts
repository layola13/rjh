/**
 * Module: GUI 3D Gizmos
 * Provides gizmo handles and controls for 3D scene manipulation
 */

/**
 * Enumeration of possible handle states
 */
export enum HandleState {
  /** Handle is in idle state */
  Idle = 0,
  /** Handle is being hovered over */
  Hover = 1,
  /** Handle is being actively dragged */
  Active = 2
}

/**
 * Base class for gizmo handles
 * Provides common functionality for interactive 3D manipulation handles
 */
export declare class GizmoHandle {
  /**
   * Current state of the handle
   */
  state: HandleState;

  /**
   * Whether the handle is currently enabled
   */
  enabled: boolean;

  /**
   * Updates the handle's visual representation
   */
  update(): void;

  /**
   * Disposes of the handle and releases resources
   */
  dispose(): void;
}

/**
 * Corner handle for gizmo manipulation
 * Used for corner-based transformations (e.g., scaling from corners)
 */
export declare class CornerHandle extends GizmoHandle {
  /**
   * Creates a new corner handle
   * @param position - Position identifier for the corner
   */
  constructor(position: string);
}

/**
 * Side handle for gizmo manipulation
 * Used for side-based transformations (e.g., scaling from edges)
 */
export declare class SideHandle extends GizmoHandle {
  /**
   * Creates a new side handle
   * @param position - Position identifier for the side
   */
  constructor(position: string);
}

/**
 * Slate gizmo for 2D plane manipulation in 3D space
 * Provides interactive controls for positioning and scaling slate-like objects
 */
export declare class SlateGizmo {
  /**
   * Collection of handles attached to this gizmo
   */
  readonly handles: ReadonlyArray<GizmoHandle>;

  /**
   * Whether the gizmo is currently visible
   */
  visible: boolean;

  /**
   * Whether the gizmo is enabled for interaction
   */
  enabled: boolean;

  /**
   * Attaches the gizmo to a target object
   * @param target - The object to attach the gizmo to
   */
  attachToObject(target: unknown): void;

  /**
   * Detaches the gizmo from its current target
   */
  detach(): void;

  /**
   * Updates the gizmo's state and visual representation
   */
  update(): void;

  /**
   * Disposes of the gizmo and all its handles
   */
  dispose(): void;
}