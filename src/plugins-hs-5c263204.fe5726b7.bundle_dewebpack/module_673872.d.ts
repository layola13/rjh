/**
 * Drawer dimension gizmo for 3D view
 * Provides visual measurement and positioning tools for drawer components
 */

import { Vector3 } from './367441';
import { WebGLPointMarker, WebGLPointMarkerType } from './390715';

/**
 * Boundary information for drawer entities
 */
interface BoundInfo {
  max: {
    entity: HSCore.Model.Content | undefined;
    position: number | undefined;
  };
  min: {
    entity: HSCore.Model.Content | undefined;
    position: number | undefined;
  };
}

/**
 * 3D point coordinates
 */
interface Point3D {
  x: number | null;
  y: number | null;
  z: number | null;
}

/**
 * Linear dimension data structure
 */
interface LinearDimensionData {
  start: Vector3 | undefined;
  end: Vector3 | undefined;
  intersect?: Vector3;
  line?: unknown;
  param2?: unknown;
}

/**
 * Collision detection result
 */
interface CollisionInfo {
  entity: HSCore.Model.Content | null;
  point: Vector3 | null;
  distance: number | null;
}

/**
 * Raycast hit result
 */
interface RaycastHit {
  node: unknown;
  point: Vector3;
  distance: number;
}

/**
 * Signal event data for value changes
 */
interface ValueChangedEvent {
  data: {
    value: number;
    dim: HSApp.View.T3d.LinearDimension;
  };
}

/**
 * Signal event data for setting changes
 */
interface SettingChangedEvent {
  data: {
    fieldName: string;
    oldValue: unknown;
    value: unknown;
  };
}

/**
 * Signal event data for view activation
 */
interface ViewActivatedEvent {
  data: {
    newView: unknown;
  };
}

/**
 * Main drawer dimension gizmo class
 * Manages visual dimension indicators and positioning for drawer components in 3D space
 */
export default class DrawerDimensionGizmo extends HSApp.View.Base.Gizmo {
  /** Whether the board is added to the cabinet */
  isAddedBoard: boolean;
  
  /** The drawer content being measured */
  content: HSCore.Model.Content;
  
  /** Boundary information for the drawer */
  boundInfo: BoundInfo;
  
  /** Parent assembly containing the drawer */
  parentPassembly: HSCore.Model.PAssembly;
  
  /** Transformation matrix for the drawer */
  mat: unknown;
  
  /** Whether the gizmo is enabled */
  isEnabled: boolean;
  
  /** Transaction manager for undo/redo */
  transManager: unknown;
  
  /** Room containing the drawer */
  room: HSCore.Model.Room | null;
  
  /** Gizmo manager for the view */
  gizmoManager: unknown;
  
  /** Point markers for visualization */
  pointMarkers: Map<WebGLPointMarkerType, WebGLPointMarker>;
  
  /** Linear dimension lines */
  lineDimensions: Map<HSApp.View.T3d.LinearDimensionType, HSApp.View.T3d.LinearDimension>;
  
  /** Rendering layer */
  layer: unknown;
  
  /** Candidate collision boxes */
  private _candidateBoxes: Array<HSCore.Model.PBox | HSCore.Model.PExtruding>;
  
  /** Whether input editing is enabled */
  isEditableInput: boolean;
  
  /** Swing door clearance value */
  swingDoorClearance?: number;
  
  /** Center top point cache */
  private [WebGLPointMarkerType.centerTop]?: Point3D;
  
  /** Center bottom point cache */
  private [WebGLPointMarkerType.centerBottom]?: Point3D;
  
  /** Dirty flag for rendering updates */
  dirty: boolean;
  
  /** Parent gizmo reference */
  parent: unknown;
  
  /** Controller for dispatching commands */
  controller: DrawerDimensionController;

  constructor(
    context: unknown,
    layer: unknown,
    content: HSCore.Model.Content,
    isEditableInput: boolean
  );

  /**
   * Initialize the gizmo
   */
  init(): void;

  /**
   * Get swing door clearance value from child assemblies
   */
  private _getSwingDoorClearance(): void;

  /**
   * Cleanup resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Activate event listeners
   */
  onActivate(): void;

  /**
   * Deactivate event listeners
   */
  onDeactivate(): void;

  /**
   * Handle view activation changes
   */
  private _onViewActivated(event: ViewActivatedEvent): void;

  /**
   * Handle application setting changes
   */
  private _onSettingChanged(event: SettingChangedEvent): void;

  /**
   * Update point marker positions
   */
  private _updatePointMarkers(markers: Map<WebGLPointMarkerType, WebGLPointMarker>): void;

  /**
   * Get border center point for the drawer
   */
  private _getBorderCenterPoints(
    content: HSCore.Model.Content,
    markerType: WebGLPointMarkerType
  ): Point3D;

  /**
   * Get center to floor point
   */
  private _getCenterToFloor(content: HSCore.Model.Content): Point3D;

  /**
   * Get center points for top or bottom markers
   */
  private _getCenterPoints(
    content: HSCore.Model.Content,
    markerType: WebGLPointMarkerType
  ): Point3D;

  /**
   * Initialize point markers for visualization
   */
  private _initPointMarkers(
    context: unknown,
    layer: unknown,
    content: HSCore.Model.Content
  ): Map<WebGLPointMarkerType, WebGLPointMarker>;

  /**
   * Initialize child dimension gizmos
   */
  private _initChildenGizmo(
    context: unknown,
    layer: unknown,
    content: HSCore.Model.Content
  ): void;

  /**
   * Get boundary information for the drawer
   */
  getDrawerBoundInfo(content: HSCore.Model.Content): BoundInfo;

  /**
   * Convert local coordinates to global coordinates
   */
  localToGlobal(
    entity: HSCore.Model.Content,
    axis: 'x' | 'y' | 'z',
    offset?: number
  ): number;

  /**
   * Calculate direction vector in view space
   */
  directionInView(
    startPoint: Vector3,
    targetPoint: Vector3,
    rotation: number,
    viewSpacePoint: Vector3
  ): Vector3;

  /**
   * Perform raycasting to detect entities
   */
  getDetectedEntity(
    origin: Vector3,
    direction: Vector3,
    nodes: unknown[],
    nodeMap: Map<unknown, unknown>
  ): RaycastHit[] | undefined;

  /**
   * Get collision information for a point
   */
  private _getCollisionInfo(
    content: HSCore.Model.Content,
    parent: HSCore.Model.PAssembly,
    point: Point3D,
    direction: 'top' | 'bottom'
  ): CollisionInfo;

  /**
   * Collect all boards in the cabinet for collision detection
   */
  private _collectBoardInCabinet(
    assembly: HSCore.Model.PAssembly,
    excludeContent?: HSCore.Model.Content
  ): void;

  /**
   * Get the top-level drawer assembly
   */
  private _getTopDrawerPassembly(
    entity: HSCore.Model.Content | undefined
  ): HSCore.Model.PAssembly | undefined;

  /**
   * Get linear dimension data by type
   */
  getLinearDimensionDataByType(
    dimensionType: HSApp.View.T3d.LinearDimensionType
  ): LinearDimensionData | undefined;

  /**
   * Handle value change events from dimensions
   */
  onValueChanged(event: ValueChangedEvent): void;

  /**
   * Update all dimension data
   */
  updateDimensionData(): void;

  /**
   * Mark gizmo for update
   */
  update(): void;

  /**
   * Show the gizmo
   */
  show(): void;

  /**
   * Hide the gizmo
   */
  hide(): void;

  /**
   * Handle content field changes
   */
  private _onContentFieldChange(): void;

  /**
   * Draw/update the gizmo
   */
  draw(): void;
}

/**
 * Controller for drawer dimension positioning commands
 * Handles user input and dispatches position change commands
 */
declare class DrawerDimensionController extends HSApp.View.Base.DisplayController {
  /** The drawer content being controlled */
  content: HSCore.Model.Content;
  
  /** Current dimension being edited */
  dim?: HSApp.View.T3d.LinearDimension;

  constructor(content: HSCore.Model.Content, context: unknown);

  /**
   * Move the drawer to a new position
   */
  private _move(offset: Point3D): void;

  /**
   * Dispatch value change command
   */
  dispatch(event: ValueChangedEvent): void;
}