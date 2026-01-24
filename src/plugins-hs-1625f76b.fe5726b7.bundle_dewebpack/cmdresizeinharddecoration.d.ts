/**
 * Direction types for resizing hard decoration content
 * Represents different directional constraints for resize operations
 */
export enum DirectionType {
  /** No direction constraint */
  none = 0,
  /** Left direction (negative X axis) */
  left = 2,
  /** Right direction (positive X axis) */
  right = 4,
  /** Bottom direction (negative Z axis) */
  bottom = 8,
  /** Top direction (positive Z axis) */
  top = 16,
  /** Front direction (negative Y axis) */
  front = 32,
  /** Back direction (positive Y axis) */
  back = 64
}

/**
 * Saved state of a content entity during resize operations
 */
interface SavedContentState {
  /** The content entity being modified */
  content: any; // HSCore.Model content type
  /** Original position before resize */
  position: Vector3;
  /** Original scale values (x, y, z) */
  scale: Vector3;
  /** Original rotation values in degrees (x, y, z) */
  rotation: Vector3;
  /** Original dimensions (x, y, z) */
  length: Vector3;
}

/**
 * Result of a transform operation
 */
interface TransformResult {
  /** The content entity being transformed */
  content: any;
  /** New scale values */
  scale: Vector3;
  /** New position */
  position: Vector3;
}

/**
 * Scale range constraints for resize operations
 */
interface ResizeRange {
  /** Allowed X-axis scale range [min, max] */
  xScale?: [number, number];
  /** Allowed Y-axis scale range [min, max] */
  yScale?: [number, number];
  /** Allowed Z-axis scale range [min, max] */
  zScale?: [number, number];
}

/**
 * Parameters for drag/resize events
 */
interface DragEventParams {
  /** Offset values [x, y, z] for the drag operation */
  offset?: [number, number, number];
  /** The underlying DOM/input event */
  event?: { ctrlKey?: boolean };
}

/**
 * Snapping configuration options
 */
interface SnappingOptions {
  /** Maximum distance for snap behavior */
  snapOffset: number;
  /** Whether to enable auto-fit during snapping */
  autoFitEnable: boolean;
  /** Whether to ignore snap offset constraints */
  ignoreSnapOffset: boolean;
  /** Whether to ignore Z-axis snapping */
  notZ: boolean;
  /** Whether free move mode is enabled */
  freeMove?: boolean;
  /** Type of manipulation for context-specific snapping */
  manipulationType?: string;
}

/**
 * Command for resizing hard decoration content in 3D view
 * Handles interactive resize operations with snapping, constraints, and multi-content support
 */
export declare class CmdResizeInHardDecoration {
  /**
   * Creates a new resize command instance
   * @param contents - Single content entity or array of entities to resize
   * @param direction - Direction vector indicating resize direction
   * @param baseLength - Base dimensions for multi-content resize operations
   * @param position - Base position for calculating relative offsets
   */
  constructor(
    contents: any | any[],
    direction: Vector3,
    baseLength: Vector3,
    position: Vector3
  );

  /** Content entities being resized */
  private _contents: any[];
  
  /** Primary content entity (first in the array) */
  private _firstContent: any;
  
  /** Allowed scale range constraints */
  private _resizeRange?: ResizeRange;
  
  /** Saved original state of all content entities */
  private _saved: SavedContentState[];
  
  /** Direction vector for resize operation */
  private _direction: Vector3;
  
  /** Computed direction type flags */
  private _directionType: DirectionType;
  
  /** Rotation matrix of the content for coordinate transformation */
  private _contentRotMat: Matrix4;
  
  /** Base dimensions for multi-content operations */
  private _baseLength: Vector3;
  
  /** Base position for calculating relative offsets */
  private _position: Vector3;
  
  /** Active transform request handle */
  private _resizeRequest?: any;
  
  /** Helper for snapping calculations */
  snappingHelper?: any;
  
  /** Current outline of the content being resized */
  contentOutline?: Vector2[];
  
  /** Snap target contours from room and nearby content */
  snapContours?: any[];
  
  /** Room containing the content */
  room?: any;
  
  /** Whether operating in 2D mode */
  private _is2D: boolean;
  
  /** Whether out-of-range tip has been shown */
  private _showOutOfRangeTip: boolean;

  /**
   * Initialize command execution
   * Saves original data, sets up snapping, and creates transform request
   */
  onExecute(): void;

  /**
   * Handle incoming events during resize operation
   * @param eventType - Type of event (dragstart, dragmove, dragend, etc.)
   * @param params - Event parameters containing offset and other data
   * @returns Whether the event was handled
   */
  onReceive(eventType: string, params: DragEventParams): boolean;

  /**
   * Resize single content by computing new scale and position
   * @param offsetValue - Computed offset vector
   * @returns Transform result with new scale and position
   */
  resizeByScale(offsetValue: Vector3): TransformResult;

  /**
   * Update multiple content entities proportionally
   * @param offsetValue - Computed offset vector
   * @returns Array of transform results for all content
   */
  updateMultipleByScale(offsetValue: Vector3): TransformResult[];

  /**
   * Adjust content size to match customization constraints and snap to step values
   * @returns Transform result if adjustment is needed, undefined otherwise
   */
  adjustContentSize(): TransformResult | undefined;

  /**
   * Reset first content entity to its original saved state
   */
  resetFirstContent2Origin(): void;

  /**
   * Get command description for logging
   * @returns Description string
   */
  getDescription(): string;

  /**
   * Get command category for logging
   * @returns Category constant
   */
  getCategory(): string;

  /**
   * Check if a direction flag is active
   * @param flags - Current direction flags
   * @param testFlag - Flag to test
   * @returns Whether the flag is set
   */
  private isTurnOn(flags: DirectionType, testFlag: DirectionType): boolean;

  /**
   * Compute direction type from direction vector
   * @returns Direction type flags
   */
  private _getDirectionType(): DirectionType;

  /**
   * Validate event parameters
   * @param params - Event parameters to validate
   * @returns Whether parameters are valid
   */
  private _checkParamValid(params: DragEventParams): boolean;

  /**
   * Perform resize operation based on event parameters
   * @param params - Drag event parameters
   */
  private _resize(params: DragEventParams): void;

  /**
   * Finalize and commit the resize command
   */
  private _terminateCmd(): void;

  /**
   * Extract and transform offset values from event parameters
   * @param params - Drag event parameters
   * @returns Offset vector in content local space
   */
  private _getOffsetValue(params: DragEventParams): Vector3;

  /**
   * Save original state of all content entities
   */
  private _saveOriginalData(): void;

  /**
   * Initialize snapping helper and strategies
   */
  private _initSnapping(): void;

  /**
   * Get snapping strategies for the current operation
   * @param helper - Snapping helper instance
   * @returns Array of snapping strategy instances
   */
  private _getSnappingStrategies(helper: any): any[];

  /**
   * Perform snapping calculations during drag
   * @param params - Drag event parameters
   */
  private _doSnapping(params: DragEventParams): void;

  /**
   * Compute offset value with snapping adjustments
   * @param offsetValue - Raw offset vector
   * @param positionOffset - Position offset for outline calculation
   * @returns Adjusted offset vector
   */
  private _computeOffsetValueBySnapping(
    offsetValue: Vector3,
    positionOffset: Vector3
  ): Vector3;

  /**
   * Snap offset value to nearby contours
   * @param contours - Array of contour curves to snap to
   * @param offsetValue - Current offset value
   * @param directionType - Direction type for snap calculation
   * @returns Adjusted offset value
   */
  private _snap2Contours(
    contours: any[],
    offsetValue: number,
    directionType: DirectionType
  ): number;

  /**
   * Snap Z-axis offset to horizontal planes (floor, ceiling, content)
   * @param offsetValue - Current Z offset
   * @param directionType - Direction type (top or bottom)
   * @returns Adjusted Z offset
   */
  private snap2ZPlanes(
    offsetValue: number,
    directionType: DirectionType
  ): number;

  /**
   * Get content outline with applied drag offset
   * @param offsetValue - Offset in local space
   * @param worldOffset - Offset in world space
   * @returns Array of outline corner points
   */
  private getOutlineWithDragOffsetValue(
    offsetValue: Vector3,
    worldOffset: Vector3
  ): Vector2[];

  /**
   * Get all snap target contours (room + nearby content)
   * @returns Array of contour arrays
   */
  private _getSnapContours(): any[][];

  /**
   * Get room boundary contour
   * @returns Room outline points
   */
  private _getRoomContour(): Vector2[];

  /**
   * Get contours from nearby content entities
   * @returns Array of content contours
   */
  private _getContentContours(): any[][];

  /**
   * Get snap outline for an opening (door/window) including pocket depth
   * @param opening - Opening entity
   * @returns Outline points or undefined
   */
  private _getOpeningSnapOuterline(opening: any): Vector2[] | undefined;

  /**
   * Calculate opening outline including pocket depth
   * @param opening - Opening entity
   * @param pocketDepth - Depth of the pocket/frame
   * @returns Outline points or undefined
   */
  private _getOpeningOutlineIncludePocket(
    opening: any,
    pocketDepth: number
  ): Vector2[] | undefined;

  /**
   * Extract boundary line for a specific direction
   * @param outline - Content outline points
   * @param directionType - Direction to extract
   * @returns Two points defining the boundary line
   */
  private _getModelBoundLineExt(
    outline: Vector2[],
    directionType: DirectionType
  ): [Vector2, Vector2] | [];

  /**
   * Get position offset multiplier based on direction
   * Used to determine which side of the content is being resized
   * @returns Offset multiplier vector (-0.5, 0, or 0.5 per axis)
   */
  private _getPositionOffset(): Vector3;

  /**
   * Transform offset value based on direction vector
   * @param offset - Raw offset vector
   * @returns Offset value aligned with resize direction
   */
  private getOffsetValue(offset: Vector3): Vector3;

  /**
   * Get saved state of the first content entity
   * @returns Saved state or undefined
   */
  private _getFirstOriginData(): SavedContentState | undefined;

  /**
   * Show out-of-range warning tip if needed
   * @param isOutOfRange - Whether content is outside allowed range
   */
  private _showTips(isOutOfRange: boolean): void;

  /**
   * Create transform request for managing undo/redo
   */
  private _createMoveRequest(): void;
}