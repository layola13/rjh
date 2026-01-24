import { Point, Segment, Arc, Vector, Polygon, Box } from '@flatten-js/core';

/**
 * Direction enumeration for edge positioning
 */
export enum Direction {
  Left = -1,
  Right = 1,
  Up = 0,
  Down = 2
}

/**
 * Tool type enumeration
 */
export enum ToolType {
  editInnerSplitter = 'editInnerSplitter'
}

/**
 * Cut line type enumeration
 */
export enum CutLineType {
  semiArcPro = 'semiArcPro'
}

/**
 * Polygon identifier with position information
 */
export interface PolyId {
  pos: number;
}

/**
 * Split line configuration
 */
export interface SpLine {
  line: SemiArcPro;
  innerEdgeIdx: number;
}

/**
 * Result polygon from splitting operation
 */
export interface SplitResult {
  /** Polygon identifier */
  polyId: PolyId;
  /** Multi-shape geometry */
  mulShape?: Arc | Segment;
  /** Array of edges */
  edges: Array<Segment | Arc>;
  /** Whether this is a mullion (structural divider) */
  IsMullion: boolean;
  /** Split line configuration */
  spLine?: SpLine;
  /** Edit tool type */
  editTool?: ToolType;
  /** Get edge by index */
  edge(index: number): Segment | Arc;
  /** Split polygon by segment */
  split(segment: Segment, width: number): SplitResult[];
}

/**
 * Window polygon with bounding box
 */
export interface WinPolygon extends Polygon {
  box: Box;
  edges: Array<Segment | Arc>;
}

/**
 * Serialized SemiArcPro data structure
 */
export interface SemiArcProJSON {
  /** Type name */
  name: string;
  /** Location point */
  l: { x: number; y: number };
  /** Same with outer arc center flag */
  swoac: boolean;
  /** Arc center point */
  ac: { x: number; y: number };
  /** Arc radius */
  ar: number;
  /** Arc angle in radians */
  aa: number;
  /** Middle crossties count */
  mcc: number;
  /** Middle crossties ratio array */
  mcr: number[];
  /** Side crossties hidden flag */
  sch: boolean;
  /** Horizontally side crossties flag */
  hsc: boolean;
  /** Offset of arcs */
  ooa?: number;
}

/**
 * Track area components from splitting
 */
export interface TrackArea {
  /** Inner arc regions */
  inner: SplitResult[];
  /** Side regions */
  side: SplitResult[];
  /** Main track region */
  track: SplitResult;
}

/**
 * Base cut line abstract class
 */
export declare abstract class CutLine {
  /** Cut line type */
  readonly type: CutLineType;
  /** Inner edge index */
  innerEdgeIdx: number;

  constructor(type: CutLineType);

  /**
   * Split polygon using this cut line
   * @param polygon - Target polygon to split
   * @param width - Width of the cut
   * @returns Array of resulting polygons
   */
  abstract split(polygon: WinPolygon, width: number): SplitResult[];

  /**
   * Serialize to JSON
   */
  abstract toJSON(): Record<string, unknown>;

  /**
   * Clone this cut line
   */
  abstract clone(): CutLine;

  /**
   * Translate cut line by vector
   */
  abstract translate(vector: Vector): void;
}

/**
 * Semi-arc pro cut line for creating curved divisions in polygons.
 * Extends CutLine to provide advanced arc-based splitting with customizable crossties.
 */
export declare class SemiArcPro extends CutLine {
  /** Location point of the semi-arc */
  location: Point;
  
  /** Whether to use the same center as outer arc */
  sameWithOuterArcCenter: boolean;
  
  /** Center point of the arc */
  arcCenter: Point;
  
  /** Radius of the arc (-1 means auto-calculate) */
  arcRadius: number;
  
  /** Angle of the arc in radians (-1 means auto-calculate) */
  arcAngle: number;
  
  /** Number of crossties in the middle section */
  middleCrosstiesCount: number;
  
  /** Ratio distribution of middle crossties */
  middleCrosstiesRatio: number[];
  
  /** Whether side crossties are hidden */
  sideCrosstiesHidden?: boolean;
  
  /** Whether side crossties are horizontal */
  horizontallySideCrossties: boolean;
  
  /** Offset between outer and inner arcs */
  offsetOfArcs?: number;

  /** Working polygon reference */
  private polygon: WinPolygon;
  
  /** Internal semi-arc shape */
  private _semiArc: Arc;
  
  /** Outer top edge (can be segment or arc) */
  private _outerTopEdge?: Segment | Arc;

  /**
   * Create a new SemiArcPro cut line
   * @param location - Center location point
   * @param sameWithOuterArcCenter - Use same center as outer arc
   * @param arcCenter - Custom arc center (optional)
   * @param arcRadius - Custom arc radius (default: -1 for auto)
   * @param arcAngle - Custom arc angle in radians (default: -1 for auto)
   * @param middleCrosstiesCount - Number of middle crossties (default: 1)
   * @param middleCrosstiesRatio - Distribution ratios (default: [])
   * @param sideCrosstiesHidden - Hide side crossties (default: false)
   * @param horizontallySideCrossties - Make side crossties horizontal (default: false)
   */
  constructor(
    location: Point,
    sameWithOuterArcCenter?: boolean,
    arcCenter?: Point,
    arcRadius?: number,
    arcAngle?: number,
    middleCrosstiesCount?: number,
    middleCrosstiesRatio?: number[],
    sideCrosstiesHidden?: boolean,
    horizontallySideCrossties?: boolean
  );

  /** Start point of the semi-arc */
  get start(): Point;

  /** End point of the semi-arc */
  get end(): Point;

  /** Alias for location */
  get pt(): Point;

  /** Middle point of the semi-arc */
  get mpt(): Point;

  /** Whether start point is controlled */
  get constrolStart(): boolean;

  /** Whether end point is controlled */
  get constrolEnd(): boolean;

  /** Whether arc should be displayed */
  get showArc(): boolean;

  /** 
   * Chord length (straight distance between arc endpoints)
   * Setting this adjusts arc geometry while maintaining endpoints
   */
  get chordLength(): number;
  set chordLength(value: number);

  /** 
   * Chord height (perpendicular distance from chord to arc peak)
   * Setting this adjusts arc curvature
   */
  get chordHeight(): number;
  set chordHeight(value: number);

  /** Whether same center as outer arc is required */
  private get sameCenterRequired(): boolean;

  /** Get outer semi-arc reference */
  private get _outerSemiArc(): Arc;

  /**
   * Split polygon into regions with arc and crossties
   * @param polygon - Target polygon
   * @param width - Width of cuts
   * @returns Array of split regions and mullions
   */
  split(polygon: WinPolygon, width: number): SplitResult[];

  /**
   * Initialize internal variables from polygon
   * @param polygon - Source polygon
   */
  private initVariables(polygon: WinPolygon): void;

  /**
   * Split polygon by inner arc
   * @param polygon - Target polygon
   * @returns Array of split regions
   */
  private splitByInnerArc(polygon: WinPolygon): SplitResult[];

  /**
   * Create track area with inner, side, and main track regions
   * @param width - Width of cuts
   * @returns Track area components
   */
  private makeTrackArea(width: number): TrackArea;

  /**
   * Bridge semi-arc endpoints with side crossties
   * @param trackRegion - Main track region
   * @param arcRegion - Arc region to connect
   * @param width - Crosstie width
   * @returns Array of side regions
   */
  private bridgeSemiArcEndpoints(
    trackRegion: SplitResult,
    arcRegion: SplitResult,
    width: number
  ): SplitResult[];

  /**
   * Place crossties in the middle section
   * @param region - Region to place crossties in
   * @param count - Number of crossties
   * @param width - Crosstie width
   * @returns Array of regions with crossties
   */
  private placeMiddleCrossties(
    region: SplitResult,
    count: number,
    width: number
  ): SplitResult[];

  /**
   * Format split results with proper metadata
   * @param results - Raw split results
   * @returns Formatted results with mullions separated
   */
  private returnFormat(results: SplitResult[]): SplitResult[];

  /**
   * Find the outer top edge of polygon
   * @returns Top edge (segment or arc)
   */
  private findOuterTopEdge(): Segment | Arc;

  /**
   * Find or calculate semi-arc center point
   * @returns Center point
   */
  private findSemiArcCenter(): Point;

  /**
   * Find or calculate semi-arc radius
   * @returns Radius value
   */
  private findSemiArcRadius(): number;

  /**
   * Find or calculate semi-arc angle
   * @returns Angle in radians
   */
  private findSemiArcAngle(): number;

  /**
   * Create the semi-arc shape
   * @returns Arc geometry
   */
  private makeSemiArc(): Arc;

  /**
   * Get endpoint of arc bar in specified direction
   * @param region - Arc region
   * @param direction - Left or right
   * @returns Endpoint
   */
  private endPointOfArcBar(region: SplitResult, direction: Direction): Point;

  /**
   * Get endpoint of top edge in specified direction
   * @param edge - Top edge
   * @param direction - Left or right
   * @returns Endpoint
   */
  private endPointOfTopEdge(edge: Segment | Arc, direction: Direction): Point;

  /**
   * Expand segment in both directions
   * @param segment - Segment to expand
   * @param distance - Expansion distance
   * @returns Expanded segment
   */
  private expandSegment(segment: Segment, distance: number): Segment;

  /**
   * Split region by segment
   * @param region - Region to split
   * @param segment - Cutting segment
   * @param width - Cut width
   * @returns Tuple of [mullions, regions]
   */
  private splitBySegment(
    region: SplitResult,
    segment: Segment,
    width: number
  ): [SplitResult[], SplitResult[]];

  /**
   * Validate semi-arc geometry
   * @param arc - Arc to validate
   * @returns Whether arc is valid
   */
  private validateSemiArc(arc: Arc): boolean;

  /**
   * Serialize to JSON format
   * @returns JSON representation
   */
  toJSON(): SemiArcProJSON;

  /**
   * Deserialize from JSON
   * @param data - JSON data
   * @returns SemiArcPro instance
   */
  static deserialize(data: SemiArcProJSON): SemiArcPro;

  /**
   * Clone this instance
   * @returns Deep copy
   */
  clone(): SemiArcPro;

  /**
   * Translate by vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;

  /**
   * Drag operation handler
   * @param startPoint - Drag start point
   * @param dragVector - Drag vector
   * @param region - Affected region
   * @returns Modified instance
   */
  drag(startPoint: Point, dragVector: Vector, region: SplitResult): this;

  /**
   * Drag arc control point
   * @param startPoint - Drag start point
   * @param dragVector - Drag vector
   * @param newPoint - New point position
   * @returns Modified instance
   */
  dragArc(startPoint: Point, dragVector: Vector, newPoint: Point): this;

  /**
   * Drag inner edge
   * @param edgeIndex - Edge index
   * @param dragVector - Drag vector
   * @param startPoint - Drag start point
   * @param region - Affected region
   * @returns Modified instance
   */
  dragInnerEdge(
    edgeIndex: number,
    dragVector: Vector,
    startPoint: Point,
    region: SplitResult
  ): this;

  /**
   * Drag vertex
   * @param vertexIndex - Vertex index
   * @param dragVector - Drag vector
   * @param newPoint - New vertex position
   * @returns Modified instance
   */
  dragVertex(vertexIndex: number, dragVector: Vector, newPoint: Point): this;

  /**
   * Rotate around point (currently no-op)
   * @param angle - Rotation angle in radians
   * @param center - Rotation center
   * @returns Modified instance
   */
  rotate(angle: number, center: Point): this;
}