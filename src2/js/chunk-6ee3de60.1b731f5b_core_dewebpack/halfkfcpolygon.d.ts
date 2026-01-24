import { Point, Vector, Segment, Line, Box } from '@flatten-js/core';
import { WinPolygon, PolyType } from './WinPolygon';
import { DockType } from './DockType';
import { EventType, HalfKfcFrameSettings } from './EventTypes';
import { HalfKfcFrametify } from './HalfKfcFrametify';

/**
 * Represents control point configuration for polygon vertices
 */
interface ControlPointConfig {
  /** Whether this control point forms an arc */
  arc: boolean;
  /** Whether this control point is an endpoint */
  endpoint: boolean;
}

/**
 * JSON representation of HalfKfcPolygon
 */
interface HalfKfcPolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center point coordinates */
  cpt: { x: number; y: number };
  /** Horizontal flip flag */
  xFlip: boolean;
  /** Profile size dimension */
  profileSize: number;
  [key: string]: unknown;
}

/**
 * Event object containing view reference
 */
interface PolygonEvent {
  /** Associated view instance */
  view: {
    /** Event bus for emitting events */
    eventBus: {
      emit(event: unknown): void;
    };
  };
}

/**
 * Half KFC-style polygon shape with configurable dimensions and orientation.
 * Represents a specialized window polygon with 6 edges and specific geometric constraints.
 */
export declare class HalfKfcPolygon extends WinPolygon {
  /** Center position of the polygon */
  readonly position: Point;
  
  /** Whether the polygon is horizontally flipped */
  xFlip: boolean;
  
  /** Profile size for inner dimension edge */
  profileSize: number;
  
  /** Total width of the polygon */
  readonly width: number;
  
  /** Width of the inner section (offset dimension) */
  readonly width1: number;
  
  /** Height of the polygon */
  readonly height: number;
  
  /** Control point configurations for vertices */
  protected ctlRobs: Map<number, ControlPointConfig>;
  
  /** Index mapping for inner-to-outer vertex correspondence */
  protected imIdx: Map<number, number>;

  /**
   * Creates a new HalfKfcPolygon instance
   * @param position - Center point of the polygon
   * @param xFlip - Whether to flip horizontally (default: false)
   * @param profileSize - Profile dimension size (default: 60)
   * @param edges - Optional pre-defined edges array
   */
  constructor(
    position: Point,
    xFlip?: boolean,
    profileSize?: number,
    edges?: Segment[]
  );

  /**
   * Gets the boundary polygon (bounding box as polygon)
   */
  get boundary(): WinPolygon;

  /**
   * Indicates whether dimensional controls are enabled
   */
  get controlDimFlag(): boolean;

  /**
   * Calculates the total area of the polygon
   */
  get area(): number;

  /**
   * Calculates the geometric center based on edges 1 and 2
   */
  get center(): Point;

  /**
   * Gets indexes of edges that support multiple connections
   */
  get asMulEdgeIndexes(): number[];

  /**
   * Initializes the polygon layout by generating and positioning edges
   */
  initLayout(): void;

  /**
   * Serializes the polygon to JSON format
   */
  toJSON(): HalfKfcPolygonJSON;

  /**
   * Creates a deep clone of the polygon
   * @internal
   */
  protected _clone(): HalfKfcPolygon;

  /**
   * Initializes control point configurations and index mappings
   */
  protected initPoly(): void;

  /**
   * Applies frame dimensions to the polygon
   * @param dimensions - Array of dimension values
   * @param context - Additional framing context
   * @returns Frametify operation result
   */
  frametify(dimensions: number[], context: unknown): unknown;

  /**
   * Converts inner vertex index to outer index
   * @param innerIndex - Inner vertex index
   * @returns Corresponding outer index, or undefined if not mapped
   */
  idxFromInner(innerIndex: number): number | undefined;

  /**
   * Drags an edge by a given vector offset
   * @param edgeIndex - Index of the edge to drag
   * @param offset - Translation vector
   * @param point - Optional reference point (default: origin)
   * @returns New polygon instance with modified edge
   */
  dragEdge(edgeIndex: number, offset: Vector, point?: Point): HalfKfcPolygon;

  /**
   * Drags a vertex by a given vector offset (constrained to vertical movement)
   * @param vertexIndex - Index of the vertex to drag
   * @param offset - Translation vector (projected to vertical axis)
   * @returns New polygon instance with modified vertex
   */
  dragVertex(vertexIndex: number, offset: Vector): HalfKfcPolygon;

  /**
   * Edits dimensional constraints by dragging control points
   * @param dimIndex - Dimension control index
   * @param value - Dimension value (unused in implementation)
   * @param offset - Translation vector for the edit operation
   * @returns New polygon instance with edited dimensions
   */
  editDim(dimIndex: number, value: number, offset: Vector): HalfKfcPolygon;

  /**
   * Flips the polygon horizontally around its center
   * @returns New flipped polygon instance
   */
  flipX(): HalfKfcPolygon;

  /**
   * Updates the profile size dimension
   * @param size - New profile size value
   * @returns New polygon instance with updated profile size
   */
  setProfileSize(size: number): HalfKfcPolygon;

  /**
   * Emits a frame settings event through the event bus
   * @param event - Event object containing view reference
   */
  raiseFrameEvent(event: PolygonEvent): void;

  /**
   * Generates the initial set of edges based on polygon dimensions
   * @returns Array of 6 segments forming the polygon boundary
   */
  protected initEdges(): Segment[];

  /**
   * Fixes cross-connection bars for frame connections
   * @param edges - Array of polygon edges
   */
  protected fixFrameCCBars(edges: unknown[]): void;

  /**
   * Adjusts inner dimension edge length based on profile size
   * @param edge - The edge segment to adjust
   * @returns Modified segment with adjusted length
   */
  protected fixInnerDimEdge(edge: Segment): Segment;

  /**
   * Flips a segment horizontally around a center point
   * @param segment - Segment to flip
   * @param center - Center point for flipping (default: origin)
   * @returns Horizontally flipped segment
   */
  protected flipXForSeg(segment: Segment, center?: Point): Segment;

  /**
   * Converts edge to support multiple cross-connection bars
   * @param edge - Edge to convert
   */
  protected toMulCCBar(edge: unknown): void;
}