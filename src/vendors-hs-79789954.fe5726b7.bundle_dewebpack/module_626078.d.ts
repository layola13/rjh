/**
 * Plane utility functions for 3D geometry operations
 */

import type * as THREE from 'three';

/**
 * Global configuration for geometric calculations
 */
interface GlobalConfig {
  /** Distance tolerance for floating-point comparisons */
  DISTANCE_TOLERENCE: number;
}

/**
 * Vector utility functions
 */
interface VectorUtils {
  /**
   * Check if two normal vectors point in the same direction
   * @param normal1 - First normal vector
   * @param normal2 - Second normal vector
   * @returns True if normals are in the same direction
   */
  isNormalSameDirection(normal1: THREE.Vector3, normal2: THREE.Vector3): boolean;

  /**
   * Check if two points are equal within tolerance
   * @param point1 - First point
   * @param point2 - Second point
   * @returns True if points are equal
   */
  isPointEqual(point1: THREE.Vector3, point2: THREE.Vector3): boolean;
}

/**
 * Line utility functions
 */
interface LineUtils {
  /**
   * Check if a point lies on a line segment
   * @param point - The point to test
   * @param lineSegment - The line segment
   * @returns True if point is on the line segment
   */
  isPointOnLineSegment(point: THREE.Vector3, lineSegment: THREE.Line3): boolean;
}

/**
 * Extended Plane interface with custom properties
 */
interface ExtendedPlane extends THREE.Plane {
  /** X-axis ray for plane coordinate system */
  xRay?: THREE.Vector3;
}

/**
 * Plane geometry utility functions
 */
interface PlaneUtils {
  /**
   * Check if two planes are the same (coplanar with same normal direction)
   * @param plane1 - First plane
   * @param plane2 - Second plane
   * @returns True if planes are the same
   */
  isTheSamePlane(plane1: THREE.Plane, plane2: THREE.Plane): boolean;

  /**
   * Check if a line (defined by two points) lies entirely on a plane
   * @param plane - The plane to test against
   * @param lineStart - Start point of the line
   * @param lineEnd - End point of the line
   * @returns True if the line is contained in the plane
   */
  planeContainsLine(plane: THREE.Plane, lineStart: THREE.Vector3, lineEnd: THREE.Vector3): boolean;

  /**
   * Find intersection point between a line segment and a plane
   * @param segmentStart - Start point of the line segment
   * @param segmentEnd - End point of the line segment
   * @param plane - The plane to intersect with
   * @returns Intersection point if exists, undefined otherwise
   */
  lineSegmentIntersectPlane(
    segmentStart: THREE.Vector3,
    segmentEnd: THREE.Vector3,
    plane: THREE.Plane
  ): THREE.Vector3 | undefined;

  /**
   * Find intersection point between an infinite line and a plane
   * @param linePoint1 - First point on the line
   * @param linePoint2 - Second point on the line
   * @param plane - The plane to intersect with
   * @returns Intersection point if exists, undefined otherwise
   */
  lineIntersectPlane(
    linePoint1: THREE.Vector3,
    linePoint2: THREE.Vector3,
    plane: THREE.Plane
  ): THREE.Vector3 | undefined;

  /**
   * Project a 3D path onto a plane's 2D coordinate system
   * @param plane - The plane with defined coordinate system (must have xRay property)
   * @param path - Array of 3D points to project
   * @returns Array of 3D vectors representing 2D coordinates (x, y) and distance from plane (z)
   */
  getProjected2DPath(plane: ExtendedPlane, path: THREE.Vector3[]): THREE.Vector3[];
}

declare const planeUtils: PlaneUtils;

export default planeUtils;
export type { PlaneUtils, ExtendedPlane, VectorUtils, LineUtils, GlobalConfig };