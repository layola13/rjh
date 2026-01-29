import * as THREE from 'three';

interface Point2D {
  x: number;
  y: number;
  z?: number;
}

interface ScreenPoint {
  x: number;
  y: number;
}

interface ProjectionPlane {
  normal: THREE.Vector3;
  constant: number;
  xRay: THREE.Vector3;
}

interface GlobalConfig {
  DISTANCE_SQ_TOLERENCE: number;
  VECTOR_EQUAL_TOLERANCE: number;
}

interface VectorWithSource extends THREE.Vector3 {
  source: THREE.Vector3;
  dot: number;
}

type UnitAxis = 'x' | 'y' | 'z' | '-x' | '-y' | '-z';

const GLOBAL_CONFIG: GlobalConfig = {
  DISTANCE_SQ_TOLERENCE: 0.000001,
  VECTOR_EQUAL_TOLERANCE: 0.000001
};

/**
 * Converts a 2D or 3D point object to THREE.Vector3
 */
function toTHREEVector3(point: Point2D): THREE.Vector3 {
  const z = point.z ?? 0;
  return new THREE.Vector3(point.x, point.y, z);
}

/**
 * Creates a vector from two points
 */
function toTHREEVector3ByTwoPoints(startPoint: Point2D, endPoint: Point2D): THREE.Vector3 {
  const start = toTHREEVector3(startPoint);
  const end = toTHREEVector3(endPoint);
  return end.sub(start);
}

/**
 * Checks if two points are equal within tolerance
 */
function isPointEqual(point1: THREE.Vector3 | null, point2: THREE.Vector3 | null, tolerance?: number): boolean {
  if (!point1 || !point2) {
    return false;
  }
  
  const distanceToleranceSq = tolerance !== undefined 
    ? tolerance * tolerance 
    : GLOBAL_CONFIG.DISTANCE_SQ_TOLERENCE;
  
  return point1.distanceToSquared(point2) < distanceToleranceSq;
}

/**
 * Checks if two vectors are parallel
 */
function isParallel(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean {
  const normalized1 = vector1.clone().normalize();
  const normalized2 = vector2.clone().normalize();
  return isNormalParallel(normalized1, normalized2, tolerance);
}

/**
 * Checks if two normalized vectors are parallel
 */
function isNormalParallel(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean {
  const vectorTolerance = tolerance ?? GLOBAL_CONFIG.VECTOR_EQUAL_TOLERANCE;
  const dotProduct = normal1.dot(normal2);
  return Math.abs(1 - Math.abs(dotProduct)) <= vectorTolerance;
}

/**
 * Checks if two vectors are perpendicular
 */
function isPerpendicular(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean {
  const normalized1 = vector1.clone().normalize();
  const normalized2 = vector2.clone().normalize();
  return isNormalPerpendicular(normalized1, normalized2, tolerance);
}

/**
 * Checks if two normalized vectors are perpendicular
 */
function isNormalPerpendicular(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean {
  const vectorTolerance = tolerance ?? GLOBAL_CONFIG.VECTOR_EQUAL_TOLERANCE;
  const dotProduct = normal1.dot(normal2);
  return Math.abs(dotProduct) <= vectorTolerance;
}

/**
 * Checks if two vectors point in the same direction
 */
function isSameDirection(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean {
  const normalized1 = vector1.clone().normalize();
  const normalized2 = vector2.clone().normalize();
  return isNormalSameDirection(normalized1, normalized2, tolerance);
}

/**
 * Checks if two normalized vectors point in the same direction
 */
function isNormalSameDirection(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean {
  const vectorTolerance = tolerance ?? GLOBAL_CONFIG.VECTOR_EQUAL_TOLERANCE;
  const dotProduct = normal1.dot(normal2);
  return dotProduct >= 0 && Math.abs(1 - dotProduct) <= vectorTolerance;
}

/**
 * Checks if two vectors point in opposite directions
 */
function isOpposite(vector1: THREE.Vector3, vector2: THREE.Vector3, tolerance?: number): boolean {
  const normalized1 = vector1.clone().normalize();
  const normalized2 = vector2.clone().normalize();
  return isNormalOpposite(normalized1, normalized2, tolerance);
}

/**
 * Adjusts a normal to point in the same general direction as a reference vector
 */
function adjustNormal(normal: THREE.Vector3, reference: THREE.Vector3): THREE.Vector3 {
  const adjusted = normal.clone();
  if (adjusted.dot(reference) < 0) {
    adjusted.negate();
  }
  return adjusted;
}

/**
 * Checks if two normalized vectors point in opposite directions
 */
function isNormalOpposite(normal1: THREE.Vector3, normal2: THREE.Vector3, tolerance?: number): boolean {
  const vectorTolerance = tolerance ?? GLOBAL_CONFIG.VECTOR_EQUAL_TOLERANCE;
  const dotProduct = normal1.dot(normal2);
  return Math.abs(1 + dotProduct) <= vectorTolerance;
}

/**
 * Gets a vector perpendicular to the input vector
 */
function getPerpendicularVector(vector: THREE.Vector3, referenceNormal?: THREE.Vector3): THREE.Vector3 {
  const normalized = vector.clone().normalize();
  const reference = referenceNormal ?? createReferenceNormal(normalized);
  return new THREE.Vector3().crossVectors(reference, normalized);
}

/**
 * Checks if vector1 is on the left of vector2
 */
function isOnLeft(vector1: THREE.Vector3, vector2: THREE.Vector3, referenceNormal?: THREE.Vector3): boolean {
  const normalized1 = vector1.clone().normalize();
  const normalized2 = vector2.clone().normalize();
  const reference = referenceNormal ?? createReferenceNormal(normalized2);
  
  const cross = normalized2.clone().cross(normalized1);
  const lengthSq = cross.lengthSq();
  
  if (lengthSq <= 0) {
    return false;
  }
  
  return isSameDirection(cross, reference);
}

/**
 * Checks if vector1 is on the right of vector2
 */
function isOnRight(vector1: THREE.Vector3, vector2: THREE.Vector3, referenceNormal?: THREE.Vector3): boolean {
  return !isOnLeft(vector1, vector2, referenceNormal) && !isParallel(vector1, vector2);
}

/**
 * Sorts vectors from left to right relative to a reference vector
 */
function sortLeftToRight(vectors: THREE.Vector3[], referenceVector: THREE.Vector3, referenceNormal?: THREE.Vector3): THREE.Vector3[] {
  const normalizedReference = referenceVector.clone().normalize();
  const reference = referenceNormal ?? createReferenceNormal(normalizedReference);
  
  const vectorsWithMetadata = vectors.map((vector): VectorWithSource => {
    const normalized = vector.clone().normalize() as VectorWithSource;
    normalized.source = vector;
    normalized.dot = 0;
    return normalized;
  });
  
  vectorsWithMetadata.forEach((vector) => {
    const cross = normalizedReference.clone().cross(vector);
    const crossLengthSq = cross.lengthSq();
    let dotValue = normalizedReference.dot(vector);
    
    const isBackward = (crossLengthSq > 0 && !isSameDirection(cross, reference)) || 
                       isNormalOpposite(vector, normalizedReference);
    
    if (isBackward) {
      dotValue = 2 - dotValue;
    }
    
    vector.dot = dotValue;
  });
  
  vectorsWithMetadata.sort((a, b) => {
    if (a.dot < b.dot) return -1;
    if (a.dot > b.dot) return 1;
    return 0;
  });
  
  return vectorsWithMetadata.map((vector) => vector.source);
}

/**
 * Creates a reference normal vector for calculations
 */
function createReferenceNormal(vector: THREE.Vector3): THREE.Vector3 {
  let reference = new THREE.Vector3(0, 0, 1);
  
  if (isNormalParallel(vector, reference)) {
    reference = new THREE.Vector3(0, 1, 0);
  }
  
  return reference;
}

/**
 * Calculates the angle between two vectors relative to a normal
 */
function angleTo(vector1: THREE.Vector3, vector2: THREE.Vector3, normal: THREE.Vector3): number {
  const cross = new THREE.Vector3();
  cross.crossVectors(vector1, vector2);
  
  let angle = vector1.angleTo(vector2);
  
  if (cross.dot(normal) < 0) {
    angle = 2 * Math.PI - angle;
  }
  
  return angle;
}

/**
 * Gets a unit vector for a given axis
 */
function getUnitVector3(axis: UnitAxis): THREE.Vector3 {
  switch (axis) {
    case 'z':
      return new THREE.Vector3(0, 0, 1);
    case 'y':
      return new THREE.Vector3(0, 1, 0);
    case 'x':
      return new THREE.Vector3(1, 0, 0);
    case '-x':
      return new THREE.Vector3(-1, 0, 0);
    case '-y':
      return new THREE.Vector3(0, -1, 0);
    case '-z':
      return new THREE.Vector3(0, 0, -1);
  }
}

/**
 * Calculates angle between vectors in range [0, 2π]
 */
function angleToIn2PI(vector1: THREE.Vector3, vector2: THREE.Vector3, referenceNormal?: THREE.Vector3): number {
  let angle = vector1.angleTo(vector2);
  
  const isNotCollinear = angle !== 0 && angle !== Math.PI;
  
  if (isNotCollinear) {
    const cross = vector1.clone().cross(vector2).normalize();
    const reference = referenceNormal ?? new THREE.Vector3(0, 0, 1);
    
    if (!isNormalSameDirection(cross, reference)) {
      angle = 2 * Math.PI - angle;
    }
  }
  
  return angle;
}

/**
 * Projects a 3D point onto a 2D plane coordinate system
 */
function projection2DPoint(plane: ProjectionPlane, point: THREE.Vector3): THREE.Vector3 {
  const planeOrigin = plane.normal.clone().multiplyScalar(plane.constant);
  const xAxis = plane.xRay.clone().normalize();
  const normalAxis = plane.normal.clone().normalize();
  const yAxis = normalAxis.clone().cross(xAxis).normalize();
  const correctedXAxis = yAxis.clone().cross(normalAxis).normalize();
  
  const origin = new THREE.Vector3(0, 0, 0);
  const xRay = new THREE.Ray(origin, correctedXAxis);
  const yRay = new THREE.Ray(origin, yAxis);
  const zRay = new THREE.Ray(origin, normalAxis);
  
  const translatedPoint = point.clone().add(planeOrigin);
  
  const xDistance = xRay.distanceToPoint(translatedPoint) ?? 0;
  const yDistance = yRay.distanceToPoint(translatedPoint) ?? 0;
  const zDistance = zRay.distanceToPoint(translatedPoint) ?? 0;
  
  return new THREE.Vector3(xDistance, yDistance, zDistance);
}

/**
 * Converts a 3D model point to 2D screen coordinates
 */
function modelPointToScreenPoint(point: THREE.Vector3, camera: THREE.Camera): ScreenPoint {
  const projected = point.clone();
  projected.project(camera);
  
  const screenX = (projected.x + 1) / 2;
  const screenY = (1 - projected.y) / 2;
  
  return {
    x: screenX * window.innerWidth,
    y: screenY * window.innerHeight
  };
}

export {
  toTHREEVector3,
  toTHREEVector3ByTwoPoints,
  isPointEqual,
  isParallel,
  isNormalParallel,
  isPerpendicular,
  isNormalPerpendicular,
  isSameDirection,
  isNormalSameDirection,
  isOpposite,
  adjustNormal,
  isNormalOpposite,
  getPerpendicularVector,
  isOnLeft,
  isOnRight,
  sortLeftToRight,
  createReferenceNormal as _createReferenceNormal,
  angleTo,
  getUnitVector3,
  angleToIn2PI,
  projection2DPoint,
  modelPointToScreenPoint
};