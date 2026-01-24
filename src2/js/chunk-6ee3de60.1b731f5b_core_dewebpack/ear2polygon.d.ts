import type { Vector, Point, Segment, Box, Line } from './geometry';
import type { WinPolygon, PolygonCreator, PolyType } from './polygon';
import type { EventBus, EventType } from './events';
import type { DrawParams } from './draw-params';
import type { PolyId } from './poly-id';
import type { Ear2Frametify } from './frametify';

/**
 * Configuration for control point behavior
 */
interface ControlPointConfig {
  /** Whether the control point represents an arc */
  arc: boolean;
  /** Whether the control point is an endpoint */
  endpoint: boolean;
}

/**
 * Event payload for Ear2 frame settings
 */
interface Ear2FrameSettings {
  view: ViewContext;
}

/**
 * View context containing event bus
 */
interface ViewContext {
  eventBus: EventBus;
}

/**
 * JSON serialization format for Ear2Polygon
 */
interface Ear2PolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center point position */
  cpt: { x: number; y: number };
  /** Whether the polygon is oriented vertically */
  isVertical: boolean;
  /** Horizontal flip state */
  xFlip: boolean;
  /** Vertical flip state */
  yFlip: boolean;
  /** Whether the polygon has a base */
  hb: boolean;
  /** Array of pulling heights for each edge */
  ph: number[];
}

/**
 * Label configuration for pulling height display
 */
interface PullingHeightLabel {
  /** Label text content */
  text: string;
  /** Label position */
  position: Point;
  /** Font size in pixels */
  fontSize: number;
  /** Whether the label is hidden */
  hidden: boolean;
  /** Update the label's polygon representation */
  updatePoly(): void;
}

/**
 * Splitter configuration for polygon subdivision
 */
interface Splitter {
  /** Sub-polygons created by splitting */
  subs: Array<{
    /** Whether this is a mullion */
    IsMullion: boolean;
    /** Bounding box of the sub-polygon */
    box: Box;
    /** Unique polygon identifier */
    polyId: PolyId;
    /** The polygon geometry */
    polygon: WinPolygon;
  }>;
  /**
   * Set pulling height for a specific sub-polygon
   * @param polyId - Target polygon identifier
   * @param height - Height value to set
   */
  setPullingHeight(polyId: PolyId, height: number): void;
}

/**
 * Context for splitting operations
 */
interface SplitContext {
  /** Splitter instance */
  splitter: Splitter;
  /**
   * Mark a polygon as virtual
   * @param polyId - Polygon identifier
   * @param isVirtual - Virtual state
   */
  setVirtual(polyId: PolyId, isVirtual: boolean): void;
}

/**
 * Represents a custom ear-shaped polygon with two ears
 * Extends WinPolygon with specialized geometry and manipulation methods
 */
declare class Ear2Polygon extends WinPolygon {
  /** Center position of the polygon */
  position: Point;
  
  /** Whether the polygon is oriented vertically (rotated 90 degrees) */
  isVertical: boolean;
  
  /** Whether the polygon is flipped horizontally */
  xFlip: boolean;
  
  /** Whether the polygon is flipped vertically */
  yFlip: boolean;
  
  /** Total width of the polygon */
  readonly width: number;
  
  /** Width of the first section */
  readonly width1: number;
  
  /** Width of the second section */
  readonly width2: number;
  
  /** Total height of the polygon */
  readonly height: number;
  
  /** Height of the first section */
  readonly height1: number;
  
  /** Whether the polygon has a base element */
  hasBase: boolean;
  
  /** Array of pulling heights for each edge */
  pullingHeight: number[];
  
  /** Map of control point configurations */
  ctlRobs: Map<number, ControlPointConfig>;
  
  /** Index mapping for inner points */
  imIdx: Map<number, number>;

  /**
   * Create a new Ear2Polygon instance
   * @param position - Center position of the polygon
   * @param isVertical - Whether to orient the polygon vertically
   * @param xFlip - Whether to flip horizontally
   * @param yFlip - Whether to flip vertically
   * @param edges - Optional array of edge segments
   */
  constructor(
    position: Point,
    isVertical?: boolean,
    xFlip?: boolean,
    yFlip?: boolean,
    edges?: Segment[]
  );

  /**
   * Get the boundary polygon formed by connecting key edge endpoints
   */
  get boundary(): WinPolygon;

  /**
   * Whether dimensional control is enabled for this polygon
   */
  get controlDimFlag(): boolean;

  /**
   * Get the geometric center point of the main body
   * Calculated from edges 2 and 3
   */
  get center(): Point;

  /**
   * Initialize the polygon layout by creating and positioning edges
   */
  initLayout(): void;

  /**
   * Serialize the polygon to JSON format
   * @returns JSON representation including type, position, orientation, and dimensions
   */
  toJSON(): Ear2PolygonJSON;

  /**
   * Create a deep clone of this polygon
   * @returns New Ear2Polygon instance with cloned edges
   */
  protected _clone(): Ear2Polygon;

  /**
   * Initialize polygon control points and index mappings
   * Sets up control point behaviors and inner-to-outer index relationships
   */
  initPoly(): void;

  /**
   * Convert polygon to frame structure
   * @param param1 - First frametify parameter
   * @param param2 - Second frametify parameter
   * @returns Ear2Frametify instance
   */
  frametify(param1: unknown, param2: unknown): Ear2Frametify;

  /**
   * Map inner index to outer index
   * @param innerIndex - Inner point index
   * @returns Corresponding outer index or undefined
   */
  idxFromInner(innerIndex: number): number | undefined;

  /**
   * Drag an edge by a given vector, updating connected edges
   * @param edgeIndex - Index of the edge to drag (0-6)
   * @param dragVector - Vector representing the drag motion
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New Ear2Polygon with updated edge positions
   */
  dragEdge(edgeIndex: number, dragVector: Vector, referencePoint?: Point): Ear2Polygon;

  /**
   * Edit dimensions by dragging specific edges
   * @param dimIndex - Dimension index to edit
   * @param param2 - Secondary parameter (unused)
   * @param dragVector - Vector representing the dimensional change
   * @returns New Ear2Polygon with updated dimensions
   */
  editDim(dimIndex: number, param2: unknown, dragVector: Vector): Ear2Polygon;

  /**
   * Create a horizontally flipped copy of the polygon
   * @returns New Ear2Polygon flipped across vertical axis through center
   */
  flipX(): Ear2Polygon;

  /**
   * Create a vertically flipped copy of the polygon
   * @returns New Ear2Polygon flipped across horizontal axis through center
   */
  flipY(): Ear2Polygon;

  /**
   * Emit a frame settings event for this polygon
   * @param context - View context containing event bus
   */
  raiseFrameEvent(context: ViewContext): void;

  /**
   * Initialize edge segments based on dimensions and orientation
   * @returns Array of 8 edge segments forming the polygon
   */
  protected initEdges(): Segment[];

  /**
   * Flip a segment horizontally around a center point
   * @param segment - Segment to flip
   * @param center - Center point for flip operation (defaults to origin)
   * @returns New segment with x-coordinates mirrored
   */
  protected flipXForSeg(segment: Segment, center?: Point): Segment;

  /**
   * Flip a segment vertically around a center point
   * @param segment - Segment to flip
   * @param center - Center point for flip operation (defaults to origin)
   * @returns New segment with y-coordinates mirrored
   */
  protected flipYForSeg(segment: Segment, center?: Point): Segment;

  /**
   * Update the pulling height label text and position
   * @param label - Label object to update
   */
  updatePullingHeightLabel(label: PullingHeightLabel): void;

  /**
   * Migrate pulling height from polygon to split sub-polygons
   * Transfers pulling height configuration when splitting occurs
   * @param splitContext - Context containing split information
   * @param param2 - Additional parameter for migration
   */
  pullingHeightMigration(splitContext: SplitContext, param2: unknown): void;
}

export { Ear2Polygon };