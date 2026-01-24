import type { Vector2, Line2d, Arc2d, ArcType } from './math-library';
import type { ExtraordinaryCurve2d } from './ExtraordinaryCurve2d';
import type { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';

/**
 * Represents a circular arc in 2D space defined by start point, end point, center, and direction.
 * Extends the base ExtraordinaryCurve2d class.
 */
export declare class ExtraordinaryCircleArc2d extends ExtraordinaryCurve2d {
  private _from: ExtraordinaryPoint2d;
  private _to: ExtraordinaryPoint2d;
  private _center: ExtraordinaryPoint2d;
  private _isCCW: boolean;

  /**
   * Creates a new ExtraordinaryCircleArc2d instance.
   * @param from - Starting point of the arc
   * @param to - Ending point of the arc
   * @param center - Center point of the circular arc
   * @param isCCW - Whether the arc direction is counter-clockwise
   */
  constructor(
    from?: ExtraordinaryPoint2d,
    to?: ExtraordinaryPoint2d,
    center?: ExtraordinaryPoint2d,
    isCCW?: boolean
  );

  /**
   * Static factory method to create a new ExtraordinaryCircleArc2d instance.
   * @param from - Starting point of the arc
   * @param to - Ending point of the arc
   * @param center - Center point of the circular arc
   * @param isCCW - Whether the arc direction is counter-clockwise
   * @returns A new ExtraordinaryCircleArc2d instance
   */
  static create(
    from?: ExtraordinaryPoint2d,
    to?: ExtraordinaryPoint2d,
    center?: ExtraordinaryPoint2d,
    isCCW?: boolean
  ): ExtraordinaryCircleArc2d;

  /**
   * Gets the starting point of the arc.
   */
  get from(): ExtraordinaryPoint2d;

  /**
   * Sets the starting point of the arc.
   * @param from - The new starting point
   */
  setFrom(from: ExtraordinaryPoint2d): void;

  /**
   * Gets the ending point of the arc.
   */
  get to(): ExtraordinaryPoint2d;

  /**
   * Sets the ending point of the arc.
   * @param to - The new ending point
   */
  setTo(to: ExtraordinaryPoint2d): void;

  /**
   * Gets whether the arc direction is counter-clockwise.
   */
  get isCCW(): boolean;

  /**
   * Sets the arc direction.
   * @param isCCW - True for counter-clockwise, false for clockwise
   */
  setCCW(isCCW: boolean): void;

  /**
   * Gets the radius of the circular arc.
   * Calculated as the distance from the center to the starting point.
   */
  get radius(): number;

  /**
   * Gets the center point of the circular arc.
   */
  get center(): ExtraordinaryPoint2d;

  /**
   * Sets the center point of the circular arc.
   * @param center - The new center point
   */
  setCenter(center: ExtraordinaryPoint2d): void;

  /**
   * Gets the sagitta (height) of the arc.
   * The sagitta is the distance from the midpoint of the chord to the arc.
   * Calculated differently for small arcs vs large arcs.
   */
  get sagitta(): number;

  /**
   * Splits the arc at a given point into two separate arcs.
   * @param splitPoint - The point at which to split the arc
   * @returns An object containing the two resulting arc segments
   */
  split(splitPoint: ExtraordinaryPoint2d): {
    curve1: ExtraordinaryCircleArc2d;
    curve2: ExtraordinaryCircleArc2d;
  };

  /**
   * Converts this extraordinary arc to a mathematical arc representation.
   * @returns An Arc2d instance created from the start, end, center points and direction
   */
  toMathCurve(): Arc2d;
}