import * as THREE from 'three';

export enum PositionType {
  NONE = 0,
  START = 1,
  END = 2,
  BETWEEN = 3,
  EXTEND = 4
}

interface IntersectionInfo {
  intersect: THREE.Vector3;
  positionType1: PositionType;
  positionType2: PositionType;
}

interface IntersectionInfo2 {
  intersect: THREE.Vector3;
  param1: number;
  param2: number;
}

interface Vector3WithParam extends THREE.Vector3 {
  param?: number;
}

const DISTANCE_SQ_TOLERANCE = 1e-10;
const VECTOR_EQUAL_TOLERANCE = 1e-6;

function getPolygonNormal(points: THREE.Vector3[]): THREE.Vector3 | null {
  if (points.length < 3) return null;
  
  const edge1 = new THREE.Vector3().subVectors(points[1], points[0]);
  const edge2 = new THREE.Vector3().subVectors(points[2], points[0]);
  const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();
  
  return normal.lengthSq() > 0 ? normal : null;
}

function isNormalParallel(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  const cross = new THREE.Vector3().crossVectors(normal1, normal2);
  return cross.lengthSq() < tolerance * tolerance;
}

function isNormalSameDirection(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  const dot = normal1.dot(normal2);
  return dot > 1 - tolerance;
}

function toTHREEVector3(point: THREE.Vector3 | { x: number; y: number; z: number }): THREE.Vector3 {
  if (point instanceof THREE.Vector3) return point;
  return new THREE.Vector3(point.x, point.y, point.z);
}

function isPointEqual(point1: THREE.Vector3, point2: THREE.Vector3, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  return point1.distanceToSquared(point2) < tolerance * tolerance;
}

function smallerOrEqual(value: number, target: number, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  return value < target || Math.abs(value - target) < tolerance;
}

function largerOrEqual(value: number, target: number, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  return value > target || Math.abs(value - target) < tolerance;
}

function smaller(value: number, target: number, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  return value < target && Math.abs(value - target) >= tolerance;
}

function larger(value: number, target: number, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  return value > target && Math.abs(value - target) >= tolerance;
}

function isInRange(value: number, min: number, max: number, excludeMin: boolean = false, excludeMax: boolean = false, tolerance: number = VECTOR_EQUAL_TOLERANCE): boolean {
  const minCheck = excludeMin ? larger(value, min, tolerance) : largerOrEqual(value, min, tolerance);
  const maxCheck = excludeMax ? smaller(value, max, tolerance) : smallerOrEqual(value, max, tolerance);
  return minCheck && maxCheck;
}

/**
 * Get intersection point between two line segments
 */
export function getIntersectionPoint(line1: THREE.Line3, line2: THREE.Line3, checkCoplanar: boolean = true): THREE.Vector3 | undefined {
  if (checkCoplanar) {
    const normal1 = getPolygonNormal([line1.start, line1.end, line2.start]);
    const normal2 = getPolygonNormal([line1.start, line1.end, line2.end]);
    
    if (normal1 && normal2 && !isNormalParallel(normal1, normal2)) {
      return undefined;
    }
  }

  const direction1 = line1.end.clone().sub(line1.start).normalize();
  const direction2 = line2.end.clone().sub(line2.start).normalize();

  if (isNormalParallel(direction1, direction2)) {
    return undefined;
  }

  const perpendicular = direction1.clone().cross(direction2).cross(direction1);
  const plane = new THREE.Plane();
  plane.setFromNormalAndCoplanarPoint(perpendicular, line1.start);

  const forwardRay = new THREE.Ray(line2.start, direction2);
  const backwardRay = new THREE.Ray(line2.start, direction2.clone().negate());

  const intersection = forwardRay.intersectPlane(plane, new THREE.Vector3()) ?? 
                       backwardRay.intersectPlane(plane, new THREE.Vector3());

  return intersection ?? undefined;
}

/**
 * Convert two points to THREE.Line3
 */
export function toTHREELine3(start: THREE.Vector3, end: THREE.Vector3): THREE.Line3 {
  const startVector = toTHREEVector3(start);
  const endVector = toTHREEVector3(end);
  return new THREE.Line3(startVector, endVector);
}

/**
 * Get intersection point with optional extend flags
 */
export function getIntersection(line1: THREE.Line3, line2: THREE.Line3, excludeExtend1: boolean, excludeExtend2: boolean, checkCoplanar?: boolean): THREE.Vector3 | undefined {
  const info = getIntersectionInfo(line1, line2, checkCoplanar);
  
  if (!info) return undefined;

  const { positionType1, positionType2, intersect } = info;

  if (positionType1 === PositionType.NONE || positionType2 === PositionType.NONE) {
    return undefined;
  }

  if (positionType1 === PositionType.EXTEND && excludeExtend1) {
    return undefined;
  }

  if (positionType2 === PositionType.EXTEND && excludeExtend2) {
    return undefined;
  }

  return intersect;
}

/**
 * Get intersection info with position types
 */
export function getIntersectionInfo(line1: THREE.Line3, line2: THREE.Line3, checkCoplanar?: boolean): IntersectionInfo | undefined {
  const intersectionPoint = getIntersectionPoint(line1, line2, checkCoplanar);
  
  if (!intersectionPoint) return undefined;

  return {
    intersect: intersectionPoint,
    positionType1: getPositionTypeSimple(intersectionPoint, line1),
    positionType2: getPositionTypeSimple(intersectionPoint, line2)
  };
}

/**
 * Get intersection info with parameters
 */
export function getIntersectionInfo2(line1: THREE.Line3, line2: THREE.Line3, checkCoplanar?: boolean): IntersectionInfo2 | undefined {
  const intersectionPoint = getIntersectionPoint(line1, line2, checkCoplanar);
  
  if (!intersectionPoint) return undefined;

  return {
    intersect: intersectionPoint,
    param1: line1.closestPointToPointParameter(intersectionPoint, true),
    param2: line2.closestPointToPointParameter(intersectionPoint, true)
  };
}

/**
 * Check if point is on the left side of a line in 2D
 */
export function isLeft2D(lineStart: THREE.Vector3, lineEnd: THREE.Vector3, point: THREE.Vector3): number {
  return (lineEnd.x - lineStart.x) * (point.y - lineStart.y) - (point.x - lineStart.x) * (lineEnd.y - lineStart.y);
}

/**
 * Check if position type is on line segment
 */
export function isPositionTypeOnLineSegment(positionType: PositionType): boolean {
  return positionType === PositionType.START || 
         positionType === PositionType.END || 
         positionType === PositionType.BETWEEN;
}

/**
 * Check if point is on line (infinite)
 */
export function isPointOnLine(point: THREE.Vector3, line: THREE.Line3, tolerance?: number): boolean {
  const closestPoint = line.closestPointToPoint(point, true, new THREE.Vector3());
  if (!closestPoint) return false;

  const distanceSq = point.distanceToSquared(closestPoint);
  const toleranceSq = tolerance !== undefined ? tolerance * tolerance : DISTANCE_SQ_TOLERANCE;

  return smallerOrEqual(distanceSq, toleranceSq);
}

/**
 * Check if point is on line segment
 */
export function isPointOnLineSegment(point: THREE.Vector3, line: THREE.Line3, tolerance?: number): boolean {
  if (!isPointOnLine(point, line, tolerance)) return false;

  const param = line.closestPointToPointParameter(point, true);
  return isInRange(param, 0, 1, false, false, tolerance);
}

/**
 * Check if point is inside line segment (excluding endpoints)
 */
export function isPointInsideLineSegment(point: THREE.Vector3, line: THREE.Line3, tolerance?: number): boolean {
  const tol = tolerance ?? VECTOR_EQUAL_TOLERANCE;
  return getPositionType(point, line, tol) === PositionType.BETWEEN;
}

/**
 * Get position type of point relative to line
 */
export function getPositionType(point: THREE.Vector3, line: THREE.Line3, tolerance?: number): PositionType {
  const tol = tolerance ?? VECTOR_EQUAL_TOLERANCE;
  return isPointOnLine(point, line, tol) 
    ? getPositionTypeSimple(point, line, tol) 
    : PositionType.NONE;
}

/**
 * Get position type assuming point is on line
 */
function getPositionTypeSimple(point: THREE.Vector3, line: THREE.Line3, tolerance?: number): PositionType {
  const tol = tolerance ?? VECTOR_EQUAL_TOLERANCE;

  if (isPointEqual(point, line.start)) return PositionType.START;
  if (isPointEqual(point, line.end)) return PositionType.END;

  const directionToEnd = point.clone().sub(line.start).normalize();
  const directionFromPoint = line.end.clone().sub(point).normalize();

  if (isNormalSameDirection(directionToEnd, directionFromPoint, tol)) {
    return PositionType.BETWEEN;
  }

  if (isNormalParallel(directionToEnd, directionFromPoint, tol)) {
    return PositionType.EXTEND;
  }

  return PositionType.NONE;
}

/**
 * Check if two line segments are the same
 */
export function isSameLineSegments(line1: THREE.Line3, line2: THREE.Line3, tolerance?: number): boolean {
  return (isPointEqual(line1.start, line2.start, tolerance) && isPointEqual(line1.end, line2.end, tolerance)) ||
         (isPointEqual(line1.start, line2.end, tolerance) && isPointEqual(line1.end, line2.start, tolerance));
}

/**
 * Check if two lines are the same (infinite lines)
 */
export function isSameLines(line1: THREE.Line3, line2: THREE.Line3, tolerance?: number): boolean {
  return isPointOnLine(line1.start, line2, tolerance) && isPointOnLine(line1.end, line2, tolerance);
}

/**
 * Check if two line segments overlap
 */
export function isSegmentsOverlapped(line1: THREE.Line3, line2: THREE.Line3, tolerance?: number): boolean {
  function hasPointInside(baseLine: THREE.Line3, testLine: THREE.Line3): boolean {
    const endpoints = [testLine.start, testLine.end];
    const filtered = endpoints.filter(endpoint => 
      !isPointEqual(endpoint, baseLine.start, tolerance) && 
      !isPointEqual(endpoint, baseLine.end, tolerance)
    );

    return filtered.some(endpoint => {
      const param = baseLine.closestPointToPointParameter(endpoint, true);
      return isInRange(param, 0, 1, true, true);
    });
  }

  if (isSameLineSegments(line1, line2, tolerance)) return true;
  if (!isSameLines(line1, line2, tolerance)) return false;
  
  return hasPointInside(line1, line2) || hasPointInside(line2, line1);
}

/**
 * Get overlapped segment between two line segments
 */
export function getOverlappedSegment(line1: THREE.Line3, line2: THREE.Line3): THREE.Line3 | undefined {
  const start1 = line1.start.clone() as Vector3WithParam;
  start1.param = 0;

  const end1 = line1.end.clone() as Vector3WithParam;
  end1.param = 1;

  const start2 = line2.start.clone() as Vector3WithParam;
  start2.param = line1.closestPointToPointParameter(line2.start, true);

  const end2 = line2.end.clone() as Vector3WithParam;
  end2.param = line1.closestPointToPointParameter(line2.end, true);

  if ((largerOrEqual(start2.param, 1) && largerOrEqual(end2.param, 1)) ||
      (smallerOrEqual(start2.param, 0) && smallerOrEqual(end2.param, 0))) {
    return undefined;
  }

  const allPoints = [start1, end1, start2, end2];
  allPoints.sort((a, b) => smallerOrEqual(a.param!, b.param!) ? -1 : 1);

  const overlapStart = allPoints[1];
  const overlapEnd = allPoints[2];

  return new THREE.Line3(overlapStart, overlapEnd);
}

/**
 * Get closest point on line segment to a point
 */
export function getClosestPointOfSegment(line: THREE.Line3, point: THREE.Vector3): THREE.Vector3 {
  const closestPoint = line.closestPointToPoint(point, true, new THREE.Vector3());
  const param = line.closestPointToPointParameter(closestPoint, true);

  if (larger(param, 1)) return line.end;
  if (smaller(param, 0)) return line.start;
  
  return closestPoint;
}

/**
 * Get distance from point to line (infinite)
 */
export function distanceToLine(point: THREE.Vector3, line: THREE.Line3): number {
  const closestPoint = line.closestPointToPoint(point, true, new THREE.Vector3());
  return point.distanceTo(closestPoint);
}