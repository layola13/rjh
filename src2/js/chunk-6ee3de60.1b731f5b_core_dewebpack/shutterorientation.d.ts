/**
 * Shutter orientation module
 * Manages shutter/mullion creation and orientation for anti-theft window systems
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Shutter orientation enumeration
 * Defines possible orientations for shutter elements
 */
export enum ShutterOrientation {
  /** Horizontal orientation */
  horizon = "horizon",
  /** Vertical orientation */
  vertical = "vertical"
}

/**
 * Point interface representing 2D coordinates
 */
interface Point {
  x: number;
  y: number;
  clone(): Point;
  translate(vector: Vector): Point;
  rotate(angle: number, center: Point): Point;
  equalTo(other: Point): boolean;
}

/**
 * Vector interface representing 2D direction
 */
interface Vector {
  x: number;
  y: number;
  clone(): Vector;
  invert(): Vector;
  rotate90CW(): Vector;
  rotate(angle: number): Vector;
}

/**
 * Line interface representing geometric line
 */
interface Line {
  pt: Point;
  norm: Vector;
}

/**
 * Bounding box interface
 */
interface Box {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  center: Point;
}

/**
 * Polygon interface
 */
interface Polygon {
  isEmpty: boolean;
  box: Box;
  clone(): Polygon;
  translate(vector: Vector): Polygon;
  rotate(angle: number, center: Point): Polygon;
}

/**
 * Hardware manager interface for handling window hardware
 */
interface HardwareManager {
  /** Handle position point */
  handle: {
    position: Point;
  };
  /** Whether opens to the left */
  isLeftOpen: boolean;
  /** Whether opens downward */
  isDownOpen: boolean;
}

/**
 * Frame interface representing window frame
 */
interface Frame {
  type: ShapeType;
  offvec: Vector;
  polygon: Polygon;
  innerPoly: Polygon[];
  holeHeight: number;
  hardwareManager: HardwareManager;
  topFrame: {
    profileSizeManager: ProfileSizeManager;
  };
  children: ReadonlyArray<unknown>;
  showHandleBars: boolean;
  add(child: Bar): void;
  remove(child: Bar): void;
}

/**
 * Profile size manager for retrieving dimension values
 */
interface ProfileSizeManager {
  get(shapeType: ShapeType): number;
  antiTheftMullion: number;
}

/**
 * Shape type enumeration
 */
export enum ShapeType {
  AntiTheftMullion = "AntiTheftMullion",
  AntiTheftGap = "AntiTheftGap",
  AntiTheftHandleW = "AntiTheftHandleW"
}

/**
 * Hit test result enumeration
 */
export enum HitResult {
  None = 0,
  Bar = 1
}

/**
 * Polygon ID reference
 */
interface PolyId {
  /** Index in collection */
  idx: number;
  /** Position flag */
  pos: number;
}

/**
 * Splitter object representing split line
 */
declare class SplitterObj {
  polyId: PolyId;
  line: Line;
}

/**
 * Splitter agent for managing polygon splits
 */
declare class SplitterAgent {
  constructor(host: Frame, where: ShapeType);
  
  subs: unknown[];
  lines: SplitterObj[];
  dockMgr: {
    clear(): void;
  };
  allProfileSize: Map<ShapeType, number>;
  
  findPoly(id: number): Polygon | undefined;
  updatePoly(): Polygon[];
  hitTest(point: Point): boolean;
  translate(vector: Vector): void;
}

/**
 * Bar element representing a physical mullion/bar
 */
declare class Bar {
  constructor(polygon: Polygon, where: ShapeType);
  
  where: ShapeType;
  highlighted: boolean;
  
  draw(context: CanvasRenderingContext2D): void;
  translate(vector: Vector): void;
  hitTest(point: Point): boolean;
  highlight(active: boolean): void;
}

/**
 * Find handle callback type
 * Returns the frame containing handle at given polygon ID
 */
type FindHandleCallback = (polyId: number) => Frame | undefined;

// ============================================================================
// ShutterManager Class
// ============================================================================

/**
 * Manages shutter/mullion elements for anti-theft window systems
 * Handles creation, positioning, orientation, and interaction of shutters
 */
export declare class ShutterManager {
  /**
   * Creates a new ShutterManager instance
   * @param host - The parent frame containing this shutter
   * @param polyId - Polygon identifier
   * @param findHandle - Callback to find frame by polygon ID
   */
  constructor(host: Frame, polyId: number, findHandle: FindHandleCallback);

  /** Host frame reference */
  readonly host: Frame;
  
  /** Polygon identifier */
  readonly polyId: number;
  
  /** Callback to find handle frame */
  readonly findHandle: FindHandleCallback;
  
  /** Current shutter orientation */
  orientation: ShutterOrientation;
  
  /** Rotation angle for vertical orientation (default: π/2) */
  readonly verticalRotateAngle: number;
  
  /** Shape type identifier */
  readonly where: ShapeType;
  
  /** Gap between shutter elements */
  readonly gap: number;
  
  /** Handle width dimension */
  readonly handleW: number;
  
  /** Internal splitter agent */
  readonly splitter: SplitterAgent;

  /**
   * Sets profile sizes for all elements
   */
  set allProfileSize(sizes: Map<ShapeType, number>);

  /**
   * Gets all bar elements managed by this instance
   */
  get bars(): Bar[];

  /**
   * Checks if any bar is currently selected/highlighted
   */
  get selected(): boolean;

  /**
   * Finds polygon by ID
   * @param id - Polygon identifier
   * @returns Polygon if found
   */
  findPoly(id: number): Polygon | undefined;

  /**
   * Creates shutter structure based on current configuration
   * Generates splitter lines and configures docking
   */
  create(): void;

  /**
   * Calculates box points along a vertical range
   * @param minY - Minimum Y coordinate
   * @param maxY - Maximum Y coordinate
   * @param gap - Spacing between points
   * @param x - X coordinate
   * @param ascending - Direction flag (default: true)
   * @param offset - Offset adjustment (default: 0)
   * @returns Tuple of [points array, last point]
   */
  getBoxPts(
    minY: number,
    maxY: number,
    gap: number,
    x: number,
    ascending?: boolean,
    offset?: number
  ): [Point[], Point];

  /**
   * Calculates shutter points based on handle position and orientation
   * @param handleFrame - Frame containing the handle (optional)
   * @param orientation - Desired orientation (default: horizon)
   * @returns Array of calculated points
   */
  calcShutterPts(
    handleFrame?: Frame,
    orientation?: ShutterOrientation
  ): Point[];

  /**
   * Clears all bar elements from host
   */
  clear(): void;

  /**
   * Performs hit test at given point
   * @param point - Test point
   * @returns True if hit detected
   */
  hitTest(point: Point): boolean;

  /**
   * Updates polygon structure and regenerates bars
   */
  updatePoly(): void;

  /**
   * Draws all bars to canvas context
   * @param context - Canvas rendering context
   */
  draw(context: CanvasRenderingContext2D): void;

  /**
   * Translates all bars by given vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;

  /**
   * Hit tests bars and updates highlighting
   * @param point - Test point
   * @param updateHighlight - Whether to update highlight state
   * @returns Hit test result
   */
  hitBar(point: Point, updateHighlight: boolean): HitResult;
}