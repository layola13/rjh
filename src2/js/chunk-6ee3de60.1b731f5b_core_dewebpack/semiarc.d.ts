import type { Point, Arc, Segment, Vector, Circle } from '@flatten-js/core';
import type { WinPolygon } from './WinPolygon';
import type { CutLine, CutLineType } from './CutLine';
import type { Direction } from './Direction';

/**
 * SemiArc split result interface
 */
interface SplitResult {
  /** Indicates if this result is a mullion (vertical support bar) */
  IsMullion: boolean;
  /** Multiple shape reference */
  mulShape?: Arc;
  /** Split line information */
  spLine?: {
    line: SemiArc;
  };
  /** Polygon identification and position */
  polyId: {
    pos: number;
  };
  /** Bounding box of the polygon */
  box: {
    center: Point;
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  };
  /** Edges of the polygon */
  edges: Array<Segment | Arc>;
}

/**
 * Serialized SemiArc data structure
 */
interface SemiArcJSON {
  /** Type name of the cut line */
  name: CutLineType;
  /** Location point coordinates */
  l: { x: number; y: number };
  /** Same with outer arc center flag */
  swoac: boolean;
  /** Arc center coordinates */
  ac: { x: number; y: number };
  /** Arc radius value */
  ar: number;
  /** Middle crossties count */
  mcc: number;
}

/**
 * SemiArc cut line class
 * 
 * Represents a semi-circular cutting line used to split polygons with curved edges.
 * Supports various arc manipulation operations including dragging, rotating, and splitting.
 * 
 * @extends CutLine
 */
export declare class SemiArc extends CutLine {
  /**
   * Location point of the semi-arc
   */
  location: Point;

  /**
   * Whether the arc shares the same center with the outer arc
   */
  sameWithOuterArcCenter: boolean;

  /**
   * Center point of the arc
   */
  arcCenter: Point;

  /**
   * Radius of the arc (-1 indicates auto-calculated)
   */
  arcRadius: number;

  /**
   * Number of middle crossties (support bars)
   */
  middleCrosstiesCount: number;

  /**
   * The polygon being operated on
   */
  polygon: WinPolygon;

  /**
   * Index of the inner edge (used for mullion positioning)
   */
  innerEdgeIdx: number;

  /**
   * Internal cutting circle
   * @private
   */
  private _cutCircle: Arc;

  /**
   * Internal semi-arc shape
   * @private
   */
  private _semiArc: Arc;

  /**
   * Outer top edge of the polygon
   * @private
   */
  private _outerTopEdge: Segment | Arc;

  /**
   * Outer bottom edge of the polygon
   * @private
   */
  private _outerBottomEdge: Segment | Arc;

  /**
   * Creates a new SemiArc instance
   * 
   * @param location - The location point of the semi-arc
   * @param sameWithOuterArcCenter - Whether to use the same center as outer arc (default: false)
   * @param arcCenter - Custom arc center point (optional)
   * @param arcRadius - Custom arc radius (default: -1 for auto-calculation)
   * @param middleCrosstiesCount - Number of middle support bars (default: 3)
   */
  constructor(
    location: Point,
    sameWithOuterArcCenter?: boolean,
    arcCenter?: Point,
    arcRadius?: number,
    middleCrosstiesCount?: number
  );

  /**
   * Start point of the semi-arc
   * @readonly
   */
  get start(): Point;

  /**
   * End point of the semi-arc
   * @readonly
   */
  get end(): Point;

  /**
   * Current location point (alias for location)
   * @readonly
   */
  get pt(): Point;

  /**
   * Middle point of the semi-arc
   * @readonly
   */
  get mpt(): Point;

  /**
   * Whether this controls the start of the arc
   * @readonly
   */
  get constrolStart(): boolean;

  /**
   * Whether this controls the end of the arc
   * @readonly
   */
  get constrolEnd(): boolean;

  /**
   * Whether to show the arc visually
   * @readonly
   */
  get showArc(): boolean;

  /**
   * Chord length of the arc (distance between start and end points)
   * Setting this value adjusts the arc geometry accordingly
   */
  get chordLength(): number;
  set chordLength(value: number);

  /**
   * Chord height of the arc (perpendicular distance from chord to arc)
   * Setting this value adjusts the arc curvature
   */
  get chordHeight(): number;
  set chordHeight(value: number);

  /**
   * Whether the arc must share center with outer arc
   * @readonly
   * @private
   */
  private get sameCenterRequired(): boolean;

  /**
   * Reference to the outer semi-arc
   * @readonly
   * @private
   */
  private get _outerSemiArc(): Arc;

  /**
   * Splits the polygon using the semi-arc cut line
   * 
   * @param polygon - The polygon to split
   * @param tolerance - Tolerance for geometric operations
   * @returns Array of split results including polygons and mullions
   */
  split(polygon: WinPolygon, tolerance: number): SplitResult[];

  /**
   * Initializes internal variables before splitting
   * @private
   */
  private initVariables(polygon: WinPolygon): void;

  /**
   * Bridges the endpoints of the semi-arc with additional geometry
   * @private
   */
  private bridgeSemiArcEndpoints(
    polygon: SplitResult,
    arcBar: SplitResult,
    tolerance: number
  ): SplitResult[];

  /**
   * Places middle crossties (support bars) along the arc
   * @private
   */
  private placeMiddleCrossties(
    polygon: SplitResult,
    count: number,
    tolerance: number
  ): SplitResult[];

  /**
   * Finds the outer edge in the specified direction
   * @private
   */
  private findOuterEdge(direction: Direction): Segment | Arc;

  /**
   * Finds the center point for the cutting circle
   * @private
   */
  private findCutCircleCenter(): Point;

  /**
   * Finds the radius for the cutting circle
   * @private
   */
  private findCutCircleRadius(): number;

  /**
   * Creates the cutting circle used for splitting
   * @private
   */
  private makeCutCircle(): Arc;

  /**
   * Gets the endpoint of the arc bar in the specified direction
   * @private
   */
  private endPointOfArcBar(arcBar: SplitResult, direction: Direction): Point;

  /**
   * Gets the endpoint of the top edge in the specified direction
   * @private
   */
  private endPointOfTopEdge(edge: Segment | Arc, direction: Direction): Point;

  /**
   * Expands a segment by the specified distance at both ends
   * @private
   */
  private expandSegment(segment: Segment, distance: number): Segment;

  /**
   * Calculates the total angle swept by the arc
   * @private
   */
  private totalAngleOfArc(arc: Arc): number;

  /**
   * Validates that the semi-arc has correct geometry
   * @private
   */
  private validateSemiArc(arc: Arc): boolean;

  /**
   * Serializes the SemiArc to JSON format
   * 
   * @returns JSON representation of the semi-arc
   */
  toJSON(): SemiArcJSON;

  /**
   * Deserializes a SemiArc from JSON data
   * 
   * @param json - Serialized semi-arc data
   * @returns New SemiArc instance
   */
  static deserialize(json: SemiArcJSON): SemiArc;

  /**
   * Creates a deep copy of this SemiArc
   * 
   * @returns Cloned SemiArc instance
   */
  clone(): SemiArc;

  /**
   * Translates the semi-arc by the given vector
   * 
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;

  /**
   * Drags the semi-arc with constraints based on configuration
   * 
   * @param startPoint - Starting point of drag
   * @param dragVector - Vector representing drag movement
   * @param splitResult - Associated split result
   * @returns Updated SemiArc instance
   */
  drag(startPoint: Point, dragVector: Vector, splitResult: SplitResult): this;

  /**
   * Drags the arc curve to a new position
   * 
   * @param startPoint - Starting point of drag
   * @param dragVector - Vector representing drag movement
   * @param newPoint - New target point for the arc
   * @returns Updated SemiArc instance
   */
  dragArc(startPoint: Point, dragVector: Vector, newPoint: Point): this;

  /**
   * Drags a vertex of the arc
   * 
   * @param startPoint - Starting point of drag
   * @param dragVector - Vector representing drag movement
   * @param vertex - Vertex being dragged
   * @returns Updated SemiArc instance
   */
  dragVertex(startPoint: Point, dragVector: Vector, vertex: Point): this;

  /**
   * Rotates the semi-arc around a center point
   * 
   * @param angle - Rotation angle in radians
   * @param center - Center point of rotation
   * @returns Updated SemiArc instance
   */
  rotate(angle: number, center: Point): this;
}