import { Point, Vector, Segment, Line } from './geometry';
import { DrawParams } from './DrawParams';
import { Direction } from './Direction';
import { PolygonCreator } from './PolygonCreator';
import { WinPolygon, PolyType } from './WinPolygon';
import { EventType, PointedEarsFrameSettings } from './Events';
import { Frametify, PointedEarFrametify } from './Frametify';
import { PolyId } from './PolyId';

/**
 * Control point configuration for polygon vertices
 */
interface ControlPointConfig {
  /** Whether the point represents an arc */
  arc: boolean;
  /** Whether the point is an endpoint */
  endpoint: boolean;
}

/**
 * Dimension information for polygon edges
 */
interface DimensionInfo {
  /** Edge index */
  idx: number;
  /** Whether to show dimension */
  dimShow: boolean;
  /** Whether to hide in multi-selection mode */
  mulHide?: boolean;
}

/**
 * Serialized polygon data structure
 */
interface PointedEarPolygonJSON {
  /** Polygon type identifier */
  type: PolyType;
  /** Center point position */
  cpt: Point;
  /** Ear position direction */
  ep: Direction;
  /** Float reverse flag */
  fr: boolean;
  /** Has base flag */
  hb: boolean;
  /** Pulling height values for each edge */
  ph: number[];
}

/**
 * Represents a pointed ear polygon shape.
 * This polygon has a distinctive "ear" protrusion on one of its sides,
 * commonly used in window and door frame designs.
 */
export declare class PointedEarPolygon extends WinPolygon {
  /** Center position of the polygon */
  position: Point;
  
  /** Direction where the ear protrusion is located */
  earPosition: Direction;
  
  /** Whether the floating edge is reversed */
  floatReverse: boolean;
  
  /** Base size of the polygon (default: 2100 units) */
  size: number;
  
  /** Whether the polygon has a base */
  hasBase: boolean;
  
  /** Pulling height values for each edge */
  pullingHeight: number[];
  
  /** Map of control point configurations */
  protected ctlRobs: Map<number, ControlPointConfig>;
  
  /** Index mapping from inner to outer indices */
  protected imIdx: Map<number, number>;

  /**
   * Creates a new PointedEarPolygon instance
   * @param position - Center point of the polygon
   * @param earPosition - Direction of the ear protrusion (default: Right)
   * @param floatReverse - Whether to reverse the floating edge (default: false)
   * @param edges - Optional array of pre-defined edges
   */
  constructor(
    position: Point,
    earPosition?: Direction,
    floatReverse?: boolean,
    edges?: Segment[]
  );

  /**
   * Always returns true, indicating control dimensions are enabled
   */
  get controlDimFlag(): boolean;

  /**
   * Calculates the ear size based on the polygon's base size
   * @returns One-third of the base size
   */
  get earSize(): number;

  /**
   * Serializes the polygon to JSON format
   * @returns JSON representation of the polygon
   */
  toJSON(): PointedEarPolygonJSON;

  /**
   * Creates a deep clone of this polygon
   * @returns New PointedEarPolygon instance with same properties
   */
  protected _clone(): PointedEarPolygon;

  /**
   * Initializes control point configurations and index mappings
   */
  protected initPoly(): void;

  /**
   * Initializes the polygon layout based on ear position
   */
  protected initLayout(): void;

  /**
   * Creates edges for a right-positioned ear
   * @param direction - Direction multiplier (1 or -1)
   * @returns Array of segment edges
   */
  protected initRightEarEdges(direction?: boolean): Segment[];

  /**
   * Creates edges for a left-positioned ear
   * @param direction - Direction multiplier (1 or -1)
   * @returns Array of segment edges
   */
  protected initLeftEarEdges(direction?: boolean): Segment[];

  /**
   * Creates edges for a top-positioned ear
   * @param direction - Direction multiplier (1 or -1)
   * @returns Array of segment edges
   */
  protected initTopEarEdges(direction?: boolean): Segment[];

  /**
   * Creates edges for a bottom-positioned ear
   * @param direction - Direction multiplier (1 or -1)
   * @returns Array of segment edges
   */
  protected initBottomEarEdges(direction?: boolean): Segment[];

  /**
   * Converts the polygon to a frame structure
   * @param param1 - First frame parameter
   * @param param2 - Second frame parameter
   * @returns PointedEarFrametify instance
   */
  frametify(param1: unknown, param2: unknown): PointedEarFrametify;

  /**
   * Maps inner index to corresponding outer index
   * @param innerIndex - Inner vertex index
   * @returns Corresponding outer index
   */
  idxFromInner(innerIndex: number): number | undefined;

  /**
   * Drags an edge and updates adjacent edge intersections
   * @param edgeIndex - Index of the edge to drag
   * @param translation - Translation vector
   * @param point - Optional reference point
   * @returns New PointedEarPolygon with updated edges
   */
  dragEdge(edgeIndex: number, translation: Vector, point?: Point): PointedEarPolygon;

  /**
   * Drags an arc (delegates to dragEdge)
   * @param arcIndex - Index of the arc to drag
   * @param translation - Translation vector
   * @returns New PointedEarPolygon with updated edges
   */
  dragArc(arcIndex: number, translation: Vector): PointedEarPolygon;

  /**
   * Drags a vertex (delegates to dragEdge)
   * @param vertexIndex - Index of the vertex to drag
   * @param translation - Translation vector
   * @param param3 - Third parameter (unused)
   * @param point - Optional reference point
   * @returns New PointedEarPolygon with updated edges
   */
  dragVertex(
    vertexIndex: number,
    translation: Vector,
    param3: unknown,
    point?: Point
  ): PointedEarPolygon;

  /**
   * Initializes dimension display information for each edge
   * @returns Array of dimension configurations
   */
  initDimInfo(): DimensionInfo[];

  /**
   * Raises a frame settings event
   * @param event - Event object containing view reference
   */
  raiseFrameEvent(event: { view: { eventBus: { emit: (event: unknown) => void } } }): void;

  /**
   * Creates a parallel polygon with specified offsets
   * @param offsets - Single offset or array of offsets for each edge
   * @param param2 - Second parameter for parallel calculation
   * @returns New parallel polygon
   */
  parallelPoly(offsets: number | number[], param2: unknown): WinPolygon;

  /**
   * Edits dimension by translating specific edges
   * @param edgeIndex - Index of the edge to edit
   * @param param2 - Second parameter (unused)
   * @param translation - Translation vector
   * @returns New PointedEarPolygon with updated dimensions
   */
  editDim(edgeIndex: number, param2: unknown, translation: Vector): PointedEarPolygon;

  /**
   * Updates the pulling height label display
   * @param label - Label object to update
   */
  updatePullingHeightLabel(label: {
    text: string;
    position: Point;
    fontSize: number;
    hidden: boolean;
    updatePoly: () => void;
  }): void;

  /**
   * Migrates pulling height to child polygon in splitter
   * @param parent - Parent object containing splitter
   * @param param2 - Second parameter for virtual settings
   */
  pullingHeightMigration(
    parent: { splitter: { subs: unknown[]; setPullingHeight: (id: number, height: number) => void } },
    param2: { setVirtual: (id: PolyId, value: boolean) => void }
  ): void;
}