import * as THREE from 'three';

interface GlobalConfig {
  DISTANCE_TOLERENCE: number;
}

interface GlobalModule {
  global: GlobalConfig;
}

interface VectorUtils {
  isNormalSameDirection(normal1: THREE.Vector3, normal2: THREE.Vector3): boolean;
  isPointEqual(point1: THREE.Vector3, point2: THREE.Vector3): boolean;
}

interface LineUtils {
  isPointOnLineSegment(point: THREE.Vector3, line: THREE.Line3): boolean;
}

interface PlaneWithXRay extends THREE.Plane {
  xRay?: THREE.Vector3;
}

const globalModule: GlobalModule = require('./397938');
const vectorUtils: VectorUtils = require('./739465');
const lineUtils: LineUtils = require('./942674');

/**
 * Checks if two planes are the same (same normal direction and position)
 */
function isTheSamePlane(plane1: THREE.Plane, plane2: THREE.Plane): boolean {
  if (!vectorUtils.isNormalSameDirection(plane1.normal, plane2.normal)) {
    return false;
  }
  
  const point1 = plane1.normal.clone().multiplyScalar(-plane1.constant);
  const point2 = plane2.normal.clone().multiplyScalar(-plane2.constant);
  
  return vectorUtils.isPointEqual(point1, point2);
}

/**
 * Checks if a line segment is contained within a plane
 */
function planeContainsLine(
  plane: THREE.Plane,
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3
): boolean {
  const distanceToStart = plane.distanceToPoint(startPoint);
  const distanceToEnd = plane.distanceToPoint(endPoint);
  
  const tolerance = globalModule.global.DISTANCE_TOLERENCE;
  
  return distanceToStart <= tolerance && distanceToEnd <= tolerance;
}

/**
 * Calculates intersection point between a line segment and a plane
 */
function lineSegmentIntersectPlane(
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  plane: THREE.Plane
): THREE.Vector3 | undefined {
  const direction = endPoint.clone().sub(startPoint).normalize();
  const ray = new THREE.Ray(startPoint, direction);
  const intersection = ray.intersectPlane(plane, new THREE.Vector3());
  
  if (intersection && lineUtils.isPointOnLineSegment(intersection, new THREE.Line3(startPoint, endPoint))) {
    return intersection;
  }
  
  return undefined;
}

/**
 * Calculates intersection point between an infinite line and a plane
 */
function lineIntersectPlane(
  startPoint: THREE.Vector3,
  endPoint: THREE.Vector3,
  plane: THREE.Plane
): THREE.Vector3 | undefined {
  const direction = endPoint.clone().sub(startPoint).normalize();
  let ray = new THREE.Ray(startPoint, direction);
  let intersection = ray.intersectPlane(plane, new THREE.Vector3());
  
  if (intersection) {
    return intersection;
  }
  
  direction.negate();
  ray = new THREE.Ray(startPoint, direction);
  intersection = ray.intersectPlane(plane, new THREE.Vector3());
  
  return intersection ?? undefined;
}

/**
 * Projects 3D points onto a 2D coordinate system defined by a plane
 */
function getProjected2DPath(
  plane: PlaneWithXRay,
  points: THREE.Vector3[]
): THREE.Vector3[] {
  const projected: THREE.Vector3[] = [];
  
  if (!plane || !points || !plane.xRay) {
    return projected;
  }
  
  const planeOrigin = plane.normal.clone().multiplyScalar(plane.constant);
  const xAxis = plane.xRay.clone().normalize();
  const normalAxis = plane.normal.clone().normalize();
  const yAxis = normalAxis.clone().cross(xAxis).normalize();
  const correctedXAxis = yAxis.clone().cross(normalAxis).normalize();
  
  const origin = new THREE.Vector3(0, 0, 0);
  const xRay = new THREE.Ray(origin, correctedXAxis);
  const yRay = new THREE.Ray(origin, yAxis);
  const zRay = new THREE.Ray(origin, normalAxis);
  
  for (let i = 0; i < points.length; i++) {
    const translatedPoint = points[i].clone().add(planeOrigin);
    
    const xCoordinate = xRay.directionDistance(translatedPoint);
    const yCoordinate = yRay.directionDistance(translatedPoint);
    const zCoordinate = zRay.directionDistance(translatedPoint);
    
    const projectedPoint = new THREE.Vector3(xCoordinate, yCoordinate, zCoordinate);
    projected.push(projectedPoint);
  }
  
  return projected;
}

export const PlaneUtils = {
  isTheSamePlane,
  planeContainsLine,
  lineSegmentIntersectPlane,
  lineIntersectPlane,
  getProjected2DPath
};

export default PlaneUtils;