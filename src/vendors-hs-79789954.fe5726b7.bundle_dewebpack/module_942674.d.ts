/**
 * Line segment utilities for 3D geometry operations
 * Provides functions for line intersection, position detection, and geometric calculations
 */

import * as THREE from 'three';

/**
 * Position type of a point relative to a line segment
 */
export enum PositionType {
  /** Point is not on the line */
  NONE = 0,
  /** Point is at the start of the line segment */
  START = 1,
  /** Point is at the end of the line segment */
  END = 2,
  /** Point is between start and end of the line segment */
  BETWEEN = 3,
  /** Point is on the line but outside the segment (extended line) */
  EXTEND = 4
}

/**
 * Information about the intersection of two line segments
 */
export interface IntersectionInfo {
  /** The intersection point */
  intersect: THREE.Vector3;
  /** Position type of the intersection point on the first line segment */
  positionType1: PositionType;
  /** Position type of the intersection point on the second line segment */
  positionType2: PositionType;
}

/**
 * Information about the intersection with parametric values
 */
export interface IntersectionInfo2 {
  /** The intersection point */
  intersect: THREE.Vector3;
  /** Parameter t on the first line segment (0 = start, 1 = end) */
  param1: number;
  /** Parameter t on the second line segment (0 = start, 1 = end) */
  param2: number;
}

/**
 * Get the intersection point of two line segments in 3D space
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param checkCoplanar - Whether to check if lines are coplanar (default: true)
 * @returns The intersection point if exists, undefined otherwise
 */
export function getIntersectionPoint(
  line1: THREE.Line3,
  line2: THREE.Line3,
  checkCoplanar?: boolean
): THREE.Vector3 | undefined;

/**
 * Convert two points to a THREE.Line3 object
 * @param start - Start point
 * @param end - End point
 * @returns A THREE.Line3 object
 */
export function toTHREELine3(start: THREE.Vector3, end: THREE.Vector3): THREE.Line3;

/**
 * Get the intersection point of two line segments with extension control
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param ignoreExtend1 - Whether to ignore extended intersections on line1
 * @param ignoreExtend2 - Whether to ignore extended intersections on line2
 * @param checkCoplanar - Whether to check if lines are coplanar
 * @returns The intersection point if exists within constraints, undefined otherwise
 */
export function getIntersection(
  line1: THREE.Line3,
  line2: THREE.Line3,
  ignoreExtend1?: boolean,
  ignoreExtend2?: boolean,
  checkCoplanar?: boolean
): THREE.Vector3 | undefined;

/**
 * Get detailed intersection information including position types
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param checkCoplanar - Whether to check if lines are coplanar
 * @returns Intersection information if exists, undefined otherwise
 */
export function getIntersectionInfo(
  line1: THREE.Line3,
  line2: THREE.Line3,
  checkCoplanar?: boolean
): IntersectionInfo | undefined;

/**
 * Get detailed intersection information including parametric values
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param checkCoplanar - Whether to check if lines are coplanar
 * @returns Intersection information with parameters if exists, undefined otherwise
 */
export function getIntersectionInfo2(
  line1: THREE.Line3,
  line2: THREE.Line3,
  checkCoplanar?: boolean
): IntersectionInfo2 | undefined;

/**
 * Check if point is on the left side of a line in 2D space
 * @param lineStart - Start point of the line
 * @param lineEnd - End point of the line
 * @param point - Point to check
 * @returns Positive if left, negative if right, zero if on the line
 */
export function isLeft2D(
  lineStart: THREE.Vector2 | THREE.Vector3,
  lineEnd: THREE.Vector2 | THREE.Vector3,
  point: THREE.Vector2 | THREE.Vector3
): number;

/**
 * Check if a position type indicates the point is on the line segment
 * @param positionType - The position type to check
 * @returns True if position is START, END, or BETWEEN
 */
export function isPositionTypeOnLineSegment(positionType: PositionType): boolean;

/**
 * Check if a point lies on a line (including extended line)
 * @param point - The point to check
 * @param line - The line
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the point is on the line
 */
export function isPointOnLine(
  point: THREE.Vector3,
  line: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Check if a point lies on a line segment (excluding extensions)
 * @param point - The point to check
 * @param lineSegment - The line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the point is on the line segment
 */
export function isPointOnLineSegment(
  point: THREE.Vector3,
  lineSegment: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Check if a point is strictly inside a line segment (excluding endpoints)
 * @param point - The point to check
 * @param lineSegment - The line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the point is between start and end
 */
export function isPointInsideLineSegment(
  point: THREE.Vector3,
  lineSegment: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Get the position type of a point relative to a line segment
 * @param point - The point to check
 * @param lineSegment - The line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns The position type
 */
export function getPositionType(
  point: THREE.Vector3,
  lineSegment: THREE.Line3,
  tolerance?: number
): PositionType;

/**
 * Check if two line segments are identical (same start and end points)
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the line segments are the same
 */
export function isSameLineSegments(
  line1: THREE.Line3,
  line2: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Check if two line segments lie on the same infinite line
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the line segments are collinear
 */
export function isSameLines(
  line1: THREE.Line3,
  line2: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Check if two line segments overlap (share any common portion)
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @param tolerance - Distance tolerance for comparison
 * @returns True if the segments overlap
 */
export function isSegmentsOverlapped(
  line1: THREE.Line3,
  line2: THREE.Line3,
  tolerance?: number
): boolean;

/**
 * Get the overlapped segment of two line segments
 * @param line1 - First line segment
 * @param line2 - Second line segment
 * @returns The overlapped segment if exists, undefined otherwise
 */
export function getOverlappedSegment(
  line1: THREE.Line3,
  line2: THREE.Line3
): THREE.Line3 | undefined;

/**
 * Get the closest point on a line segment to a given point
 * If the closest point is outside the segment, returns the nearest endpoint
 * @param lineSegment - The line segment
 * @param point - The point
 * @returns The closest point on the segment
 */
export function getClosestPointOfSegment(
  lineSegment: THREE.Line3,
  point: THREE.Vector3
): THREE.Vector3;

/**
 * Calculate the distance from a point to a line
 * @param point - The point
 * @param line - The line
 * @returns The perpendicular distance
 */
export function distanceToLine(point: THREE.Vector3, line: THREE.Line3): number;