/**
 * Scale context and controllers for wall board resizing functionality.
 * Provides interactive scaling handles for wall board content in 3D space.
 */

import * as T3D from './t3d-types';
import * as HSCore from './hscore-types';
import * as HSApp from './hsapp-types';

/**
 * Default opacity for scale handles
 */
declare const DEFAULT_OPACITY = 1;

/**
 * Margin offset for scale handle positioning
 */
declare const SCALE_MARGIN = 0.05;

/**
 * Direction types for wall board scaling operations
 */
export enum ScaleDirectionType {
  /** Scale from top edge */
  top = 'top',
  /** Scale from left edge */
  left = 'left',
  /** Scale from right edge */
  right = 'right',
  /** Scale from bottom edge */
  bottom = 'bottom'
}

/**
 * Context manager for wall board scale operations.
 * Tracks the currently active scale handle and notifies listeners of changes.
 */
export declare class ScaleContext {
  /**
   * The currently active scale direction, or undefined if no scaling is in progress
   */
  activeScale?: ScaleDirectionType;

  /**
   * Signal dispatched when the active scale changes
   */
  signalChange: HSCore.Util.Signal<ScaleContext>;

  constructor();

  /**
   * Sets the active scale direction and notifies listeners
   * @param direction - The scale direction to activate, or undefined to deactivate
   */
  setActiveScale(direction: ScaleDirectionType | undefined): void;
}

/**
 * Mesh data for scale handle rendering
 */
interface ScaleMeshData {
  /** Geometry for the scale handle */
  geometry: T3D.StreamingMesh;
  /** Materials for different handle states */
  material: {
    /** Material for normal state */
    normal: T3D.Material;
    /** Material for highlighted/hover state */
    highlight: T3D.Material;
  };
}

/**
 * Visual gizmo representing a scale handle on a wall board.
 * Displays an interactive handle at the specified edge of the content.
 */
export declare class WallBoardScale extends HSApp.View.Base.Gizmo {
  /**
   * Shared mesh data across all scale handles (lazy-loaded)
   * @internal
   */
  private static _meshData: ScaleMeshData | null;

  /**
   * The wall board content being scaled
   */
  readonly content: HSCore.Model.Content;

  /**
   * The edge direction where this scale handle is positioned
   */
  readonly scaleDirType: ScaleDirectionType;

  /**
   * Shared context for coordinating multiple scale handles
   */
  readonly scaleContext: ScaleContext;

  /**
   * The 3D node containing the handle mesh
   * @internal
   */
  private node?: T3D.Node;

  /**
   * The mesh node for the interactive scale button
   * @internal
   */
  private moveBtn?: T3D.MeshNode;

  /**
   * Texture for normal state
   * @internal
   */
  private _normalTexture?: T3D.Texture;

  /**
   * Texture for highlighted state
   * @internal
   */
  private _highlightTexture?: T3D.Texture;

  /**
   * Whether textures have finished loading
   * @internal
   */
  private _textureReady: boolean;

  /**
   * Whether this instance has been cleaned up
   * @internal
   */
  private _cleanedUp: boolean;

  /**
   * Creates a new wall board scale handle
   * @param scene - The 3D scene context
   * @param layer - The layer to attach the gizmo to
   * @param content - The wall board content to scale
   * @param direction - The edge direction for this handle
   * @param context - Shared scale context for coordination
   */
  constructor(
    scene: T3D.Scene,
    layer: HSCore.Model.Layer,
    content: HSCore.Model.Content,
    direction: ScaleDirectionType,
    context: ScaleContext
  );

  /**
   * Initializes mesh geometry and materials, loading required textures
   * @returns Promise that resolves when mesh data is ready
   * @internal
   */
  private _initMeshData(): Promise<void>;

  /**
   * Cleanup resources when the gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Shows the scale handle in the scene
   */
  show(): void;

  /**
   * Hides the scale handle from the scene
   */
  hide(): void;

  /**
   * Updates the mesh position and rotation based on content state
   */
  updateMesh(): void;

  /**
   * Handles mouse over event - highlights the handle
   */
  onMouseOver(): void;

  /**
   * Handles mouse out event - restores normal appearance
   */
  onMouseOut(): void;

  /**
   * Calculates the 3D position for the scale handle based on content bounds and direction
   * @returns The world-space position for the handle
   * @internal
   */
  private _getPosition(): T3D.Vector3;

  /**
   * Calculates the rotation quaternion for the scale handle based on content rotation and direction
   * @returns The rotation quaternion for the handle
   * @internal
   */
  private _getRotation(): T3D.Quaternion;

  /**
   * Handles content field changes to update handle position
   * @internal
   */
  private _onContentFieldChange(event: unknown): void;

  /**
   * Handles active scale changes in the context
   * @internal
   */
  private _onActiveScaleChange(event: unknown): void;
}

/**
 * Display controller for wall board scale interactions.
 * Manages drag operations and command execution for scaling.
 * @internal
 */
declare class WallBoardScaleController extends HSApp.View.Base.DisplayController {
  /**
   * The wall board content being controlled
   */
  readonly content: HSCore.Model.Content;

  /**
   * The scale direction this controller handles
   */
  readonly scaleDirType: ScaleDirectionType;

  /**
   * Shared scale context
   */
  readonly scaleContext: ScaleContext;

  /**
   * Signal connection manager
   * @internal
   */
  private signalHook: HSCore.Util.SignalHook;

  /**
   * The active resize command during drag operations
   * @internal
   */
  private _cmd?: HSFPConstants.Command;

  /**
   * Starting position when drag begins
   * @internal
   */
  private _startPosition?: number[];

  /**
   * Creates a new scale controller
   * @param content - The content to control
   * @param scene - The 3D scene
   * @param direction - The scale direction
   * @param context - Shared scale context
   */
  constructor(
    content: HSCore.Model.Content,
    scene: T3D.Scene,
    direction: ScaleDirectionType,
    context: ScaleContext
  );

  /**
   * Gets the gizmo type vector based on scale direction
   * @returns Vector indicating scale axis and direction
   * @internal
   */
  private _getGizmoType(): { x: number; y: number; z: number };

  /**
   * Handles drag start event - creates and executes resize command
   * @param event - The drag event
   * @returns True if drag was initiated successfully
   */
  ondragstart(event: { position: number[] }): boolean;

  /**
   * Handles mouse down event
   */
  onmousedown(): void;

  /**
   * Composes drag move parameters with offset calculation
   * @param event - The drag event with position data
   * @returns Updated event with calculated offset
   */
  composedragmoveparam(event: {
    position?: number[];
    offset: number[];
  }): typeof event;

  /**
   * Handles command termination to clean up drag state
   * @internal
   */
  private _onCommandTerminate(event: {
    data: { cmd: HSFPConstants.Command };
  }): void;
}