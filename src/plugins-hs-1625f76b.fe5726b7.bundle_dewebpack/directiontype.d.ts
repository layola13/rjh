/**
 * Direction types for content resizing operations
 * Bit flags representing different directional constraints
 */
export enum DirectionType {
  /** Left direction (X-axis negative) */
  left = 2,
  /** Right direction (X-axis positive) */
  right = 4,
  /** Bottom direction (Z-axis negative) */
  bottom = 8,
  /** Top direction (Z-axis positive) */
  top = 16,
  /** Front direction (Y-axis negative) */
  front = 32,
  /** Back direction (Y-axis positive) */
  back = 64,
}

/**
 * 3D vector representation
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D vector representation
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * Entity transform properties
 */
export interface Transform {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  rotation: number;
}

/**
 * Size dimensions
 */
export interface Size {
  x: number;
  y: number;
  z: number;
}

/**
 * Size range configuration
 */
export interface SizeRange {
  width: SizeRangeItem;
  depth: SizeRangeItem;
  height: SizeRangeItem;
}

/**
 * Individual size range item
 */
export interface SizeRangeItem {
  editable: boolean;
  min?: number;
  max?: number;
}

/**
 * Custom size configuration
 */
export interface CustomizeSize {
  enableScale: boolean;
  step: number;
  xSize: ScalableSize;
  ySize: ScalableSize;
  zSize: ScalableSize;
}

/**
 * Scalable size configuration
 */
export interface ScalableSize {
  isScalable: boolean;
  range?: [number, number];
}

/**
 * Drag event data
 */
export interface DragEventData {
  offset?: [number, number, number];
  event: MouseEvent | TouchEvent;
}

/**
 * Snapping configuration
 */
export interface SnappingConfig {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  notZ: boolean;
  freeMove: boolean;
  manipulationType?: string;
}

/**
 * Entity state snapshot
 */
export interface EntityState {
  entity: any;
  scale: Vector3;
  position: Vector3;
  length: Vector3;
  size: Vector3;
}

/**
 * Outline object with vertical bounds
 */
export interface OutlineObject {
  id: string;
  outline: Vector2[];
  bottom: number;
  top: number;
}

/**
 * Snap point with distance
 */
export interface SnapPoint {
  point: Vector2;
  dist: number;
}

/**
 * Adjust result containing size changes
 */
export interface AdjustResult {
  newSize: Size;
  oldSize: Size;
  offsetPosition: Vector3;
}

/**
 * Handles the core resizing logic for content entities
 * Manages size constraints, snapping, and coordinate transformations
 */
export class ResizeContentHandler {
  /** Direction type flags */
  directionType: number;
  /** Content entity being resized */
  content: any;
  /** Resize direction vector */
  direction: Vector3;
  /** Whether the handler is in an invalid state */
  inVaild: boolean;
  /** Size range constraints */
  resizeRange: SizeRange;
  /** Original transform before resize */
  originTransform: Transform;
  /** Content rotation matrix */
  contentRotMat: any;
  /** Snap edges for alignment */
  snapEdges: any[] | null;
  /** Snap contours for boundary detection */
  snapContours: Vector2[][] | null;
  /** Room containing the content */
  room: any;
  /** Content outline polygon */
  contentOutline: Vector2[];
  /** Stored entity states for undo */
  oldStates: Record<string, EntityState>;

  /**
   * Creates a new resize handler
   * @param content - The content entity to resize
   * @param direction - The direction vector for resizing
   */
  constructor(content: any, direction: Vector3);

  /**
   * Prepares the handler for resize operations
   * Initializes snap data, rotation matrices, and cached geometry
   * @returns Success status
   */
  getReady(): boolean;

  /**
   * Calculates offset value considering direction constraints
   * @param offset - Raw offset vector
   * @returns Offset adjusted for direction
   */
  getOffsetValue(offset: Vector3): Vector3;

  /**
   * Converts and clamps offset to valid size range
   * @param offsetValue - Offset to convert
   * @param currentSize - Current dimension size
   * @param range - Valid size range [min, max]
   * @returns Clamped offset value
   */
  private _convertOffset(
    offsetValue: number,
    currentSize: number,
    range: [number, number]
  ): number;

  /**
   * Resizes content by scale factor with snapping
   * @param offset - Scale offset vector
   */
  resizeByScale(offset: Vector3): void;

  /**
   * Resizes content by absolute offset
   * @param offset - Absolute offset vector
   */
  resizeByOffset(offset: Vector3): void;

  /**
   * Commits the resize operation to the transaction system
   */
  execute(): void;

  /**
   * Adjusts content size to meet customization constraints
   * @param customizeSize - Custom size configuration
   * @returns Adjusted sizes and position offset
   */
  adjustContentSize(customizeSize: CustomizeSize | null): AdjustResult;

  /**
   * Calculates position offset based on resize direction
   * @returns Position offset vector
   */
  getPositionOffset(): Vector3;

  /**
   * Cancels the resize operation and resets to origin
   */
  onCancel(): void;

  /**
   * Cleans up resources and references
   */
  onCleanup(): void;

  /**
   * Gets size range description for the content
   * @returns Size range constraints
   */
  getSizeRangeDescription(): SizeRange;

  /**
   * Captures current entity states for undo
   */
  initOldStates(): void;

  /**
   * Gets the current content transform
   * @returns Transform properties
   */
  getContentTransform(): Transform;

  /**
   * Gets the room containing the content
   * @returns Room entity or undefined
   */
  getRoomContentIn(): any;

  /**
   * Applies size to content entity
   * @param size - New size dimensions
   * @returns Actual applied size
   */
  resize(size: Size): Size;

  /**
   * Moves content by offset vector
   * @param offset - Position offset
   */
  moveOffset(offset: Vector3): void;

  /**
   * Resets all entities to their original states
   */
  reset2Origin(): void;

  /**
   * Converts direction vector to direction type flags
   * @param direction - Direction vector
   * @returns Direction type bit flags
   */
  getDirectionType(direction: Vector3): number;

  /**
   * Computes offset considering snapping constraints
   * @param offset - Raw offset vector
   * @param positionOffset - Position offset for transformation
   * @returns Snapped offset vector
   */
  computeOffsetValueBySnapping(
    offset: Vector3,
    positionOffset: Vector3
  ): Vector3;

  /**
   * Gets all snap contours in the scene
   * @returns Array of contour polygons
   */
  getSnapContours(): Vector2[][];

  /**
   * Gets room floor contour
   * @returns Room contour points
   */
  getRoomContour(): Vector2[];

  /**
   * Gets contours of nearby content entities
   * @returns Array of content contours
   */
  getContentContours(): Vector2[][];

  /**
   * Gets snap outline for opening entities
   * @param opening - Opening entity
   * @returns Outline polygon or undefined
   */
  private _getOpeningSnapOuterline(opening: any): Vector2[] | undefined;

  /**
   * Gets opening outline including pocket depth
   * @param opening - Opening entity
   * @param pocketSize - Pocket depth
   * @returns Outline polygon or undefined
   */
  private _getOpeningOutlineIncludePocket(
    opening: any,
    pocketSize: number
  ): Vector2[] | undefined;

  /**
   * Gets outline objects for collision detection
   * @param entity - Entity to get outline from
   * @returns Array of outline objects
   */
  getOutlineObjs(entity: any): OutlineObject[];

  /**
   * Snaps offset to nearby contours
   * @param contours - Array of contour polygons
   * @param offsetValue - Current offset
   * @param directionType - Direction type flags
   * @returns Snapped offset value
   */
  snap2Contours(
    contours: Vector2[][],
    offsetValue: number,
    directionType: number
  ): number;

  /**
   * Snaps Z offset to horizontal planes
   * @param offsetZ - Z offset
   * @param directionType - Direction type flags
   * @returns Snapped Z offset
   */
  snap2ZPlanes(offsetZ: number, directionType: number): number;

  /**
   * Gets model bound line for direction
   * @param outline - Content outline
   * @param directionType - Direction type flag
   * @returns Line segment [start, end]
   */
  getModelBoundLineExt(outline: Vector2[], directionType: number): Vector2[];

  /**
   * Calculates outline with drag offset applied
   * @param sizeOffset - Size change offset
   * @param positionOffset - Position offset
   * @returns Updated outline polygon
   */
  getOutlineWithDragOffsetValue(
    sizeOffset: Vector3,
    positionOffset: Vector3
  ): Vector2[];

  /**
   * Adjusts outline for background wall units with molding
   * @param outline - Outline points to adjust (mutated in place)
   */
  adjustNCPBackgroundWallUnitOutline(outline: Vector2[]): void;
}

/**
 * Command for resizing content in 3D view
 * Manages the complete resize workflow including snapping and undo/redo
 */
export default class ResizeContentCommand {
  /** Content entity being resized */
  content: any;
  /** View name (SVG or 3D) */
  viewName: string;
  /** Resize direction vector */
  direction: Vector3;
  /** Core resize handler */
  resizeHandler: ResizeContentHandler;
  /** Snapping helper for alignment */
  snappingHelper: any;

  /**
   * Creates a resize content command
   * @param content - Content entity to resize
   * @param viewName - Current view name
   * @param direction - Resize direction
   */
  constructor(content: any, viewName: string, direction: any);

  /**
   * Creates the appropriate resize handler
   * @param content - Content entity
   * @returns Resize handler instance
   */
  getResizeHandler(content: any): ResizeContentHandler;

  /**
   * Gets snapping strategies for the content type
   * @param snappingHelper - Snapping helper instance
   * @returns Array of snapping strategies
   */
  private _getSnappingStrategies(snappingHelper: any): any[];

  /**
   * Callback invoked when snapping occurs
   * @param snapOffset - Snap offset [x, y, z]
   */
  private _doSnappingCallback(snapOffset: [number, number, number]): void;

  /**
   * Executes command initialization
   */
  onExecute(): void;

  /**
   * Handles command messages
   * @param message - Message type
   * @param data - Message data
   * @returns Whether to continue command
   */
  onReceive(message: string, data: any): boolean;

  /**
   * Performs snapping during drag
   * @param data - Drag event data
   */
  private _doSnapping(data: DragEventData): void;

  /**
   * Cancels the command
   */
  onCancel(): void;

  /**
   * Cleans up command resources
   */
  onCleanup(): void;

  /**
   * Gets direction from parameters considering view
   * @param direction - Raw direction
   * @param viewName - View name
   * @returns Adjusted direction vector
   */
  private _getDirection(direction: any, viewName: string): Vector3;

  /**
   * Extracts and transforms offset from event data
   * @param data - Drag event data
   * @returns Transformed offset vector
   */
  private _getOffsetValue(data: DragEventData): Vector3;

  /**
   * Gets command description for logging
   * @returns Description string
   */
  getDescription(): string;

  /**
   * Gets command category for logging
   * @returns Category constant
   */
  getCategory(): string;
}

/**
 * Snap to gusset strategy (referenced but not fully defined)
 */
export type SnapToGusset = any;

export { ResizeContentHandler, DirectionType };