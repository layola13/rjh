import { Point, Vector, Line, Segment, Arc, Matrix, Polygon } from './geometry';
import { CutLine, CutLineType, CompoundLineCut, PointCut } from './cutline';
import { Utils } from './utils';
import { PolyParser } from './parser';
import { ShapeElement, Splitter } from './shape';
import { ToolType } from './tools';

/**
 * Represents the orientation of a polygon or line
 */
export enum Orientation {
  Clockwise = 1,
  CounterClockwise = -1
}

/**
 * Represents a cross point between a line and a polygon
 */
export interface CrossPoint {
  /** Point on the polygon */
  poly: Point;
  /** Point on the line */
  line: Point;
}

/**
 * Serialized representation of a CompoundLine
 */
export interface CompoundLineJSON {
  /** Type identifier */
  name: CutLineType.compoundLine;
  /** Index of the inner edge being manipulated */
  innerEdgeIdx: number;
  /** Index of the outer edge being manipulated */
  outerEdgeIdx: number;
  /** Array of serialized simple lines */
  slines: unknown[];
  /** Serialized polygon data */
  polygon: unknown;
}

/**
 * CompoundLine represents a complex cutting line composed of multiple simple lines
 * and an inner polygon. It extends CutLine to provide advanced geometric operations
 * for architectural or design applications.
 */
export declare class CompoundLine extends CutLine {
  /** Array of simple lines composing the compound line */
  private slines: Line[];
  
  /** Inner polygon associated with this compound line */
  private innerPoly: Polygon;
  
  /** Cached cross points between lines and polygons */
  private crossPts: CrossPoint[];
  
  /** Utility for cutting operations on points */
  private ptCutor: PointCut;
  
  /** Index of the inner edge currently being edited (-1 if none) */
  innerEdgeIdx: number;
  
  /** Index of the outer edge currently being edited (-1 if none) */
  outerEdgeIdx: number;

  /**
   * Creates a new CompoundLine instance
   * @param slines - Array of at least 2 simple lines
   * @param innerPoly - Inner polygon with at least 1 edge
   * @param type - Optional cut line type identifier
   * @throws {Error} If slines has fewer than 2 elements or innerPoly has no edges
   */
  constructor(slines: Line[], innerPoly: Polygon, type?: CutLineType);

  /**
   * Gets a specific line from the compound line
   * @param index - Zero-based index of the line
   * @returns The line at the specified index
   */
  line(index: number): Line;

  /**
   * Gets the orientation of the inner polygon
   */
  get orien(): Orientation;

  /**
   * Gets the start point of the compound line (first line's point)
   */
  get start(): Point;

  /**
   * Gets the end point of the compound line (second line's point)
   */
  get end(): Point;

  /**
   * Gets the center point of the inner polygon's bounding box
   */
  get pt(): Point;

  /**
   * Gets the middle point (alias for pt)
   */
  get mpt(): Point;

  /**
   * Indicates whether the start point can be controlled
   */
  get constrolStart(): boolean;

  /**
   * Indicates whether the end point can be controlled
   */
  get constrolEnd(): boolean;

  /**
   * Indicates whether an arc should be shown (when innerEdgeIdx is valid)
   */
  get showArc(): boolean;

  /**
   * Splits the compound line at a specified point
   * @param point - Point where the split occurs
   * @param param - Additional split parameters
   * @returns Result of the split operation
   */
  split(point: Point, param: unknown): unknown;

  /**
   * Creates a deep copy of this compound line
   * @returns A new CompoundLine with cloned lines and polygon
   */
  clone(): CompoundLine;

  /**
   * Serializes the compound line to JSON
   * @returns JSON representation of the compound line
   */
  toJSON(): CompoundLineJSON;

  /**
   * Deserializes a CompoundLine from JSON data
   * @param json - Serialized compound line data
   * @returns Reconstructed CompoundLine instance
   */
  static deserialize(json: CompoundLineJSON): CompoundLine;

  /**
   * Translates the compound line by a vector
   * @param vector - Translation vector
   * @returns This compound line (for chaining)
   */
  translate(vector: Vector): this;

  /**
   * Rotates the compound line around a point
   * @param angle - Rotation angle in radians
   * @param center - Center point of rotation
   * @returns This compound line (for chaining)
   */
  rotate(angle: number, center: Point): this;

  /**
   * Creates an array of inner offset lines
   * @param distance - Distance to offset inward (normal direction negated)
   * @returns Array of offset lines
   */
  inner(distance: number): Line[];

  /**
   * Creates an array of outer offset lines
   * @param distance - Distance to offset outward (normal direction)
   * @returns Array of offset lines
   */
  outter(distance: number): Line[];

  /**
   * Locates a polygon relative to cross points and sets its position ID
   * @param polygon - Polygon to locate
   */
  locatePoly(polygon: Polygon): void;

  /**
   * Calculates cross points between inner offset lines and a polygon
   * @param polygon - Polygon to intersect with
   * @param distance - Offset distance for inner lines
   * @returns Array of cross points
   * @throws {Error} If no intersection points are found
   */
  innerCrossPts(polygon: Polygon, distance: number): CrossPoint[];

  /**
   * Creates a linked chain of shape elements between two points
   * @param startPoint - Starting point of the link
   * @param fromPoint - Point to link from
   * @param toPoint - Point to link to
   * @param orientation - Direction of traversal
   * @returns Array of linked shape elements
   * @throws {Error} If start point is not found in cut points
   */
  createLink(
    startPoint: Point,
    fromPoint: Point,
    toPoint: Point,
    orientation: Orientation
  ): ShapeElement[];

  /**
   * Creates a frame structure with bars around the inner polygon
   * @param thickness - Thickness of the frame bars
   * @returns Array of polygons representing bars and the inner polygon
   */
  frametifyInner(thickness: number): Polygon[];

  /**
   * Drags an inner edge and updates the compound line geometry
   * @param edgeIndex - Index of the edge to drag
   * @param dragVector - Vector representing the drag movement
   * @param dragPoint - Point where the drag occurs
   * @param constraints - Array of constraint polygons
   * @returns New CompoundLine with updated geometry, or this if out of bounds
   */
  dragInnerEdge(
    edgeIndex: number,
    dragVector: Vector,
    dragPoint: Point,
    constraints: Array<{ polygon: Polygon }>
  ): CompoundLine;

  /**
   * Checks if the compound line is outside all constraint polygons
   * @param polygon - Polygon to check
   * @param constraints - Array of constraint polygons
   * @returns True if polygon is not contained by any constraint
   */
  private isCompoundLineOut(
    polygon: Polygon,
    constraints: Array<{ polygon: Polygon }>
  ): boolean;

  /**
   * Helper method for dragging inner edges with scaling transform
   * @param edgeIndex - Index of the edge being dragged
   * @param dragVector - Vector representing the drag movement
   * @param dragPoint - Point where the drag occurs
   * @returns Tuple of [transformed lines, transformed polygon, scale factor]
   * @throws {Error} If drag direction is reversed
   */
  private dragInnerEdgeHelper(
    edgeIndex: number,
    dragVector: Vector,
    dragPoint: Point
  ): [Line[], Polygon, number];

  /**
   * Drags an arc edge of the inner polygon
   * @param edgeIndex - Index of the arc edge to drag
   * @param dragVector - Vector representing the drag movement
   * @param dragPoint - Point where the drag occurs
   * @returns New CompoundLine with updated arc geometry
   */
  dragArc(edgeIndex: number, dragVector: Vector, dragPoint: Point): CompoundLine;
}