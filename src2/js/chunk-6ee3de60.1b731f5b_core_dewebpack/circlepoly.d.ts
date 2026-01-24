import type { Point } from './Point';
import type { Matrix } from './Matrix';
import type { Arc } from './Arc';
import type { WinPolygon, PolyType } from './WinPolygon';

/**
 * Circle polygon representation
 * Extends WinPolygon to provide circular geometry functionality
 */
export interface CirclePoly extends WinPolygon {
  /**
   * Center point of the circle
   */
  cpt: Point;

  /**
   * Radius of the circle
   */
  radius: number;

  /**
   * Flag indicating if dimension control is enabled
   * Always returns true for circles
   * @readonly
   */
  readonly controlDimFlag: true;

  /**
   * Creates a deep clone of this circle polygon
   * @returns A new CirclePoly instance with cloned center point and same radius
   */
  _clone(): CirclePoly;

  /**
   * Serializes the circle polygon to JSON format
   * @returns JSON representation including type, center point, and radius
   */
  toJSON(): {
    type: PolyType.circle;
    cpt: ReturnType<Point['toJSON']>;
    radius: number;
    [key: string]: unknown;
  };

  /**
   * Scales the circle by a factor
   * @param scaleFactor - Scaling factor to apply
   * @returns This circle after scaling
   */
  scale(scaleFactor: number): this;

  /**
   * Translates the circle by a vector
   * @param offset - Translation vector
   * @returns This circle after translation
   */
  translate(offset: Point): this;

  /**
   * Rotates the circle around a point
   * @param angle - Rotation angle
   * @param pivot - Point to rotate around
   * @returns This circle after rotation
   */
  rotate(angle: number, pivot: Point): this;

  /**
   * Modifies the circle by dragging an edge
   * @param edgeIndex - Index of the edge being dragged
   * @param offset - Drag offset vector
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New CirclePoly with updated radius
   */
  dragEdge(edgeIndex: number, offset: Point, referencePoint?: Point): CirclePoly;

  /**
   * Modifies the circle by dragging a vertex
   * @param vertexIndex - Index of the vertex being dragged
   * @param offset - Drag offset vector
   * @param edgeIndex - Associated edge index
   * @param referencePoint - Optional reference point for the drag operation
   * @returns New CirclePoly with updated radius
   */
  dragVertex(
    vertexIndex: number,
    offset: Point,
    edgeIndex: number,
    referencePoint?: Point
  ): CirclePoly;

  /**
   * Modifies the circle by dragging along an arc
   * @param arcIndex - Index of the arc being dragged
   * @param offset - Drag offset vector
   * @returns New CirclePoly with updated radius based on dragged position
   */
  dragArc(arcIndex: number, offset: Point): CirclePoly;

  /**
   * Initializes dimension information for the circle
   * Sets the first dimension to be visible
   * @returns Array of dimension information objects
   */
  initDimInfo(): Array<{ dimShow: boolean; [key: string]: unknown }>;

  /**
   * Edits the circle dimensions by applying a transformation
   * @param dimIndex - Index of the dimension being edited
   * @param scaleFactor - Scaling factor to apply
   * @param value - New dimension value
   * @returns New CirclePoly with updated dimensions
   */
  editDim(dimIndex: number, scaleFactor: number, value: number): CirclePoly;
}

/**
 * CirclePoly constructor interface
 */
export interface CirclePolyConstructor {
  /**
   * Creates a new CirclePoly instance
   * @param centerPoint - Center point of the circle
   * @param radius - Radius of the circle
   * @param edges - Optional array of edges (will be generated if not provided)
   */
  new (centerPoint: Point, radius: number, edges?: Arc[]): CirclePoly;

  /**
   * Factory method to create edges for a circle
   * @param centerPoint - Center point of the circle
   * @param radius - Radius of the circle
   * @returns Array containing a single arc representing the circle
   */
  create(centerPoint: Point, radius: number): [Arc];
}

/**
 * CirclePoly class for representing circular polygons
 */
export const CirclePoly: CirclePolyConstructor;