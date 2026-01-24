/**
 * Module: MathIntegration
 * Provides utilities for geometric transformations and path conversions
 */

import { Vector2, Line3d, Matrix3, MathUtil } from './math-library';

/**
 * Represents a path with an outer contour and optional holes
 */
interface PathWithHoles<T> {
  /** The outer boundary of the path */
  outer: T;
  /** Optional inner holes within the path */
  holes?: T[];
}

/**
 * Point-based path structure where contours are arrays of points
 */
type PointPath = PathWithHoles<Array<{ x: number; y: number }>>;

/**
 * Curve-based path structure where contours contain transformable curve elements
 */
interface CurvePath {
  outer: Array<{ transform(matrix: unknown): void }>;
  holes?: Array<Array<{ transform(matrix: unknown): void }>>;
}

/**
 * 4x4 transformation matrix data structure
 */
interface Matrix4Data {
  data: number[][];
}

/**
 * MathIntegration provides geometric transformation and conversion utilities
 * for working with 2D paths, curves, and transformation matrices.
 */
export declare class MathIntegration {
  /**
   * Singleton instance of MathIntegration
   */
  static readonly ins: MathIntegration;

  /**
   * Creates a new instance of MathIntegration
   */
  constructor();

  /**
   * Transforms a curve-based path (outer boundary and holes) by applying
   * a transformation matrix to all curve segments.
   * 
   * @param path - The path containing outer curves and optional hole curves
   * @param transformMatrix - The transformation matrix to apply to each curve
   * @returns The transformed path with the same structure
   */
  transformPath(
    path: CurvePath,
    transformMatrix: unknown
  ): CurvePath;

  /**
   * Transforms a point-based path by applying a transformation matrix
   * to all points in the outer boundary and holes.
   * 
   * @param pointPath - The path containing arrays of points
   * @param transformMatrix - The transformation matrix to apply
   * @returns A new path with transformed Vector2 points
   */
  transformPts(
    pointPath: PointPath,
    transformMatrix: unknown
  ): PathWithHoles<Vector2[]>;

  /**
   * Converts an array of points into a closed 3D curve made of Line3d segments.
   * Automatically closes the curve by connecting the last point to the first
   * if they are not already equal.
   * 
   * @param points - Array of points to convert into line segments
   * @returns Array of Line3d segments forming a closed curve
   */
  convertToCurve3d(points: unknown[]): Line3d[];

  /**
   * Attempts to convert a 4x4 transformation matrix to a 3x3 matrix
   * by extracting 2D transformation components (rotation, scale, translation).
   * 
   * Returns undefined if the matrix contains significant Z-axis transformations
   * (threshold: 0.001).
   * 
   * @param matrix4 - The 4x4 matrix to convert
   * @returns A 3x3 matrix if conversion is valid, undefined otherwise
   */
  convertMatrix4ToMatrix3(matrix4: Matrix4Data): Matrix3 | undefined;
}