/**
 * Dimension face type enumeration for content positioning in 3D space
 */
export enum DimensionFaceType {
  /** Center top face */
  centerTop = "centerTop",
  /** Center bottom face */
  centerBottom = "centerBottom",
  /** Center left face */
  centerLeft = "centerLeft",
  /** Center right face */
  centerRight = "centerRight",
  /** Center back face */
  centerBack = "centerBack",
  /** Center front face */
  centerFront = "centerFront"
}

/**
 * Precision configuration for dimension display
 */
export interface PrecisionConfig {
  /** Whether to display only integer values */
  intOnly: boolean;
  /** Fixed unit type for display (e.g., mm, cm, m) */
  fixedUnitType?: string;
  /** Number of digits to display after decimal point */
  fixedDisplayDigits?: number;
}

/**
 * Collision detection result with intersection information
 */
export interface CollisionResult {
  /** Intersection point in 3D space */
  intersect: Vector3;
  /** The collision line segment */
  line: Line3;
  /** Parameter along the first line (0-1) */
  param1: number;
  /** Parameter along the second line (0-1) */
  param2: number;
  /** Type of collision: 'content' or 'wall' */
  type: 'content' | 'wall';
  /** The content object involved in collision (if type is 'content') */
  content?: HSCore.Model.Content;
}

/**
 * Dimension data for linear measurements
 */
export interface LinearDimensionData {
  /** Start point of the dimension line */
  start?: Vector3;
  /** End point of the dimension line */
  end?: Vector3;
  /** Intersection point with obstacles */
  intersect?: Vector3;
  /** The line segment for collision detection */
  line?: Line3;
  /** Parameter along the collision line */
  param2?: number;
  /** Screen bounds of the content */
  bound?: ScreenBounds;
  /** Type of collision */
  collisionType?: 'content' | 'wall';
  /** Content involved in collision */
  content?: HSCore.Model.Content;
}

/**
 * Screen space bounding box
 */
export interface ScreenBounds {
  /** Minimum X coordinate */
  xMin: number;
  /** Maximum X coordinate */
  xMax: number;
  /** Minimum Y coordinate */
  yMin: number;
  /** Maximum Y coordinate */
  yMax: number;
}

/**
 * Bounding points in 2D space
 */
export interface BoundingPoints2D {
  /** Left-top corner point */
  leftTop: Point2D;
  /** Left-bottom corner point */
  leftBottom: Point2D;
  /** Right-top corner point */
  rightTop: Point2D;
  /** Right-bottom corner point */
  rightBottom: Point2D;
}

/**
 * Controller for managing 3D content dimensions and precision positioning
 * Handles dimension display, collision detection, and interactive editing
 */
export declare class ContentDimensionController extends HSApp.View.Base.Gizmo {
  /** Whether dimension display is enabled */
  isEnabled: boolean;
  
  /** The dimension face type this controller is aligned to */
  accordingFace?: DimensionFaceType;
  
  /** Transaction manager for undo/redo operations */
  transManager: TransactionManager;
  
  /** The content object being measured */
  content: HSCore.Model.Content;
  
  /** Point markers displayed at content corners */
  pointMarkers: Map<WebGLPointMarkerType, WebGLPointMarker>;
  
  /** Linear dimension lines for each direction */
  lineDimensions: Map<HSApp.View.T3d.LinearDimensionType, HSApp.View.T3d.LinearDimension>;
  
  /** The room containing the content */
  room?: HSCore.Model.Room;
  
  /** Precision configuration rules */
  private _rules: PrecisionConfig;
  
  /** Detailed precision configuration */
  private _config?: any;
  
  /** Cached room contents for collision detection */
  private _roomContents: HSCore.Model.Content[];

  /**
   * Creates a new ContentDimensionController
   * @param context - The 3D context
   * @param canvas - The canvas element
   * @param content - The content to measure
   * @param accordingFace - Optional face alignment
   * @param controller - Optional parent controller
   */
  constructor(
    context: HSApp.View.T3d.Context,
    canvas: HTMLCanvasElement,
    content: HSCore.Model.Content,
    accordingFace?: DimensionFaceType,
    controller?: ContentDimensionController
  );

  /**
   * Cleanup resources when controller is destroyed
   */
  onCleanup(): void;

  /**
   * Activate the controller and register event listeners
   */
  onActivate(): void;

  /**
   * Deactivate the controller and unregister event listeners
   */
  onDeactivate(): void;

  /**
   * Set precision configuration for dimension display
   * @param config - Configuration source object
   */
  setConfig(config?: any): void;

  /**
   * Iterate over all contents that may collide with current content
   * @param callback - Function to call for each content
   */
  forEachCollisionContent(callback: (content: HSCore.Model.Content) => void): void;

  /**
   * Create marker points at content corners
   * @param center - Center point
   * @param directions - Direction vectors
   * @returns Array of marker positions
   */
  createPointMarker(center: Vector3, directions: Vector3[]): Vector3[];

  /**
   * Get the 8 bounding corner points of the content in 3D space
   * @param content - The content object
   * @returns Array of 8 corner points
   */
  getContentBoundingPoints(content: HSCore.Model.Content): Vector3[];

  /**
   * Get screen space bounding box of the content
   * @param content - The content object
   * @returns Screen space bounds
   */
  getContentScreenBound(content: HSCore.Model.Content): ScreenBounds;

  /**
   * Get the center point of a specific dimension face
   * @param faceType - The face type
   * @returns Center point of the face
   */
  getDimensionFaceCenter(faceType: DimensionFaceType): Vector3 | null;

  /**
   * Get dimension data for a specific linear dimension type
   * @param dimensionType - Type of linear dimension
   * @returns Dimension data including start, end, and collision info
   */
  getLinearDimensionDataByType(dimensionType: HSApp.View.T3d.LinearDimensionType): LinearDimensionData;

  /**
   * Handle dimension value change events
   * @param event - Value change event
   */
  onValueChanged(event: any): void;

  /**
   * Update all dimension data based on current content state
   */
  updateDimensionData(): void;

  /**
   * Mark controller as dirty for redraw
   */
  update(): void;

  /**
   * Show dimension display
   */
  show(): void;

  /**
   * Hide dimension display
   */
  hide(): void;

  /**
   * Draw/update dimension visuals
   */
  draw(): void;

  /**
   * Get offset outline loop for collision detection
   * @param content - Content with outline
   * @param offset - Offset distance
   * @returns Offset polygon
   */
  getContentOffsetOutLineLoop(content: HSCore.Model.Content, offset: number): Polygon;

  /**
   * Check if content collides with a given polygon
   * @param content - Content to check
   * @param polygon - Polygon to test against
   * @returns True if collision detected
   */
  checkContentCollision(content: HSCore.Model.Content, polygon: Point2D[]): boolean;

  /**
   * Event handler for content field changes
   * @private
   */
  private _onContentFieldChange(): void;

  /**
   * Event handler for settings changes
   * @private
   */
  private _onSettingChanged(event: any): void;

  /**
   * Event handler for view activation
   * @private
   */
  private _onViewActivated(event: any): void;

  /**
   * Update point markers to match current content bounds
   * @private
   */
  private _updatePointMarkers(markers: Map<WebGLPointMarkerType, WebGLPointMarker>): void;

  /**
   * Update the cached room containing the content
   * @private
   */
  private _updateContentRoom(): void;

  /**
   * Initialize point markers for content corners
   * @private
   */
  private _initPointMarkers(
    context: HSApp.View.T3d.Context,
    canvas: HTMLCanvasElement,
    content: HSCore.Model.Content
  ): Map<WebGLPointMarkerType, WebGLPointMarker>;

  /**
   * Initialize child gizmo components (dimension lines)
   * @private
   */
  private _initChildenGizmo(
    context: HSApp.View.T3d.Context,
    canvas: HTMLCanvasElement,
    content: HSCore.Model.Content
  ): void;

  /**
   * Refresh bounding data for collision contents
   * @private
   */
  private _refreshContentBound(): void;

  /**
   * Get all contents that collide with the given content
   * @private
   */
  private _getCollisionContents(outline: Point2D[]): HSCore.Model.Content[];

  /**
   * Check if a line is perpendicular to content edges
   * @private
   */
  private _isPerpendicular(content: HSCore.Model.Content, line: Line3): boolean;

  /**
   * Find the closest collision line from a list of contents
   * @private
   */
  private _getClosestCollisionLine(
    contents: HSCore.Model.Content[],
    testLine: Line3
  ): CollisionResult | undefined;

  /**
   * Get collision point between a line and room walls
   * @private
   */
  private _getCollisionPointToWall(line: Line3): CollisionResult | undefined;

  /**
   * Get the height of a room
   * @private
   */
  private _getRoomHeight(room: HSCore.Model.Room): number;

  /**
   * Get the room containing the specified content
   * @private
   */
  private _getRoomContentIn(content: HSCore.Model.Content, rooms?: HSCore.Model.Room[]): HSCore.Model.Room | undefined;

  /**
   * Get 2D bounding points of content
   * @private
   */
  private _getBoundingPoints(content: HSCore.Model.Content): BoundingPoints2D;

  /**
   * Calculate center point between two points
   * @private
   */
  private _getCenterPoint(point1: Vector3, point2: Vector3): Vector3;
}

/**
 * Display controller for managing content dimension interactions
 * Handles user input and updates content position based on dimension changes
 */
export declare class ContentDimensionDisplayController extends HSApp.View.Base.DisplayController {
  /** The content being controlled */
  content: HSCore.Model.Content;

  /**
   * Creates a new ContentDimensionDisplayController
   * @param content - The content to control
   * @param context - The 3D context
   */
  constructor(content: HSCore.Model.Content, context: HSApp.View.T3d.Context);

  /**
   * Dispatch dimension value changes to update content position
   * @param event - Value change event containing new dimension value
   */
  dispatch(event: any): void;

  /**
   * Calculate target position for content based on dimension value
   * @param dimensionData - Dimension line data
   * @param value - New dimension value
   * @returns Target position {x, y}
   */
  targetWithDimValue(dimensionData: LinearDimensionData, value: number): { x: number; y: number };

  /**
   * Move content to new position
   * @private
   */
  private _move(position: { x?: number; y?: number; z?: number }): void;

  /**
   * Get room height
   * @private
   */
  private _getRoomHeight(room: HSCore.Model.Room): number;
}

export default ContentDimensionController;

// Type declarations for external dependencies
declare namespace HSCore.Model {
  class Content {
    ID: string;
    x: number;
    y: number;
    z: number;
    XSize: number;
    YSize: number;
    ZSize: number;
    outline: Point2D[];
    contentType: ContentType;
    host: any;
    signalFieldChanged: Signal;
    signalDirty: Signal;
    localSpaceToModelSpace(point: { x: number; y: number }): Point2D;
    isContentInRoom(room: Room): boolean;
    refreshBoundInternal(): void;
  }

  class Opening extends Content {}
  class Face { getMaster(): any; openings: Opening[]; }
  class Wall {}
  class Room {}
  class ContentType { isTypeOf(type: any): boolean; }
}

declare namespace HSApp.View.T3d {
  class LinearDimension {
    type: LinearDimensionType;
    valueChanged: Signal;
    constructor(
      context: Context,
      canvas: HTMLCanvasElement,
      content: HSCore.Model.Content,
      type: LinearDimensionType,
      ...args: any[]
    );
    cleanup(): void;
    updateDimensionData(data: LinearDimensionData): void;
    onContentFieldChange(): void;
  }

  enum LinearDimensionType {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right",
    front = "front",
    back = "back"
  }

  class Context {
    application: any;
    signalCanvasRectChanged: Signal;
    signalCameraChanged: Signal;
    isActive: boolean;
    needsRendering: boolean;
  }
}

declare class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x?: number, y?: number, z?: number);
  add(v: Vector3): Vector3;
  subtract(v: Vector3): Vector3;
  normalize(): Vector3;
  scaleInPlace(scale: number): this;
  clone(): Vector3;
  copyFrom(v: Vector3): this;
}

declare class Line3 {
  constructor(start: Vector3, end: Vector3);
  start: Vector3;
  end: Vector3;
}

declare class Polygon {
  constructor(points: Point2D[]);
}

interface Point2D {
  x: number;
  y: number;
}

interface Signal {
  listen(handler: Function, context?: any): void;
}

declare enum WebGLPointMarkerType {
  upLeftTop = "upLeftTop",
  upRightTop = "upRightTop",
  downLeftTop = "downLeftTop"
}

declare class WebGLPointMarker {
  type: WebGLPointMarkerType;
  constructor(
    context: HSApp.View.T3d.Context,
    canvas: HTMLCanvasElement,
    content: HSCore.Model.Content,
    type: WebGLPointMarkerType
  );
  init(position: Vector3, markers?: Vector3[]): void;
  updateMesh(): void;
  cleanup(): void;
}