/**
 * Wall dimension management module for displaying and editing wall measurements in 2D view
 */

/**
 * Dimension type enumeration for wall measurements
 */
export enum DimensionType {
  /** Wall length measurement */
  Length = "_length",
  /** Wall height/arc measurement */
  Height = "_height"
}

/**
 * Tolerance value for dimension sorting (in pixels)
 */
export const sortTolerance: number = 5;

/**
 * Minimum dimension length to display (in meters)
 */
export const minDimLength: number = 0.25;

/**
 * Threshold for showing short dimensions based on zoom level
 */
export const showShortDim: number = 200;

/**
 * Offset distance for dimension lines from wall faces (in meters)
 */
export const dimOffsetLength: number = 0.2;

/**
 * Dimension information for a wall segment
 */
export interface DimensionInfo {
  /** The curve representing the dimension line */
  curve: any; // HSCore curve type
  /** ID of the associated wall */
  wallId: string;
  /** Array of keys identifying the dimension */
  keys: string[];
}

/**
 * Prepared dimension data for rendering
 */
export interface PreparedDimensionData {
  /** Array of dimension information objects */
  dimInfos: DimensionInfo[];
  /** Walls with linear geometry */
  lineWalls: any[]; // Wall[]
  /** Walls with arc geometry */
  arcWalls: any[]; // Wall[]
  /** Room face structures */
  roomFaces: any[]; // StructureFace[]
}

/**
 * Dimension-to-key mapping information
 */
export interface DimensionKeyInfo {
  /** The dimension object */
  dimension: any; // Dimension instance
  /** Associated identifier keys */
  keys: string[];
}

/**
 * Configuration options for wall dimensions
 */
export interface WallDimensionOptions {
  /** Font family for dimension text */
  fontFamily: string;
  /** Text color for dimensions */
  fontColor: string;
  /** Font weight for dimension text */
  fontWeight: number;
  /** Area label styling */
  areaLabel: {
    fontSize: number;
  };
  /** Room type label styling */
  roomType: {
    fontSize: number;
  };
}

/**
 * WallDimension class manages the display and interaction of dimension lines for walls
 * in the 2D floor plan view. Handles both linear and arc wall measurements, supports
 * editing dimensions, and manages visibility based on zoom level and view state.
 */
export declare class WallDimension {
  /** Application context reference */
  readonly context: any; // HSApp.View.SVG.Context
  
  /** Layer containing this gizmo */
  readonly layer: any; // Layer instance
  
  /** The floor entity being dimensioned */
  readonly entity: any; // Floor entity
  
  /** Type identifier for this gizmo */
  readonly type: "hsw.view.svg.gizmo.WallDimension";
  
  /** Set of child UI items */
  readonly childItems: Set<any>;
  
  /** Visual and behavior options */
  readonly options: WallDimensionOptions;
  
  /** Whether dimensions need to be redrawn */
  private _selfDirty: boolean;
  
  /** Whether dimensions are currently visible */
  private _visible: boolean;
  
  /** Active dimension objects being displayed */
  private _dimensions: any[]; // Dimension[]
  
  /** Pool of reusable dimension objects */
  private _dimensionCache: any[]; // Dimension[]
  
  /** Horizontal reference line for angle dimensions */
  private _horizontalItem: any; // PathItem
  
  /** Angle/radian dimension display */
  private _radianDim: any; // Dimension
  
  /** Maps dimensions to their associated wall IDs */
  private _dimWallIdMap: Map<any, string>;
  
  /** Maps dimensions to their identifying keys */
  private _dimKeyInfo: DimensionKeyInfo[];
  
  /** Keys of dimensions affected by geometry changes */
  private _geoDirtyKeys: string[];
  
  /** Whether tab key was used for navigation */
  private _tabDirty: boolean;
  
  /** Whether any key is currently pressed */
  private _haskeyDown: boolean;
  
  /** Cached state of short dimension visibility before zoom */
  private _showShortDimWhenZoomStart: boolean | undefined;
  
  /** Timer ID for debounced dimension refresh */
  private _refreshShowDimensionTimerId: number | undefined;
  
  /** Manager for wall joint connections */
  private _wallJointManager: any; // WallJointManager
  
  /** Whether the dimension system is in an invalid state */
  private _invalid: boolean;

  /**
   * Creates a new WallDimension gizmo
   * @param context - The SVG rendering context
   * @param layer - The layer to render dimensions on
   * @param entity - The floor entity to dimension
   */
  constructor(context: any, layer: any, entity: any);

  /**
   * Called when the gizmo is activated
   * Sets up event listeners for selection changes, room updates, settings changes,
   * viewport changes, and view mode switches
   */
  onActivate(): void;

  /**
   * Determines whether dimensions should be drawn
   * @returns True if dimensions can be drawn in current state
   */
  canDraw(): boolean;

  /**
   * Main draw method - triggers dimension rendering if conditions are met
   */
  draw(): void;

  /**
   * Internal draw implementation - prepares and renders all dimension lines
   */
  onDraw(): void;

  /**
   * Called when the gizmo is deactivated
   * Removes all event listeners
   */
  onDeactivate(): void;

  /**
   * Called when cleaning up resources
   * Disposes all dimension objects and UI elements
   */
  onCleanup(): void;

  /**
   * Sets the visibility of dimension lines
   * @param visible - Whether dimensions should be visible
   */
  setVisible(visible: boolean): void;

  /**
   * Sets the invalid state of dimensions
   * @param invalid - Whether dimensions are in an invalid state
   */
  setInvalid(invalid: boolean): void;

  /**
   * Hides all dimension lines and related UI
   */
  hide(): void;

  /**
   * Shows all dimension lines and related UI
   */
  show(): void;

  /**
   * Marks dimensions as dirty and needing redraw
   * @param keepState - Whether to preserve geometry dirty state
   */
  selfDirty(keepState?: boolean): void;

  /**
   * Clears all dimension displays and internal state
   */
  private _clear(): void;

  /**
   * Prepares dimension data from wall and room geometry
   * @returns Prepared dimension data or undefined if no valid geometry
   */
  private _prepareHandle(): PreparedDimensionData | undefined;

  /**
   * Processes dimension info for center-line dimension mode
   * @param data - Prepared dimension data
   */
  private _centerDimInfoHandle(data: PreparedDimensionData): void;

  /**
   * Calculates endpoint for center-line dimension mode
   * @param wall - The wall to measure
   * @param isStart - Whether to get start point (vs end point)
   * @returns The calculated endpoint
   */
  private _getEndPointOnMidMode(wall: any, isStart: boolean): any; // Vector2

  /**
   * Processes dimension info for inner/face dimension mode
   * @param data - Prepared dimension data
   * @param selectedWallId - ID of currently selected wall
   */
  private _innerDimInfoHandle(data: PreparedDimensionData, selectedWallId: string): void;

  /**
   * Merges overlapping or adjacent dimension infos
   * @param dimInfos - Array of dimension information
   * @param selectedWallId - ID of selected wall for priority handling
   * @returns Merged dimension infos
   */
  private _mergeDimensionInfos(dimInfos: DimensionInfo[], selectedWallId: string): DimensionInfo[];

  /**
   * Filters out duplicate dimension infos
   * @param dimInfos - Array of dimension information
   * @returns Filtered unique dimension infos
   */
  private _filterSameDimensionInfos(dimInfos: DimensionInfo[]): DimensionInfo[];

  /**
   * Determines which dimension keys should be selectable/editable
   * @param wall - The currently selected wall
   * @param data - Prepared dimension data
   * @returns Set of editable dimension keys
   */
  private _selectHandle(wall: any, data: PreparedDimensionData): Set<string>;

  /**
   * Creates or updates dimension UI objects from dimension info
   * @param dimInfos - Array of dimension information
   * @param editableKeys - Set of keys that should be editable
   * @param selectedWall - Currently selected wall
   */
  private _createDimensions(dimInfos: DimensionInfo[], editableKeys: Set<string>, selectedWall: any): void;

  /**
   * Handles wall repositioning when dimension value is changed
   * @param newValue - New dimension value entered by user
   * @param dimension - The dimension object being edited
   * @param wall - The wall to reposition
   */
  private _repositeWall(newValue: number, dimension: any, wall: any): void;

  /**
   * Changes focus between editable dimensions (tab navigation)
   * @param dimensions - Array of all dimensions
   * @param currentDimension - Currently focused dimension
   */
  private _changeWalls(dimensions: any[], currentDimension: any): void;

  /**
   * Updates wall position based on new dimension length
   * @param wall - The wall to move
   * @param newLength - New length in millimeters
   * @param dimensionCurve - The dimension curve being edited
   * @param dimension - The dimension object
   */
  private _changeWallPosition(wall: any, newLength: number, dimensionCurve: any, dimension: any): void;

  /**
   * Updates wall angle based on new dimension value
   * @param wall - The wall to rotate
   * @param newAngle - New angle in degrees
   * @param dimensionCurve - The dimension arc curve
   */
  private _changeWallAngel(wall: any, newAngle: number, dimensionCurve: any): void;

  /**
   * Attempts to merge walls if dimension change reduces length to zero
   * @param wall - The wall being modified
   * @param pointType - Which end point is being moved
   * @param offset - Length offset being applied
   * @returns True if walls were merged
   */
  private _mergeWalls(wall: any, pointType: any, offset: number): boolean;

  /**
   * Moves a wall endpoint by a specified distance
   * @param wall - The wall to modify
   * @param offset - Distance to move the point
   * @param pointType - Which point to move (from/to/between)
   */
  private _moveWallPoint(wall: any, offset: number, pointType?: any): void;

  /**
   * Moves a wall endpoint by a vector offset
   * @param wall - The wall to modify
   * @param offset - Vector offset to apply
   * @param pointType - Which point to move
   */
  private _moveWallPointByOffset(wall: any, offset: any, pointType: any): void;

  /**
   * Moves an entire wall by translating it
   * @param wall - The wall to move
   * @param offset - Distance to move
   * @param dimensionCurve - Reference curve for direction
   */
  private _moveWall(wall: any, offset: number, dimensionCurve: any): void;

  /**
   * Determines which wall endpoint should be moved for a dimension edit
   * @param wall - The wall being edited
   * @returns The point type to move
   */
  private _determineMovedPointType(wall: any): any; // JointPointType

  /**
   * Extracts dimension curves from a structural face
   * @param face - The face to extract curves from
   * @returns Array of curves with IDs
   */
  getFaceCurves(face: any): Array<{ curve: any; id: string }>;
}