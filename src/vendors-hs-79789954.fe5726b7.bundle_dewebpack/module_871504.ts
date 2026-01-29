interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

type DistanceFunction2D = (a: Point2D, b: Point2D) => number;
type DistanceFunction3D = (a: Point3D, b: Point3D) => number;

function distance3dSquare(pointA: Point3D, pointB: Point3D): number {
  const deltaX = pointA.x - pointB.x;
  const deltaY = pointA.y - pointB.y;
  const deltaZ = pointA.z - pointB.z;
  return deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
}

function distance3d(pointA: Point3D, pointB: Point3D): number {
  const deltaX = pointA.x - pointB.x;
  const deltaY = pointA.y - pointB.y;
  const deltaZ = pointA.z - pointB.z;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}

function distance2dSquare(pointA: Point2D, pointB: Point2D): number {
  const deltaX = pointA.x - pointB.x;
  const deltaY = pointA.y - pointB.y;
  return deltaX * deltaX + deltaY * deltaY;
}

function distance2d(pointA: Point2D, pointB: Point2D): number {
  const deltaX = pointA.x - pointB.x;
  const deltaY = pointA.y - pointB.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function createFor3dVertices<T extends Point3D>(
  vertices: T[],
  distanceFunc?: DistanceFunction3D
): unknown {
  const finalDistanceFunc = distanceFunc ?? distance3d;
  return new SpatialIndex(vertices, finalDistanceFunc, ["x", "y", "z"]);
}

function createFor2dVertices<T extends Point2D>(
  vertices: T[],
  distanceFunc?: DistanceFunction2D
): unknown {
  const finalDistanceFunc = distanceFunc ?? distance2d;
  return new SpatialIndex(vertices, finalDistanceFunc, ["x", "y"]);
}

export const GeometryUtils = {
  distance3dSquare,
  distance3d,
  distance2dSquare,
  distance2d,
  createFor3dVertices,
  createFor2dVertices
};

export default GeometryUtils;