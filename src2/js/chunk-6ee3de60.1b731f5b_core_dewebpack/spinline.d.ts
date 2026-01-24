import { Point, Vector, Line, ORIENTATION } from './geometry';
import { CutLine, CutLineType, SpinLineCreator, SpinLineCut } from './cutline';

/**
 * Orientation type for spin direction
 */
export enum Orientation {
  /** Clockwise orientation */
  CW = 'CW',
  /** Counter-clockwise orientation */
  CCW = 'CCW'
}

/**
 * Intersection point information containing both polygon and line intersection coordinates
 */
export interface IntersectionPoint {
  /** Intersection point on the polygon */
  poly: Point;
  /** Intersection point on the line */
  line: Point;
}

/**
 * JSON serialization format for SpinLine
 */
export interface SpinLineJSON {
  /** Type identifier for deserialization */
  name: CutLineType;
  /** Center point coordinates */
  cpt: { x: number; y: number };
  /** Spin orientation */
  orien: Orientation;
  /** Width of the spin line */
  width: number;
  /** Height of the spin line */
  height: number;
  /** Number of sides */
  side: number;
  /** Index of the inner edge */
  innerEdgeIdx: number;
  /** Serialized line segments */
  slines: Array<unknown>;
}

/**
 * SpinLine represents a rotatable cutting line with configurable dimensions and orientation.
 * It extends CutLine and provides functionality for creating, manipulating, and querying
 * geometric line segments arranged in a spin pattern.
 */
export declare class SpinLine extends CutLine {
  /** Center point of the spin line */
  private cpt: Point;
  
  /** Orientation (clockwise or counter-clockwise) */
  private _orien: Orientation;
  
  /** Array of line segments forming the spin line */
  private slines: Line[];
  
  /** Width dimension */
  private _width: number;
  
  /** Height dimension */
  private _height: number;
  
  /** Number of sides (typically 4) */
  private _side: number;

  /**
   * Creates a new SpinLine instance
   * @param center - Center point of the spin line (default: origin point)
   * @param orientation - Spin orientation (default: CCW)
   */
  constructor(center?: Point, orientation?: Orientation);

  /**
   * Creates or recreates the line segments based on current properties
   * @returns This SpinLine instance for method chaining
   */
  create(): this;

  /**
   * Retrieves a specific line segment by index
   * @param index - Zero-based index of the line segment
   * @returns The requested line segment
   */
  line(index: number): Line;

  /**
   * Gets the current orientation
   */
  get orien(): Orientation;

  /**
   * Sets the orientation and recreates the line segments if changed
   * @param value - New orientation value
   */
  set orien(value: Orientation);

  /**
   * Gets the number of sides
   */
  get side(): number;

  /**
   * Sets the number of sides and recreates the line segments if changed
   * @param value - New side count
   */
  set side(value: number);

  /**
   * Gets the width dimension
   */
  get width(): number;

  /**
   * Sets the width and updates affected line segments
   * @param value - New width value
   */
  set width(value: number);

  /**
   * Gets the height dimension
   */
  get height(): number;

  /**
   * Sets the height and updates affected line segments
   * @param value - New height value
   */
  set height(value: number);

  /**
   * Gets the start point (first line segment's point)
   */
  get start(): Point;

  /**
   * Gets the end point (second line segment's point)
   */
  get end(): Point;

  /**
   * Gets the center point
   */
  get pt(): Point;

  /**
   * Gets the midpoint (alias for center point)
   */
  get mpt(): Point;

  /**
   * Indicates if the start point is controllable
   */
  get constrolStart(): boolean;

  /**
   * Indicates if the end point is controllable
   */
  get constrolEnd(): boolean;

  /**
   * Indicates if arc visualization is enabled
   */
  get showArc(): boolean;

  /**
   * Splits the spin line at specified parameters
   * @param param1 - First split parameter
   * @param param2 - Second split parameter
   * @returns Result of the split operation
   */
  split(param1: unknown, param2: unknown): unknown;

  /**
   * Creates a deep copy of this SpinLine
   * @returns A new SpinLine instance with identical properties
   */
  clone(): SpinLine;

  /**
   * Serializes the SpinLine to JSON format
   * @returns JSON representation of the SpinLine
   */
  toJSON(): SpinLineJSON;

  /**
   * Deserializes a SpinLine from JSON data
   * @param json - JSON data to deserialize
   * @returns A new SpinLine instance
   */
  static deserialize(json: SpinLineJSON): SpinLine;

  /**
   * Translates the SpinLine by a vector
   * @param vector - Translation vector
   * @returns This SpinLine instance for method chaining
   */
  translate(vector: Vector): this;

  /**
   * Rotates the SpinLine around a point
   * @param angle - Rotation angle in radians
   * @param center - Center point of rotation
   * @returns This SpinLine instance for method chaining
   */
  rotate(angle: number, center: Point): this;

  /**
   * Creates inward-offset line segments
   * @param offset - Offset distance (positive moves inward)
   * @returns Array of offset line segments
   */
  inner(offset: number): Line[];

  /**
   * Creates outward-offset line segments
   * @param offset - Offset distance (positive moves outward)
   * @returns Array of offset line segments
   */
  outter(offset: number): Line[];

  /**
   * Calculates intersection points between a line and inner-offset segments
   * @param line - Line to intersect with
   * @param offset - Inward offset distance
   * @returns Array of intersection point pairs (polygon and line intersections)
   */
  innerCrossPts(line: Line, offset: number): IntersectionPoint[];

  /**
   * Drags an inner edge by a translation vector
   * @param edgeIndex - Index of the edge to drag
   * @param translation - Translation vector
   * @param param3 - Additional parameter (unused)
   * @param param4 - Additional parameter (unused)
   * @returns This SpinLine instance for method chaining
   */
  dragInnerEdge(
    edgeIndex: number,
    translation: Vector,
    param3: unknown,
    param4: unknown
  ): this;

  /**
   * Drags a vertex to a new position
   * @param vertexIndex - Index of the vertex to drag
   * @param newPosition - New position for the vertex
   * @param param3 - Additional parameter (unused)
   */
  dragVertex(vertexIndex: number, newPosition: Point, param3: unknown): void;
}