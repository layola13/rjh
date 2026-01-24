/**
 * Module: ConvexURegionFeature
 * Provides feature classes for detecting and processing various convex region shapes
 * including U-shaped, square, and expandable regions in floor plans.
 */

import { ShapeType, makeCurvesClosed } from './shape-types';
import { Box2, Loop, Line2d, MathAlg } from './geometry';
import { HSCore } from './hs-core';
import { Feature } from './feature-base';
import { RegionUtil } from './region-util';

/**
 * Pattern matching result for region detection
 */
interface PatternMatchResult {
  curves: Curve[];
}

/**
 * Hint box for region detection
 */
interface HintBox {
  box: Box2;
  marginedBox: Box2;
}

/**
 * Floor context containing hint boxes for region detection
 */
interface FloorContext {
  hintBoxes: HintBox[];
}

/**
 * Polygon structure with outer loop
 */
interface Polygon {
  outerLoop: Loop;
  curves: Curve[];
}

/**
 * Geometric curve interface
 */
interface Curve {
  getStartPt(): Point;
  getEndPt(): Point;
  getMidPt(): Point;
  getMidTangent(): Vector;
  clone(): Curve;
}

/**
 * 2D point
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 2D vector with angle calculation
 */
interface Vector {
  angleTo(other: Vector): number;
}

/**
 * Input polygon with curves
 */
interface InputPolygon {
  curves: Curve[];
}

/**
 * Matching context for feature detection
 */
interface MatchingContext {
  hintBoxes: HintBox[];
}

/**
 * Base class for convex U-shaped region features.
 * Detects and processes U-shaped regions with configurable turn patterns.
 */
export declare class ConvexURegionFeature extends Feature {
  /**
   * Turn pattern for matching: Right, Left, Left, Right
   */
  static pattern: string[];
  
  type: ShapeType;
  color: string;
  cutOperation: 'different';
  
  /**
   * First curve segment of the U-shape
   */
  a: Curve;
  
  /**
   * Second curve segment of the U-shape
   */
  b: Curve;
  
  /**
   * Third curve segment of the U-shape
   */
  c: Curve;
  
  /**
   * Curve connecting to the previous feature
   */
  prevConnectCurve: Curve;
  
  /**
   * Curve connecting to the next feature
   */
  nextConnectCurve: Curve;
  
  /**
   * Self-contained polygon representation
   */
  selfPolygon: Polygon;
  
  /**
   * Source polygon before feature extraction
   */
  fromPolygon: Polygon;
  
  /**
   * Floor context for spatial analysis
   */
  floorContext: FloorContext;

  /**
   * Creates a new ConvexURegionFeature instance
   * @param arg1 - First constructor argument
   * @param matchResult - Pattern matching result containing curves
   * @param context - Floor context for spatial operations
   */
  constructor(arg1: unknown, matchResult: PatternMatchResult, context: FloorContext);

  /**
   * Matches the pattern against input curves to detect U-shaped regions
   * @param polygon - Input polygon with curves to analyze
   * @param context - Matching context with hint boxes
   * @returns Array of matched curves, or empty array if no match
   */
  static matcher(polygon: InputPolygon, context: MatchingContext): Curve[];

  /**
   * Post-processing validation check after pattern matching
   * @param polygon - Input polygon
   * @param curves - Matched curve segments
   * @param context - Matching context
   * @returns True if validation passes
   */
  static postCheck(polygon: InputPolygon, curves: Curve[], context: MatchingContext): boolean;

  /**
   * Ensures the feature's loop is properly closed by computing convex hull
   * and performing geometric operations
   * @private
   */
  private _makeLoopClosed(): void;
}

/**
 * Feature representing a right half U-shaped region.
 * Pattern: Right, Left, Left, Left
 */
export declare class ConvexRightHalfURegionFeature extends ConvexURegionFeature {
  static type: ShapeType;
  static pattern: string[];
  color: string;
}

/**
 * Feature representing a left half U-shaped region.
 * Pattern: Left, Left, Left, Left, Right
 */
export declare class ConvexLeftHalfURegionFeature extends ConvexURegionFeature {
  static type: ShapeType;
  static pattern: string[];
  color: string;
}

/**
 * Feature representing a square-shaped convex region.
 * Pattern: Left, Left, Left, Left
 */
export declare class ConvexSquareRegionFeature extends ConvexURegionFeature {
  static type: ShapeType;
  static pattern: string[];
  color: string;
}

/**
 * Feature representing an expandable region that grows to contain hint boxes.
 * Uses iterative curve addition to expand until hint boxes are enclosed.
 */
export declare class ExpandRegionFeature extends Feature {
  type: ShapeType;
  color: string;
  cutOperation: 'different';
  selfPolygon: Polygon;
  fromPolygon: Polygon;
  floorContext: FloorContext;

  /**
   * Creates a new ExpandRegionFeature instance
   * @param arg1 - First constructor argument
   * @param matchResult - Pattern matching result containing curves
   * @param context - Floor context for spatial operations
   */
  constructor(arg1: unknown, matchResult: PatternMatchResult, context: FloorContext);

  /**
   * Matches curves by iteratively expanding to contain hint boxes
   * @param polygon - Input polygon with curves to analyze
   * @param context - Matching context with hint boxes
   * @returns Array of curves forming the expanded region, or empty array if no match
   */
  static matcher(polygon: InputPolygon, context: MatchingContext): Curve[];

  /**
   * Validates that the expanded region contains hint boxes
   * @param polygon - Input polygon
   * @param curves - Selected curve segments
   * @param context - Matching context
   * @returns True if region contains at least 85% of hint boxes
   */
  static postCheck(polygon: InputPolygon, curves: Curve[], context: MatchingContext): boolean;

  /**
   * Completes the region by computing convex hull over curves and hint box corners
   * @private
   */
  private _makeLoopClosed(): void;
}

/**
 * Helper function to sort curves by connection priority to target curves
 * @param referencePoint - Reference point for distance calculations
 * @param targetCurves - Curves to check connection against
 * @param candidateCurves - Curves to sort
 * @param tolerance - Connection tolerance distance (default: 0.001)
 * @returns Sorted array with connected curves first, then by distance
 */
declare function sortCurvesByConnectionPriority(
  referencePoint: Point,
  targetCurves: Curve[],
  candidateCurves: Curve[],
  tolerance?: number
): Curve[];