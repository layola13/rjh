import { Point2D, Point3D } from './Point';

interface HalfPlane2D {
  w: Point2D;
  b: number;
}

interface HalfPlane3D {
  w: Point3D;
  b: number;
}

interface Point2DLike {
  x: number;
  y: number;
}

interface Point3DLike {
  x: number;
  y: number;
  z: number;
}

export function createIHalfPlane2D(pointA: Point2DLike, pointG: Point2DLike): HalfPlane2D {
  const direction = new Point2D(pointG.x - pointA.x, pointG.y - pointA.y);
  direction.normal().normalize();
  
  return {
    w: direction,
    b: -direction.dot(pointG)
  };
}

export function createIHalfPlane3D(
  pointA: Point3DLike,
  pointG: Point3DLike,
  pointI: Point3DLike
): HalfPlane3D {
  const vector1 = new Point3D(pointG.x - pointA.x, pointG.y - pointA.y, pointG.z - pointA.z);
  const vector2 = {
    x: pointI.x - pointA.x,
    y: pointI.y - pointA.y,
    z: pointI.z - pointA.z
  };
  
  const normal = vector1.cross(vector2);
  normal.normalize();
  
  return {
    w: normal,
    b: -normal.dot(pointA)
  };
}