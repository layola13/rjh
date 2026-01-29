export const EPSILON = 1e-12;

export const Orientation = {
  CW: 1,
  CCW: -1,
  COLLINEAR: 0
} as const;

export type OrientationType = typeof Orientation[keyof typeof Orientation];

export interface Point {
  x: number;
  y: number;
}

export function orient2d(a: Point, b: Point, c: Point): OrientationType {
  const determinant = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
  
  if (determinant > -EPSILON && determinant < EPSILON) {
    return Orientation.COLLINEAR;
  }
  
  return determinant > 0 ? Orientation.CCW : Orientation.CW;
}

export function inScanArea(a: Point, b: Point, c: Point, d: Point): boolean {
  const crossProduct1 = (a.x - b.x) * (d.y - b.y) - (d.x - b.x) * (a.y - b.y);
  const crossProduct2 = (a.x - c.x) * (d.y - c.y) - (d.x - c.x) * (a.y - c.y);
  
  return crossProduct1 < -EPSILON && crossProduct2 > EPSILON;
}

export function isAngleObtuse(a: Point, b: Point, c: Point): boolean {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dotProduct = dx * (c.x - a.x) + dy * (c.y - a.y);
  
  return dotProduct < 0;
}