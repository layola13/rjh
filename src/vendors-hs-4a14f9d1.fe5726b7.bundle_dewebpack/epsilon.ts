export const EPSILON = 1e-12;

export enum Orientation {
  CW = 1,
  CCW = -1,
  COLLINEAR = 0
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Determines the orientation of three points in 2D space
 * @param pointA - First point
 * @param pointB - Second point
 * @param pointC - Third point
 * @returns Orientation value (CW, CCW, or COLLINEAR)
 */
export function orient2d(pointA: Point, pointB: Point, pointC: Point): Orientation {
  const crossProduct = (pointA.x - pointC.x) * (pointB.y - pointC.y) - (pointA.y - pointC.y) * (pointB.x - pointC.x);
  
  if (crossProduct > -EPSILON && crossProduct < EPSILON) {
    return Orientation.COLLINEAR;
  }
  
  return crossProduct > 0 ? Orientation.CCW : Orientation.CW;
}

/**
 * Checks if a point is within the scan area defined by three other points
 * @param pointA - First boundary point
 * @param pointB - Second boundary point
 * @param pointC - Third boundary point
 * @param testPoint - Point to test
 * @returns True if the point is in the scan area
 */
export function inScanArea(pointA: Point, pointB: Point, pointC: Point, testPoint: Point): boolean {
  const crossProduct1 = (pointA.x - pointB.x) * (testPoint.y - pointB.y) - (testPoint.x - pointB.x) * (pointA.y - pointB.y);
  const crossProduct2 = (pointA.x - pointC.x) * (testPoint.y - pointC.y) - (testPoint.x - pointC.x) * (pointA.y - pointC.y);
  
  return !(crossProduct1 >= -EPSILON) && !(crossProduct2 <= EPSILON);
}

/**
 * Determines if the angle formed by three points is obtuse
 * @param pointA - Vertex point of the angle
 * @param pointB - First point forming the angle
 * @param pointC - Second point forming the angle
 * @returns True if the angle is obtuse (> 90 degrees)
 */
export function isAngleObtuse(pointA: Point, pointB: Point, pointC: Point): boolean {
  const vectorX = pointB.x - pointA.x;
  const vectorY = pointB.y - pointA.y;
  
  const dotProduct = vectorX * (pointC.x - pointA.x) + vectorY * (pointC.y - pointA.y);
  
  return dotProduct < 0;
}