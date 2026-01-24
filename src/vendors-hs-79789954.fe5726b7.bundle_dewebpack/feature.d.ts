/**
 * Feature detection module for shape pattern matching in 2D geometry.
 * Provides base class for identifying geometric features in polygons.
 * 
 * @module Feature
 * @originalId 841436
 */

import type { Loop, Curve2d, Polygon, MathAlg } from './math-types';
import type { ShapeType } from './shape-types';

/**
 * Pattern direction types for curve angle matching
 */
type PatternDirection = 'L' | 'R' | 'LR';

/**
 * Result of overlap detection between feature and floor curves
 */
interface OverlapResult {
  /** The curve from the feature */
  featureCurve: Curve2d;
  /** The curve from the floor context */
  floorCurve: Curve2d;
  /** The overlapping portion of the curves */
  overlapCurve: Curve2d;
  /** Reference to the feature instance */
  feature: Feature;
}

/**
 * Cut operation types for feature processing
 */
type CutOperation = 'different' | 'union' | 'intersect' | 'subtract';

/**
 * Context information for floor-related operations
 */
interface FloorContext {
  // Add specific floor context properties as needed
  [key: string]: unknown;
}

/**
 * Base class for geometric feature detection in 2D polygons.
 * Uses pattern matching on curve tangent angles to identify specific shapes.
 * 
 * @example
 *