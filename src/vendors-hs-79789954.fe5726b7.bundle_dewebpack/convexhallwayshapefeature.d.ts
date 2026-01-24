/**
 * Module: ConvexHallwayShapeFeature
 * Provides feature detection for convex hallway shapes and function regions in architectural layouts.
 */

import { ShapeType } from './ShapeType';
import { Loop, Box2, MathAlg } from './GeometryCore';
import { HSCore } from './HSCore';
import { Feature } from './Feature';

/**
 * Represents a curve in 2D space
 */
export interface Curve2d {
  /**
   * Checks if this curve is a 2D line
   */
  isLine2d(): boolean;

  /**
   * Checks if this curve is parallel to another curve
   */
  isParallelTo(other: Curve2d): boolean;

  /**
   * Gets the direction vector of this curve
   */
  getDirection(): Direction;

  /**
   * Gets the start point of the curve
   */
  getStartPt(): Point2d;

  /**
   * Gets the end point of the curve
   */
  getEndPt(): Point2d;
}

/**
 * Represents a direction vector with reversal capability
 */
export interface Direction {
  /**
   * Returns a reversed direction vector
   */
  reversed(): Direction;

  /**
   * Checks equality with another direction
   */
  equals(other: Direction): boolean;
}

/**
 * 2D point coordinates
 */
export interface Point2d {
  x: number;
  y: number;
}

/**
 * Polygon structure containing curves
 */
export interface Polygon {
  /** Outer boundary loop of the polygon */
  outerLoop: Loop;
  /** Array of curves forming the polygon */
  curves: Curve2d[];
}

/**
 * Candidate result from pattern matching
 */
export interface MatchCandidate {
  /** Lines that form the detected pattern */
  interLines: Curve2d[];
  /** Calculated area of the detected region */
  area: number;
  /** Loop representing the closed boundary */
  loop: Loop;
}

/**
 * Feature representing a convex hallway shape in architectural plans.
 * Detects and processes rectangular hallway-like structures with parallel walls.
 */
export declare class ConvexHallwayShapeFeature extends Feature {
  /** Minimum distance threshold between parallel walls (in units) */
  static readonly distanceThreshold: number;

  /** Expected pattern of turns: Right, Left, Left, Right */
  static readonly pattern: readonly ['R', 'L', 'L', 'R'];

  /** Shape type identifier */
  type: ShapeType;

  /** Visual color representation */
  color: string;

  /** Boolean operation type for shape combination */
  cutOperation: 'different' | 'raw-different';

  /** Previous connecting curve in the boundary */
  prevConnectCurve: Curve2d;

  /** Next connecting curve in the boundary */
  nextConnectCurve: Curve2d;

  /** Internal polygon representation */
  selfPolygon: Polygon;

  /**
   * Creates a new ConvexHallwayShapeFeature instance
   * @param param1 - First construction parameter
   * @param param2 - Polygon data containing curves
   * @param param3 - Additional construction parameter
   */
  constructor(param1: unknown, param2: Polygon, param3: unknown);

  /**
   * Ensures the polygon loop is properly closed by performing boolean operations
   * @private
   */
  private _makeLoopClosed(): void;

  /**
   * Pattern matcher to detect convex hallway shapes from a polygon
   * @param polygon - Input polygon to analyze
   * @param context - Additional matching context
   * @returns Array of curves forming the detected hallway, or empty array if no match
   */
  static matcher(polygon: Polygon, context: unknown): Curve2d[];

  /**
   * Validates if the distance between two parallel curves meets the threshold
   * @param curve1 - First curve
   * @param curve2 - Second curve
   * @returns True if distance is valid
   */
  static isDistanceValid(curve1: Curve2d, curve2: Curve2d): boolean;

  /**
   * Sorts candidates by area in ascending order (smallest first)
   * @param candidates - Array of candidate matches to sort
   */
  static sortCandidates(candidates: MatchCandidate[]): void;

  /**
   * Performs post-processing validation on detected pattern
   * @param polygon - Original polygon
   * @param curves - Detected curves
   * @param context - Validation context
   * @returns True if validation passes
   */
  static postCheck(polygon: Polygon, curves: Curve2d[], context: unknown): boolean;
}

/**
 * Feature representing a functional region (e.g., room, area) in architectural plans.
 * Similar to hallway detection but prioritizes larger areas and uses different boolean operations.
 */
export declare class ConvexFunctionRegionFeature extends ConvexHallwayShapeFeature {
  /**
   * Creates a new ConvexFunctionRegionFeature instance
   * @param param1 - First construction parameter
   * @param param2 - Polygon data containing curves
   * @param param3 - Additional construction parameter
   */
  constructor(param1: unknown, param2: Polygon, param3: unknown);

  /**
   * Sorts candidates by area in descending order (largest first)
   * Overrides parent to prioritize larger functional regions
   * @param candidates - Array of candidate matches to sort
   */
  static sortCandidates(candidates: MatchCandidate[]): void;

  /**
   * Performs post-processing validation on detected functional region
   * @param polygon - Original polygon
   * @param curves - Detected curves
   * @param context - Validation context
   * @returns True if validation passes
   */
  static postCheck(polygon: Polygon, curves: Curve2d[], context: unknown): boolean;
}