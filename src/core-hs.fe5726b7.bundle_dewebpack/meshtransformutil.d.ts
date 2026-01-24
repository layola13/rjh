/**
 * Utility class for transforming mesh positions using matrix transformations.
 * Provides methods for 2D and 3D coordinate transformations.
 * 
 * @module MeshTransformUtil
 */

/**
 * Represents a 3D point with x, y, z coordinates.
 */
export interface Point3D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
}

/**
 * A 4x4 transformation matrix in column-major order.
 * Used for 3D transformations (translation, rotation, scale, projection).
 * 
 * Layout:
 * [0, 4,  8, 12]
 * [1, 5,  9, 13]
 * [2, 6, 10, 14]
 * [3, 7, 11, 15]
 */
export type Matrix4x4 = readonly number[] | number[];

/**
 * A 3x3 transformation matrix in column-major order.
 * Used for 2D transformations (translation, rotation, scale).
 * 
 * Layout:
 * [0, 3, 6]
 * [1, 4, 7]
 * [2, 5, 8]
 */
export type Matrix3x3 = readonly number[] | number[];

/**
 * Utility class for applying matrix transformations to mesh vertex positions.
 * All transformation methods modify arrays in-place for performance.
 */
export declare class MeshTransformUtil {
  /**
   * Transforms an array of 3D positions using a 4x4 transformation matrix.
   * Positions are stored as [x1, y1, z1, x2, y2, z2, ...].
   * 
   * @param positions - Flat array of 3D coordinates (modified in-place)
   * @param matrix - 4x4 transformation matrix in column-major order
   * 
   * @example
   * const positions = [1, 0, 0, 0, 1, 0];
   * const identityMatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
   * MeshTransformUtil.transformPositions3d(positions, identityMatrix);
   */
  static transformPositions3d(positions: number[], matrix: Matrix4x4): void;

  /**
   * Transforms 3D positions to 2D by applying a 4x4 matrix and projecting to XY plane.
   * Input is [x1,y1,z1, x2,y2,z2, ...], output is [x1,y1, x2,y2, ...].
   * 
   * @param positions3d - Source array of 3D coordinates (not modified)
   * @param positions2d - Target array for 2D coordinates (modified in-place)
   * @param matrix - 4x4 transformation matrix in column-major order
   * 
   * @example
   * const positions3d = [1, 2, 3, 4, 5, 6];
   * const positions2d = new Array(4);
   * const matrix = [...]; // 4x4 matrix
   * MeshTransformUtil.transformPositions3dTo2d(positions3d, positions2d, matrix);
   * // positions2d now contains [x1, y1, x2, y2]
   */
  static transformPositions3dTo2d(
    positions3d: number[],
    positions2d: number[],
    matrix: Matrix4x4
  ): void;

  /**
   * Transforms an array of 2D positions using a 3x3 transformation matrix.
   * Positions are stored as [x1, y1, x2, y2, ...].
   * 
   * @param positions - Flat array of 2D coordinates (modified in-place)
   * @param matrix - 3x3 transformation matrix in column-major order
   * 
   * @example
   * const positions = [10, 20, 30, 40];
   * const translateMatrix = [1,0,0, 0,1,0, 5,5,1]; // translate by (5,5)
   * MeshTransformUtil.transformPositions2d(positions, translateMatrix);
   */
  static transformPositions2d(positions: number[], matrix: Matrix3x3): void;

  /**
   * Transforms a single 3D point using a 4x4 matrix.
   * Modifies the input point object in-place.
   * 
   * @param point - The 3D point to transform (modified in-place)
   * @param matrix - 4x4 transformation matrix in column-major order
   * @returns The transformed point (same reference as input)
   * 
   * @example
   * const point = { x: 1, y: 0, z: 0 };
   * const matrix = [...]; // rotation matrix
   * MeshTransformUtil.transformXYZ(point, matrix);
   * // point is now modified
   */
  static transformXYZ(point: Point3D, matrix: Matrix4x4): Point3D;

  /**
   * Creates a new transformed copy of a 3D point using a 4x4 matrix.
   * Does not modify the input point.
   * 
   * @param point - The source 3D point (not modified)
   * @param matrix - 4x4 transformation matrix in column-major order
   * @returns A new transformed point object
   * 
   * @example
   * const original = { x: 1, y: 2, z: 3 };
   * const matrix = [...]; // transformation matrix
   * const transformed = MeshTransformUtil.transformedXYZ(original, matrix);
   * // original is unchanged, transformed contains new coordinates
   */
  static transformedXYZ(point: Point3D, matrix: Matrix4x4): Point3D;
}