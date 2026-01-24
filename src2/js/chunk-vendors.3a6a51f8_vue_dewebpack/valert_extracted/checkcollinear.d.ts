/**
 * 2D point coordinate interface
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Check if three points are collinear (lie on the same straight line)
 * Uses the midpoint theorem: if point t is the midpoint of e and n,
 * then 2*t = e + n
 * 
 * @param e - First point
 * @param t - Middle point to check
 * @param n - Third point
 * @returns True if the three points are collinear
 */
export function checkCollinear(e: Point, t: Point, n: Point): boolean;

/**
 * Calculate the Euclidean distance between two points
 * Uses the distance formula: √((x₂-x₁)² + (y₂-y₁)²)
 * 
 * @param startPoint - Starting point
 * @param endPoint - Ending point
 * @returns The distance between the two points
 */
export function getDistance(startPoint: Point, endPoint: Point): number;

/**
 * Move from one point toward another by a specified distance
 * Calculates a point that is 'distance' units away from 'from' in the direction of 'to'
 * 
 * @param from - Starting point
 * @param to - Target direction point
 * @param distance - Distance to move toward the target
 * @returns New point at the specified distance from 'from' toward 'to'
 */
export function moveTo(from: Point, to: Point, distance: number): Point;