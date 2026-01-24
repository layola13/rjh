import { GeometryObjectType } from './GeometryObjectType';
import { Curve2d } from './Curve2d';
import { Point2d, IPoint2d, isIPoint2d } from './Point2d';
import { isNumber, isBoolean } from './TypeGuards';
import { nearlyEquals, isSamePoint, isPointOnCurve as isPointOnCurveUtil, numberInRange } from './MathUtils';

/**
 * Configuration options for generating discrete points along the arc
 */
export interface DiscretePointsOptions {
  /** Number of segments to divide the arc into */
  segments?: number;
  /** Maximum deviation allowed from the true arc */
  tolerance?: number;
}

/**
 * Interface representing an Arc2d object
 */
export interface IArc2d {
  /** Start point of the arc */
  start: IPoint2d;
  /** End point of the arc */
  end: IPoint2d;
  /** Center point of the arc */
  center: IPoint2d;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc is drawn clockwise */
  clockwise: boolean;
}

/**
 * Dumped/serialized representation of an Arc2d
 */
export interface Arc2dDumpData {
  /** Line endpoints: [start, end] */
  ln: [IPoint2d, IPoint2d];
  /** Center point */
  c: IPoint2d;
  /** Radius */
  r: number;
  /** Clockwise flag */
  cw: boolean;
  /** Geometry type identifier */
  gt: GeometryObjectType.Arc2d;
  /** Alternative geometry type identifier (legacy) */
  geoType?: GeometryObjectType.Arc2d;
}

/**
 * Represents a 2D circular arc defined by start point, end point, center, radius and direction
 */
export declare class Arc2d extends Curve2d {
  /** Start point of the arc */
  start: Point2d;
  
  /** End point of the arc */
  end: Point2d;
  
  /** Center point of the arc */
  center: Point2d;
  
  /** Radius of the arc */
  radius: number;
  
  /** Whether the arc is drawn in clockwise direction */
  clockwise: boolean;

  constructor();

  /**
   * Returns the geometry object type identifier
   * @returns GeometryObjectType.Arc2d
   */
  getType(): GeometryObjectType.Arc2d;

  /**
   * Assigns properties from another arc object
   * @param arc - Source arc object to copy from
   */
  assign(arc: IArc2d): void;

  /**
   * Creates a new Arc2d instance from the given properties
   * @param arc - Arc properties
   * @returns A new Arc2d instance
   */
  static create(arc: IArc2d): Arc2d;

  /**
   * Serializes the arc to a plain object for storage or transmission
   * @returns Serialized arc data
   */
  dump(): Arc2dDumpData;

  /**
   * Creates a deep copy of this arc
   * @returns A new Arc2d instance with the same properties
   */
  clone(): Arc2d;

  /**
   * Generates discrete points along the arc for rendering or analysis
   * @param options - Configuration options for point generation
   * @returns Array of 2D points along the arc
   */
  getDiscretePoints(options?: DiscretePointsOptions): IPoint2d[];

  /**
   * Converts this 2D arc to a THREE.js curve representation
   * @private
   * @returns THREE.js curve object
   */
  private _toThreeCurve(): any;

  /**
   * Gets a point on the arc at the specified parameter value
   * @param t - Parameter value between 0 and 1 (0 = start, 1 = end)
   * @returns Point on the arc at parameter t
   */
  getPoint(t: number): IPoint2d;

  /**
   * Checks if another curve is geometrically identical to this arc
   * @param other - Curve to compare with
   * @param tolerance - Numeric tolerance for comparison (default: HSConstants.Constants.TOLERANCE)
   * @returns True if curves are the same within tolerance
   */
  isSameCurve(other: Curve2d, tolerance?: number): boolean;

  /**
   * Creates a sub-arc with new start and end points
   * @param start - New start point
   * @param end - New end point
   * @returns New Arc2d representing the sub-arc
   */
  createSubCurve(start: IPoint2d, end: IPoint2d): Arc2d;

  /**
   * Tests if a point lies on the arc curve
   * @param point - Point to test
   * @param tolerance - Numeric tolerance for the test (default: HSConstants.Constants.TOLERANCE)
   * @returns True if the point is on the curve within tolerance
   */
  isPointOnCurve(point: IPoint2d, tolerance?: number): boolean;

  /**
   * Finds all intersection points between the arc and a horizontal line
   * @param y - Y-coordinate of the horizontal line
   * @returns Array of intersection points
   */
  hLineIntersections(y: number): IPoint2d[];
}

/**
 * Type guard to check if an object implements the IArc2d interface
 * @param obj - Object to check
 * @returns True if obj is a valid IArc2d object
 */
export declare function isIArc2d(obj: unknown): obj is IArc2d;

/**
 * Type guard to check if an object is valid Arc2d dump data
 * @param obj - Object to check
 * @returns True if obj is valid Arc2dDumpData
 */
export declare function isArc2dDumpData(obj: unknown): obj is Arc2dDumpData;