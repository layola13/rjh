/**
 * Geometry module for polygon operations and shape type definitions.
 * Provides polygon manipulation, curve closing, and boolean operations.
 */

import { Loop, Line2d, MathAlg } from './geometry-core';
import { HSCore } from './hs-core';

/**
 * Shape type enumeration for various polygon classifications.
 * Used to categorize different geometric region types.
 */
export enum ShapeType {
  /** Concave U-shaped region */
  ConcaveU = "ConcaveU",
  /** Convex U-shaped region */
  ConvexU = "ConvexU",
  /** Convex hallway-shaped region */
  ConvexHallway = "ConvexHallway",
  /** Convex right half U-shaped region */
  ConvexRightHalfU = "ConvexRightHalfU",
  /** Convex left half U-shaped region */
  ConvexLeftHalfU = "ConvexLeftHalfU",
  /** Convex L-shaped region */
  ConvexL = "ConvexL",
  /** Unsupported shape type */
  Unsupported = "Unsupported",
  /** Convex U region variant */
  ConvexURegion = "ConvexURegion",
  /** Convex right half U region variant */
  ConvexRightHalfURegion = "ConvexRightHalfURegion",
  /** Convex left half U region variant */
  ConvexLeftHalfURegion = "ConvexLeftHalfURegion",
  /** Convex square region */
  ConvexSquareRegion = "ConvexSquareRegion",
  /** Expandable region */
  ExpandRegion = "ExpandRegion",
  /** Passageway-shaped region */
  PassageWayShape = "PassageWayShape",
  /** Functional region */
  FunctionRegion = "FunctionRegion"
}

/**
 * Curve overlap result types that indicate total or partial overlap.
 * Used for curve intersection and overlap detection.
 */
export declare const CURVE_CURVE_OVERLAP_RESULTS: readonly [
  MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP,
  MathAlg.CurveCuvePositonType.OVERLAP
];

/**
 * Type alias for geometric curves (lines, arcs, etc.)
 */
export type Curve = Line2d | Arc2d | any; // Extend as needed

/**
 * Boolean operation types for polygon cutting.
 */
export type CutOperation = 
  | "different"   // Difference (A - B)
  | "union"       // Union (A ∪ B)
  | "intersect"   // Intersection (A ∩ B)
  | "raw-different"; // Raw difference with curve subdivision

/**
 * Configuration for polygon cutting operations.
 */
export interface CutConfig {
  /** The polygon to use in the cut operation */
  selfPolygon: Polygon;
  /** The type of boolean operation to perform */
  cutOperation: CutOperation;
}

/**
 * Point interface representing 2D coordinates.
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Polygon class representing a closed 2D geometric region.
 * Supports boolean operations (union, difference, intersection) and area calculation.
 */
export declare class Polygon {
  /** Array of curves forming the polygon boundary */
  readonly curves: Curve[];
  
  /** Outer loop representing the polygon boundary */
  readonly outerLoop: Loop;

  /**
   * Creates a new Polygon from an array of curves.
   * @param curves - Array of curves that define the polygon boundary
   */
  constructor(curves: Curve[]);

  /**
   * Performs a boolean cut operation with another polygon.
   * @param config - Configuration specifying the target polygon and operation type
   * @returns A new polygon resulting from the boolean operation
   */
  cut(config: CutConfig): Polygon;

  /**
   * Creates a deep copy of this polygon.
   * @returns A new Polygon instance with cloned curves
   */
  clone(): Polygon;

  /**
   * Calculates the area of the polygon.
   * @returns The area in square units
   */
  get area(): number;
}

/**
 * Closes open curve sequences by inserting line segments where gaps exist.
 * Iteratively connects disconnected endpoints until the loop is closed.
 * 
 * @param curves - Array of curves that may not form a closed loop
 * @returns Array of curves with additional line segments to close gaps
 * 
 * @remarks
 * - Clones input curves to avoid mutation
 * - Inserts Line2d segments between disconnected endpoints
 * - Continues until Loop.isClosed() returns true
 * - Returns original curves if already closed
 */
export declare function makeCurvesClosed(curves: Curve[]): Curve[];

/**
 * Splits a curve based on overlap with another curve.
 * Used internally for raw-different operations.
 * 
 * @param baseCurve - The curve to be split
 * @param overlappingCurve - The curve defining split points
 * @returns Array of curve segments with overlapping portions subdivided
 * 
 * @remarks
 * - Filters out segments shorter than 0.001 units
 * - Handles direction alignment automatically
 * - Returns original curve if no valid split points found
 * 
 * @internal
 */
declare function splitCurveByOverlap(
  baseCurve: Curve,
  overlappingCurve: Curve
): Curve[];