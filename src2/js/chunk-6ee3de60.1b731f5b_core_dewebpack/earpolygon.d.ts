import type { Point, Vector, Segment, Box, Line } from './geometry';
import type { WinPolygon, PolyType } from './polygon';
import type { EventBus, EventType } from './events';
import type { DockType, PolyId } from './dock';
import type { DrawParams } from './draw';

/**
 * Edge control properties for polygon manipulation
 */
interface EdgeControlProperties {
  /** Whether the edge is an arc */
  arc: boolean;
  /** Whether the edge is an endpoint */
  endpoint: boolean;
}

/**
 * Serialized ear polygon data structure
 */
interface EarPolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center point coordinates */
  cpt: { x: number; y: number };
  /** Whether the polygon is oriented vertically */
  isVertical: boolean;
  /** Whether the polygon is flipped horizontally */
  xFlip: boolean;
  /** Whether the polygon is flipped vertically */
  yFlip: boolean;
  /** Whether the polygon has a base */
  hb: boolean;
  /** Pulling height values for each edge */
  ph: number[];
}

/**
 * Frame event data structure
 */
interface FrameEvent {
  /** Associated view instance */
  view: {
    /** Event bus for emitting events */
    eventBus: EventBus;
  };
}

/**
 * CC bar (connection bar) data structure
 */
interface CCBar {
  /** Number of connections */
  connectCount?: number;
  /** Number of docks */
  dockCount?: number;
  /** Endpoint dock configuration */
  epDock: {
    /** End type dock */
    etDock: { type: DockType };
    /** Start type dock */
    stDock: { type: DockType };
  };
}

/**
 * Splitter sub-element interface
 */
interface SplitterSub {
  /** Whether this is a mullion element */
  IsMullion: boolean;
  /** Bounding box of the element */
  box: Box;
  /** Associated polygon instance */
  polygon: WinPolygon;
  /** Unique polygon identifier */
  polyId: PolyId;
}

/**
 * Splitter interface for window panel division
 */
interface Splitter {
  /** Sub-elements created by splitting */
  subs: SplitterSub[];
  /** Set pulling height for a specific polygon */
  setPullingHeight(polyId: PolyId, height: number): void;
  /** Mark a polygon as virtual */
  setVirtual(polyId: PolyId, isVirtual: boolean): void;
}

/**
 * Label for displaying pulling height
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
 * Ear-shaped polygon class for window frame design
 * Extends WinPolygon with specialized behavior for ear-type frames
 */
export declare class EarPolygon extends WinPolygon {
  /** Center position of the polygon */
  readonly position: Point;
  
  /** Whether the polygon is oriented vertically */
  readonly isVertical: boolean;
  
  /** Whether the polygon is flipped along X-axis */
  readonly xFlip: boolean;
  
  /** Whether the polygon is flipped along Y-axis */
  readonly yFlip: boolean;
  
  /** Base size dimension (default: 2100) */
  readonly size: number;
  
  /** Whether the polygon has a structural base */
  hasBase: boolean;
  
  /** Pulling height values for each edge */
  pullingHeight: number[];
  
  /** Edge control properties mapping */
  protected ctlRobs: Map<number, EdgeControlProperties>;
  
  /** Inner index mapping */
  protected imIdx: Map<number, number>;

  /**
   * Creates an ear-shaped polygon
   * @param position - Center position of the polygon
   * @param isVertical - Whether to orient the polygon vertically (default: false)
   * @param xFlip - Whether to flip along X-axis (default: false)
   * @param yFlip - Whether to flip along Y-axis (default: false)
   * @param edges - Optional predefined edges
   */
  constructor(
    position: Point,
    isVertical?: boolean,
    xFlip?: boolean,
    yFlip?: boolean,
    edges?: Segment[]
  );

  /**
   * Flag indicating this polygon type supports dimension control
   */
  get controlDimFlag(): true;

  /**
   * Calculated size of the ear portion (1/3 of total size)
   */
  get earSize(): number;

  /**
   * Geometric center point of the polygon (calculated from edges 2 and 3)
   */
  get center(): Point;

  /**
   * Indexes of edges that support multiple connections
   */
  get asMulEdgeIndexes(): [0];

  /**
   * Initialize the polygon layout with default edges
   */
  initLayout(): void;

  /**
   * Initialize edge control properties and index mappings
   */
  protected initPoly(): void;

  /**
   * Create the initial set of 7 edges forming the ear shape
   * @returns Array of segments defining the polygon
   */
  protected initEdges(): Segment[];

  /**
   * Serialize the polygon to JSON format
   * @returns Serialized polygon data
   */
  toJSON(): EarPolygonJSON;

  /**
   * Create a horizontally flipped copy of the polygon
   * @returns New flipped polygon instance
   */
  flipX(): EarPolygon;

  /**
   * Create a vertically flipped copy of the polygon
   * @returns New flipped polygon instance
   */
  flipY(): EarPolygon;

  /**
   * Flip a segment along the X-axis
   * @param segment - Segment to flip
   * @param center - Center point for flipping (default: origin)
   * @returns Flipped segment
   */
  protected flipXForSeg(segment: Segment, center?: Point): Segment;

  /**
   * Flip a segment along the Y-axis
   * @param segment - Segment to flip
   * @param center - Center point for flipping (default: origin)
   * @returns Flipped segment
   */
  protected flipYForSeg(segment: Segment, center?: Point): Segment;

  /**
   * Convert polygon to frame representation
   * @param param1 - First frame parameter
   * @param param2 - Second frame parameter
   * @returns Frametified polygon
   */
  frametify(param1: unknown, param2: unknown): unknown;

  /**
   * Get outer index from inner index mapping
   * @param innerIndex - Inner index value
   * @returns Corresponding outer index
   */
  idxFromInner(innerIndex: number): number | undefined;

  /**
   * Drag an edge by a translation vector
   * @param edgeIndex - Index of edge to drag
   * @param translation - Translation vector
   * @param auxiliaryPoint - Auxiliary point for calculation (default: origin)
   * @returns New polygon with dragged edge
   */
  dragEdge(edgeIndex: number, translation: Vector, auxiliaryPoint?: Point): EarPolygon;

  /**
   * Drag a vertex by a translation vector
   * @param vertexIndex - Index of vertex to drag
   * @param translation - Translation vector
   * @param param3 - Additional parameter
   * @param auxiliaryPoint - Auxiliary point for calculation (default: origin)
   * @returns New polygon with dragged vertex
   */
  dragVertex(
    vertexIndex: number,
    translation: Vector,
    param3: boolean,
    auxiliaryPoint?: Point
  ): EarPolygon;

  /**
   * Edit dimension of the polygon
   * @param dimensionIndex - Index of dimension to edit
   * @param param2 - Second parameter
   * @param translation - Translation vector for the edit
   * @returns Modified polygon
   */
  editDim(dimensionIndex: number, param2: unknown, translation: Vector): EarPolygon;

  /**
   * Emit a frame-related event
   * @param event - Frame event data
   */
  raiseFrameEvent(event: FrameEvent): void;

  /**
   * Create a deep clone of the polygon
   * @returns Cloned polygon instance
   */
  protected _clone(): EarPolygon;

  /**
   * Fix connection bars for the frame
   * @param bars - Array of connection bars to fix
   */
  fixFrameCCBars(bars: CCBar[]): void;

  /**
   * Update the pulling height label appearance
   * @param label - Label to update
   */
  updatePullingHeightLabel(label: PullingHeightLabel): void;

  /**
   * Migrate pulling height to splitter configuration
   * @param context - Context containing splitter data
   * @param migration - Migration configuration object
   */
  pullingHeightMigration(
    context: { splitter: Splitter },
    migration: { setVirtual(polyId: PolyId, isVirtual: boolean): void }
  ): void;
}