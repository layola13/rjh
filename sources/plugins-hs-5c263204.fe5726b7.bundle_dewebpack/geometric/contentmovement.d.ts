/**
 * Content movement gizmo and controller for 3D content manipulation
 * Provides directional movement indicators and interaction for content positioning
 */

// ==================== Type Definitions ====================

/**
 * Active type for content movement directions
 */
type ActiveType = 'left' | 'right' | 'near' | 'far';

/**
 * 3D vector coordinates
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * SVG path style configuration
 */
interface SVGPathStyle {
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeOpacity?: number;
}

/**
 * SVG path data with user metadata
 */
interface SVGPath {
  userData: {
    style: SVGPathStyle;
  };
  subPaths: SVGSubPath[];
  toShapes(isCCW: boolean): THREE.Shape[];
}

/**
 * SVG sub-path for stroke rendering
 */
interface SVGSubPath {
  getPoints(): THREE.Vector2[];
}

/**
 * Loaded SVG data structure
 */
interface SVGData {
  paths: SVGPath[];
}

/**
 * Cached mesh data containing SVG information
 */
interface MeshData {
  data: SVGData;
}

/**
 * Built mesh components for gizmo rendering
 */
interface MeshComponents {
  mesh: p.Node;
  strokeMesh: p.Node;
}

/**
 * Drag event parameters for content movement
 */
interface DragEventParams {
  constraintInRoom?: boolean;
  moveby?: string;
  moveDir?: Vector3D;
  linearMove?: boolean;
  offset?: [number, number, number];
  trackingMouse?: boolean;
}

/**
 * Active context for managing gizmo interaction states
 */
interface ActiveContext {
  active?: ActiveType;
  hoverType?: ActiveType;
  signalChange: HSCore.Util.Signal;
  setActive(type: ActiveType | undefined): void;
}

/**
 * Content model interface with position and size properties
 */
interface ContentModel extends HSCore.Model.Base {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  signalFieldChanged: HSCore.Util.Signal;
  signalDirty: HSCore.Util.Signal;
  getUniqueParent(): HSCore.Model.Layer;
}

/**
 * Camera model for view calculations
 */
interface CameraModel {
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
  type: HSCore.Model.CameraTypeEnum;
  view_type: HSCore.Model.CameraViewTypeEnum;
  zoom: number;
}

/**
 * Floorplan context for scene management
 */
interface FloorplanContext {
  active_camera: CameraModel;
  scene: {
    activeLayer: HSCore.Model.Layer;
    getLayerAltitude(layer: HSCore.Model.Layer): number;
  };
}

/**
 * Application context interface
 */
interface ApplicationContext {
  floorplan: FloorplanContext;
  cmdManager: {
    current?: { type: string };
    signalCommandTerminated: HSCore.Util.Signal;
  };
  signalCameraChangeStart: HSCore.Util.Signal;
  signalCameraChangeEnd: HSCore.Util.Signal;
  getActive3DView(): {
    displayList: Record<string, { node: p.Node }>;
  };
  activeEnvironmentId: string;
}

// ==================== ContentMovement Class ====================

/**
 * Content movement gizmo for visual directional movement indicators
 * Displays arrows that allow users to move content along specific axes
 */
export declare class ContentMovement extends HSApp.View.T3d.Gizmo {
  /** Static cached mesh data loaded from SVG */
  private static _meshData: MeshData;

  /** The content model being controlled */
  readonly content: ContentModel;

  /** Current rotation angle in radians */
  readonly rotation: number;

  /** Active movement type (direction) */
  readonly activeType: ActiveType;

  /** Active context for state management */
  readonly activeContext: ActiveContext;

  /** Maximum bounding dimension of the content */
  readonly contentBoundingLength: number;

  /** Whether position updates are temporarily suspended */
  positionUpdateSuspended: boolean;

  /** Scale factor for X-axis (width) */
  scaleX: number;

  /** Scale factor for Y-axis (height) */
  scaleY: number;

  /** Scale factor for radius */
  scaleRadius: number;

  /** Front direction vector in local space */
  frontDirectionVector: Vector3D;

  /** Arrow mesh node */
  arrowMesh: p.Node;

  /** Move button mesh node */
  moveBtn: p.Node;

  /** Signal hook for event subscriptions */
  signalHook1: HSCore.Util.SignalHook;

  /** Whether gizmo is hidden during camera transitions */
  private _hideFromCameraChanging: boolean;

  /**
   * Creates a content movement gizmo
   * @param entity - The entity model
   * @param layer - The 3D layer
   * @param rotation - Rotation angle in radians
   * @param content - The content model to control
   * @param boundingLength - Optional bounding box size
   * @param controller - Optional custom controller
   * @param activeType - Movement direction type
   * @param activeContext - Active state context
   */
  constructor(
    entity: HSCore.Model.Base,
    layer: HSApp.View.T3d.Layer,
    rotation: number,
    content: ContentModel,
    boundingLength: number | undefined,
    controller: ContentMovementController | undefined,
    activeType: ActiveType,
    activeContext: ActiveContext
  );

  /**
   * Loads SVG data from a file path
   * @param svgPath - Path to SVG file
   * @returns Loaded mesh data structure
   */
  static loadSVG(svgPath: string): MeshData;

  /**
   * Handles camera change start event
   * @private
   */
  private _onCameraChangeStart(): void;

  /**
   * Handles camera change end event
   * @private
   */
  private _onCameraChangeEnd(): void;

  /**
   * Sets visibility during camera transitions
   * @param hidden - Whether to hide the gizmo
   */
  setHideFromCameraChanging(hidden: boolean): void;

  /**
   * Builds mesh geometry from SVG data
   * @param svgData - Loaded SVG data
   * @returns Mesh components (fill and stroke)
   * @private
   */
  private _buildMesh(svgData: SVGData): MeshComponents;

  /**
   * Sets opacity for all mesh materials
   * @param node - Root node containing meshes
   * @param opacity - Opacity value (0-1)
   * @private
   */
  private _setMeshOpacity(node: p.Node, opacity: number): void;

  /**
   * Sets color for all mesh materials
   * @param node - Root node containing meshes
   * @param color - Color as hex number
   * @private
   */
  private _setMeshColor(node: p.Node, color: number): void;

  /**
   * Initializes mesh geometry and hierarchy
   * @private
   */
  private _initMesh(): void;

  /**
   * Sets default color based on active type
   * @param node - Node to colorize
   */
  setArrowDefultColor(node: p.Node): void;

  /**
   * Sets active (highlighted) color based on active type
   * @param node - Node to colorize
   */
  setArrowActiveColor(node: p.Node): void;

  /**
   * Cleanup resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Shows the gizmo and updates its transform
   */
  show(): void;

  /**
   * Hides the gizmo
   */
  hide(): void;

  /**
   * Handles active state changes (hover, selection)
   * @param event - Change event data
   * @private
   */
  private _onActiveChange(event: unknown): void;

  /**
   * Calculates angle between content and camera in XY plane
   * @returns Angle in radians (0 to 2π)
   * @private
   */
  private _getAngle(): number;

  /**
   * Calculates vertical angle between content and camera
   * @returns Angle in radians (0 to 2π)
   * @private
   */
  private _getAngleY(): number;

  /**
   * Calculates appropriate scale factors based on camera distance and type
   * @returns Tuple of [base scale, Y scale, radius scale]
   * @private
   */
  private _updateGizmoScale(): [p.Vector3, p.Vector3, p.Vector3];

  /**
   * Determines if gizmo arrow is facing towards camera
   * @returns True if arrow is visible from camera perspective
   * @private
   */
  private _isTowardsCamra(): boolean;

  /**
   * Updates visibility and scale based on camera position
   * @private
   */
  private _updateGizmoShow(): void;

  /**
   * Updates mesh transformation (position, rotation, scale)
   */
  updateMesh(): void;

  /**
   * Calculates movement direction vector in world space
   * @returns Normalized direction vector
   */
  getDirection(): p.Vector3;

  /**
   * Calculates gizmo world position offset from content center
   * @returns World position for gizmo placement
   * @private
   */
  private _getPosition(): p.Vector3;

  /**
   * Calculates base rotation quaternion from content rotation
   * @returns Base rotation without camera-facing adjustment
   * @private
   */
  private _getBaseRotation(): p.Quaternion;

  /**
   * Calculates final rotation to face camera
   * @returns Camera-facing rotation quaternion
   * @private
   */
  private _getRotation(): p.Quaternion;

  /**
   * Handles content property changes
   * @private
   */
  private _onContentFieldChange(): void;

  /**
   * Gets current content position in world space
   */
  get contentPosition(): THREE.Vector3;

  /**
   * Renders the gizmo with visibility and state updates
   */
  draw(): void;

  /**
   * Handles mouse move over gizmo
   * @returns False to prevent event propagation
   */
  onMouseMove(): boolean;

  /**
   * Handles mouse leaving gizmo area
   * @param event - Mouse event data
   */
  onMouseOut(event: unknown): void;
}

// ==================== ContentMovementController Class ====================

/**
 * Controller for handling content movement interactions
 * Manages drag events and coordinate transformations for directional movement
 */
export declare class ContentMovementController extends HSApp.View.Base.DisplayController {
  /** Movement direction vector */
  direction: THREE.Vector3;

  /** Delegate controller for actual content manipulation */
  defaultController: HSApp.View.T3d.ContentController | HSApp.View.T3d.CustomizedPMInstanceModelController;

  /** Active context for state management */
  activeContext: ActiveContext;

  /** Active movement type */
  activeType: ActiveType;

  /** Private listener reference */
  private _listener: unknown | null;

  /**
   * Creates a content movement controller
   * @param entity - The entity model being controlled
   * @param context - The 3D context
   * @param defaultController - Optional delegate controller
   * @param activeType - Movement direction type
   * @param activeContext - Active state context
   */
  constructor(
    entity: ContentModel | HSCore.Model.CustomizedPMInstanceModel,
    context: HSApp.View.T3d.Context,
    defaultController?: HSApp.View.T3d.ContentController,
    activeType: ActiveType,
    activeContext: ActiveContext
  );

  /**
   * Sets the movement direction vector
   * @param direction - Normalized direction vector
   */
  setDirection(direction: THREE.Vector3): void;

  /**
   * Sets event listener for controller callbacks
   * @param listener - Listener object or null to clear
   */
  setListener(listener: unknown | null): void;

  /**
   * Handles drag start event
   * @param params - Drag event parameters
   * @returns True if drag should proceed
   */
  ondragstart(params: DragEventParams): boolean;

  /**
   * Handles drag end event
   * Tracks analytics for lighting adjustments
   * @returns True if drag completed successfully
   */
  ondragend(): boolean;

  /**
   * Composes drag move parameters with directional constraints
   * @param params - Original drag parameters
   * @returns Modified parameters with linear movement constraint
   */
  composedragmoveparam(params: DragEventParams): DragEventParams;

  /**
   * Composes drag end parameters
   * @param params - Original drag end parameters
   * @returns Modified parameters with tracking enabled
   */
  composedragendparam(params: DragEventParams): DragEventParams;

  /**
   * Handles mouse down event (no-op)
   */
  onmousedown(): void;
}