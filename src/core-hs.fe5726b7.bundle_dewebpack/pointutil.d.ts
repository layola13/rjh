/**
 * Point utility module for managing 2D/3D points and their parent relationships
 * Provides methods for point manipulation, serialization, and parent entity queries
 */

import { Wall } from './Wall';

/**
 * Represents a 2D point in space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a 3D point in space
 */
export interface Point3D extends Point2D {
  z: number;
}

/**
 * Generic point type that can be either 2D or 3D
 */
export type Point = Point2D | Point3D;

/**
 * Entity that can have parent relationships
 */
export interface ParentAwareEntity {
  parents?: Record<string, unknown>;
}

/**
 * Edge entity from HSCore model system
 */
declare namespace HSCore.Model {
  class Edge {
    // Edge implementation details
  }
}

/**
 * Utility class for point operations including parent relationship queries,
 * point replacement, and serialization/deserialization
 */
export declare const PointUtil: {
  /**
   * Retrieves all parent Wall entities associated with a given point
   * @param point - The point entity to query for parent walls
   * @returns Array of parent Wall instances, empty if no parents exist
   */
  getParentWalls(point: ParentAwareEntity | null | undefined): Wall[];

  /**
   * Retrieves all parent Edge entities associated with a given point
   * @param point - The point entity to query for parent edges
   * @returns Array of parent Edge instances, empty if no parents exist
   */
  getParentEdges(point: ParentAwareEntity | null | undefined): HSCore.Model.Edge[];

  /**
   * Replaces occurrences of oldPoint with newPoint in parent walls if they are spatially equivalent
   * Updates wall.from and wall.to references automatically
   * @param oldPoint - The point to be replaced
   * @param newPoint - The replacement point
   */
  replace(oldPoint: Point, newPoint: Point): void;

  /**
   * Serializes an array of 2D points into a flat number array [x1, y1, x2, y2, ...]
   * @param points - Array of 2D point objects
   * @returns Flat array of coordinates, or undefined if input is invalid
   */
  savePoints2(points: Point2D[]): number[] | undefined;

  /**
   * Deserializes a flat number array into an array of 2D point objects
   * @param data - Flat array [x1, y1, x2, y2, ...] or already parsed point objects
   * @returns Array of 2D point objects
   */
  loadPoints2(data: number[] | Point2D[]): Point2D[];

  /**
   * Serializes an array of 3D points into a flat number array [x1, y1, z1, x2, y2, z2, ...]
   * @param points - Array of 3D point objects
   * @returns Flat array of coordinates, or undefined if input is invalid
   */
  savePoints3(points: Point3D[]): number[] | undefined;

  /**
   * Deserializes a flat number array into an array of 3D point objects
   * @param data - Flat array [x1, y1, z1, x2, y2, z2, ...] or already parsed point objects
   * @returns Array of 3D point objects
   */
  loadPoints3(data: number[] | Point3D[]): Point3D[];

  /**
   * Internal method for serializing points with specified dimensions
   * @internal
   * @param points - Array of point objects
   * @param dimensions - Number of dimensions (2 or 3)
   * @returns Flat array of coordinates, or undefined if input is invalid
   */
  _savePoints(points: Point[], dimensions: 2 | 3): number[] | undefined;

  /**
   * Internal method for deserializing points with specified dimensions
   * @internal
   * @param data - Flat array or already parsed point objects
   * @param dimensions - Number of dimensions (2 or 3)
   * @returns Array of point objects, or undefined if dimensions are invalid
   */
  _loadPoints(data: number[] | Point[], dimensions: 2 | 3): Point[] | undefined;
};