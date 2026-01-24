/**
 * Module: WFABase
 * Base controller and gizmo for Workflow Annotation (WFA) interactions
 */

import { MeshComponent } from './MeshComponent';
import { Coordinate3, Quaternion, Vector3, Matrix4, Box3, Euler, MathUtil } from './Math';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { ResizeBoxColor } from './ResizeBoxColor';

/**
 * Active context state for WFA interactions
 */
export interface WFAActiveContext {
  /** Signal emitted when active state changes */
  signalChange: Signal<void>;
  /** Current active type identifier */
  active?: string | number;
}

/**
 * Box geometry information with center-bottom position and dimensions
 */
export interface BoxInfo {
  /** Center-bottom position of the bounding box */
  centerBottom: Vector3;
  /** Size dimensions (x, y, z) */
  size: Vector3;
}

/**
 * Drag event parameter interface
 */
export interface DragEventParam {
  /** Whether mouse tracking is enabled during drag */
  trackingMouse?: boolean;
  [key: string]: unknown;
}

/**
 * Base gizmo class for WFA (Workflow Annotation) visual indicators
 * Manages display, interaction, and styling of annotation gizmos in 3D view
 */
export declare class WFABase extends HSApp.View.T3d.Gizmo {
  /**
   * @param context - The 3D view context
   * @param layer - Parent layer for the gizmo
   * @param entityOrEntities - Single entity or array of entities to annotate
   * @param activeType - Activation type identifier
   * @param activeContext - Context managing active state
   * @param coord - Coordinate system for positioning (defaults to XOY plane)
   * @param controller - Optional custom controller instance
   */
  constructor(
    context: HSApp.View.T3d.Context,
    layer: HSApp.View.T3d.Layer,
    entityOrEntities: HSCore.Model.Content | HSCore.Model.Content[],
    activeType: string | number,
    activeContext: WFAActiveContext,
    coord?: Coordinate3,
    controller?: WFABaseController
  );

  /** Whether gizmo is hidden during camera transitions */
  protected _hideFromCameraChanging: boolean;

  /** Array of content entities being annotated */
  readonly contents: HSCore.Model.Content[];

  /** Single entity reference (undefined for multi-entity annotations) */
  readonly entity?: HSCore.Model.Content;

  /** Activation type identifier for this gizmo */
  protected _activeType: string | number;

  /** Context managing active/inactive states */
  protected _activeContext: WFAActiveContext;

  /** Local coordinate system for positioning */
  protected _coord: Coordinate3;

  /** Whether to use orthogonal bounding box calculation */
  protected _isOrthBox: boolean;

  /** Active context managing this gizmo's state */
  get activeContext(): WFAActiveContext;

  /** Type identifier for activation logic */
  get activeType(): string | number;

  /** Local coordinate system */
  get coord(): Coordinate3;

  /** Typed controller accessor */
  get controller(): WFABaseController;

  /**
   * Main drawing method - shows/hides gizmo based on state
   */
  draw(): void;

  /**
   * Cleanup resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Mouse move event handler
   * @returns true if event was handled
   */
  onMouseMove(): boolean;

  /**
   * Mouse out event handler
   */
  onMouseOut(): void;

  /**
   * Initialize mesh geometry (override in subclasses)
   */
  protected _initMesh(): void;

  /**
   * Camera change start handler - hides gizmo during camera animation
   */
  protected _onCameraChangeStart(): void;

  /**
   * Camera change end handler - shows gizmo after camera animation
   */
  protected _onCameraChangeEnd(): void;

  /**
   * Set visibility during camera changes
   * @param hide - Whether to hide the gizmo
   */
  protected _setHideFromCameraChanging(hide: boolean): void;

  /**
   * Content field change handler - marks gizmo for redraw
   */
  protected _onContentFieldChange(): void;

  /**
   * Active state change handler (override in subclasses)
   */
  protected _onActiveChange(): void;

  /**
   * Apply normal (non-hover) styling (override in subclasses)
   */
  protected _setNormalStyler(): void;

  /**
   * Apply hover styling (override in subclasses)
   */
  protected _setHoverStyler(): void;

  /**
   * Apply color and opacity to mesh materials
   * @param node - Scene node containing mesh components
   * @param color - Optional color to apply
   * @param opacity - Optional opacity to apply
   */
  protected _setMeshColor(
    node: HSApp.View.T3d.Node,
    color?: HSApp.View.Color,
    opacity?: number
  ): void;

  /**
   * Hide the gizmo node
   */
  protected _hide(): void;

  /**
   * Show the gizmo node and update transform
   */
  protected _show(): void;

  /**
   * Update node transform based on content position/rotation (override in subclasses)
   */
  protected _updateNodeTransform(): void;

  /**
   * Check if gizmo should be visible based on active state and content visibility
   * @returns true if gizmo should be shown
   */
  protected _isShowEnable(): boolean;

  /**
   * Calculate signed angle between two vectors around an axis
   * @param vec1 - First vector
   * @param vec2 - Second vector
   * @param normal - Normal vector defining rotation plane
   * @returns Angle in radians [0, 2π]
   */
  protected _getAngle(vec1: Vector3, vec2: Vector3, normal: Vector3): number;

  /**
   * Get layer altitude/elevation for the content's parent layer
   * @returns Altitude in world units
   */
  protected _getLayerAltitudeHeight(): number;

  /**
   * Get bounding box information using appropriate calculation method
   * @returns Box info with center-bottom position and size
   */
  protected _getBox(): BoxInfo;

  /**
   * Get rotation quaternion using appropriate calculation method
   * @returns Rotation quaternion
   */
  protected _getRotation(): Quaternion;

  /**
   * Get bottom-center position in world coordinates
   * @returns World position vector
   */
  getBottomCenterPos(): Vector3;

  /**
   * Get rotation from the coordinate system
   * @returns Rotation quaternion derived from coord matrix
   */
  protected _getCoordRotation(): Quaternion;

  /**
   * Get scaled size of the bounding box
   * @returns Size vector including content scaling
   */
  protected _getSize(): Vector3;

  /**
   * Calculate world-space bounding box in coordinate system's local space
   * @returns Box info in coord-local space
   */
  protected _getWorldBox(): BoxInfo;

  /**
   * Get world-space center-bottom position from orthogonal box
   * @returns World position with layer altitude applied
   */
  protected _getWorldCenterBottomPos(): Vector3;

  /**
   * Calculate bounding box relative to first content item's transform
   * @returns Box info or undefined if contents are incompatible
   */
  protected _getBoxRefFirstContent(): BoxInfo | undefined;

  /**
   * Get position relative to first content item
   * @returns Position vector with layer altitude applied
   */
  protected _getPosRefFirstContent(): Vector3;

  /**
   * Get rotation from first content item
   * @returns Rotation quaternion or undefined if not a Content instance
   */
  getFirstContentRotation(): Quaternion | undefined;

  /**
   * Check if contents are within valid range and not colliding
   * Updates color parameter based on validation result
   * @param param - Object with color property to update
   */
  protected _checkRangeAndCollision(param: { color: HSApp.View.Color }): void;
}

/**
 * Controller for WFABase gizmo interactions
 * Handles user input and delegates to content controllers
 */
export declare class WFABaseController extends HSApp.View.Base.DisplayController {
  /**
   * @param contentOrContents - Single content or array of contents
   * @param context - The 3D view context
   */
  constructor(
    contentOrContents: HSCore.Model.Content | HSCore.Model.Content[],
    context: HSApp.View.T3d.Context
  );

  /** Associated WFABase gizmo listener */
  protected _listener?: WFABase;

  /** Array of controlled content entities */
  protected _contents: HSCore.Model.Content[];

  /** Active context from associated gizmo */
  get activeContext(): WFAActiveContext | undefined;

  /** Active type from associated gizmo */
  get activeType(): string | number | undefined;

  /** Coordinate system from associated gizmo */
  get coord(): Coordinate3 | undefined;

  /**
   * Set the gizmo listener for this controller
   * @param listener - WFABase gizmo instance
   */
  setListener(listener: WFABase): void;

  /**
   * Get the display object controller for single-content scenarios
   * @returns Controller or undefined if multi-content or not found
   */
  protected _getSelectViewObjController(): HSApp.View.Base.DisplayController | undefined;

  /**
   * Compose drag end event parameters
   * @param param - Base drag event parameters
   * @returns Modified parameters with trackingMouse enabled
   */
  composedragendparam(param: DragEventParam): DragEventParam;
}