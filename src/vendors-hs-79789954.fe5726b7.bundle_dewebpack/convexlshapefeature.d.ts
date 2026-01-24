import type { ShapeType } from './ShapeType';
import type { Loop, Box2 } from './GeometryTypes';
import type { Feature } from './Feature';

/**
 * Represents a convex L-shaped feature in a geometric design system.
 * This feature is defined by five curves (a, b, c, d, e) forming an L-shape
 * and two connection curves for adjacent features.
 */
export declare class ConvexLShapeFeature extends Feature {
  /**
   * The type of shape, always ConvexL for this feature
   */
  type: ShapeType.ConvexL;

  /**
   * The display color for this feature (default: "#c104b1")
   */
  color: string;

  /**
   * The boolean operation used when cutting this shape (default: "different")
   */
  cutOperation: string;

  /**
   * First curve segment of the L-shape
   */
  a: unknown;

  /**
   * Second curve segment of the L-shape
   */
  b: unknown;

  /**
   * Third curve segment of the L-shape
   */
  c: unknown;

  /**
   * Fourth curve segment of the L-shape
   */
  d: unknown;

  /**
   * Fifth curve segment of the L-shape
   */
  e: unknown;

  /**
   * Curve connecting to the previous feature
   */
  prevConnectCurve: Curve;

  /**
   * Curve connecting to the next feature
   */
  nextConnectCurve: Curve;

  /**
   * Pattern describing the curve directions: Right, Left, Left, Left, Right, Left-Right
   */
  static readonly pattern: readonly ["R", "L", "L", "L", "R", "LR"];

  /**
   * Creates a new ConvexLShapeFeature instance.
   * @param param1 - First parameter (inherited from Feature)
   * @param shapeData - Shape data containing the curves array
   * @param param3 - Third parameter (inherited from Feature)
   */
  constructor(param1: unknown, shapeData: ShapeData, param3: unknown);

  /**
   * Internal method to close the outer loop of the shape polygon.
   * Performs a boolean difference operation between the L-shape curves
   * and a bounding box formed by the connection curves.
   * @private
   */
  private _makeLoopClosed(): void;
}

/**
 * Shape data structure containing the curves that define the feature
 */
interface ShapeData {
  /**
   * Array of curves:
   * - [0-4]: Five main curves forming the L-shape (a, b, c, d, e)
   * - [5]: Previous connection curve
   * - [6]: Next connection curve
   */
  curves: Curve[];
}

/**
 * Represents a geometric curve with start and end points
 */
interface Curve {
  /**
   * Gets the starting point of the curve
   */
  getStartPt(): Point;

  /**
   * Gets the ending point of the curve
   */
  getEndPt(): Point;
}

/**
 * Represents a 2D point
 */
interface Point {
  x: number;
  y: number;
}