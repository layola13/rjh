/**
 * Geometry utility module for processing loop points, general points, and arc points.
 * Provides methods for converting geometric data structures into usable point arrays.
 * 
 * @module GeometryUtil
 * @original-id 7031
 */

import { Vector2, Vector3 } from 'three';

/**
 * Information describing an arc segment in 3D space.
 */
interface ArcInfo {
  /** Center point of the arc */
  center: Vector3;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc follows a clockwise direction */
  clockwise: boolean;
}

/**
 * Extended Vector3 type that may contain arc information.
 */
interface Vector3WithArc extends Vector3 {
  /** Optional arc metadata attached to this point */
  arcInfo?: ArcInfo;
}

/**
 * Options for configuring arc point generation.
 */
interface ArcPointsOptions {
  /** Number of segments to divide the arc into. If not specified, calculated automatically. */
  segments?: number;
}

/**
 * A co-edge representing a directed edge in a geometric loop structure.
 */
interface CoEdge {
  /** Starting point of the edge */
  from: unknown;
  /** Optional arc information if this edge is curved */
  arcInfo?: ArcInfo;
}

/**
 * A geometric loop that can be traversed via co-edges.
 */
interface Loop {
  /** Iterates over each co-edge in the loop */
  forEachCoEdge(callback: (edge: CoEdge) => void): void;
}

/**
 * Arc geometry object from GeLib library.
 */
interface Arc {
  /** X-axis radius of the arc */
  xRadius: number;
  /** Returns the arc length */
  getLength(): number;
  /** Generates an array of points along the arc */
  getPoints(segments: number): Vector2[];
}

/**
 * Array of points with optional arc path metadata.
 */
interface PointsWithArcPaths extends Array<Vector2> {
  /** Collection of arc paths, each containing multiple points */
  readonly arcPaths: Vector2[][];
}

/**
 * Utility class for geometric operations including loop processing, 
 * point extraction, and arc interpolation.
 */
export interface GeometryUtil {
  /**
   * Extracts and processes points from a geometric loop.
   * Converts co-edges to points and handles arc interpolation.
   * 
   * @param loop - The geometric loop to process
   * @returns Array of processed points, or empty array if input is invalid
   */
  getLoopPoints(loop: Loop | null | undefined): Vector2[] | PointsWithArcPaths;

  /**
   * Processes an array of points, optionally treating them as a closed loop.
   * Interpolates arc segments when arc information is present.
   * 
   * @param points - Array of input points (may include arc metadata)
   * @param isClosedLoop - Whether to treat the points as a closed loop (default: true)
   * @returns Processed point array with arc interpolation, or null if input is invalid
   */
  getPoints(
    points: Vector3WithArc[] | null | undefined,
    isClosedLoop?: boolean
  ): PointsWithArcPaths | null;

  /**
   * Generates interpolated points along an arc curve.
   * Automatically calculates segment count if not provided.
   * 
   * @param arc - The arc geometry to interpolate
   * @param options - Optional configuration for segment count
   * @returns Array of points along the arc
   */
  getArcPoints(arc: Arc, options?: ArcPointsOptions): Vector2[];
}

/**
 * Singleton instance of GeometryUtil providing geometric processing capabilities.
 */
export declare const GeometryUtil: GeometryUtil;