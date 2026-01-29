import { Point2d, isIPoint2dArray, isIPoint2dArrayArray, IPoint2d } from './Point2d';
import { BoundingBox2D, isSamePolygon2D } from './GeometryUtils';
import { resizeArray } from './ArrayUtils';

export interface DiscretePolygon2dData {
  outer: IPoint2d[];
  holes: IPoint2d[][];
}

export function isDiscretePolygon2dData(data: unknown): data is DiscretePolygon2dData {
  if (!data) return false;
  
  const { outer, holes } = data as DiscretePolygon2dData;
  return !!(isIPoint2dArray(outer)) && !!(isIPoint2dArrayArray(holes));
}

export function isDiscretePolygon2dArrayData(data: unknown): data is DiscretePolygon2dData[] {
  if (!data) return false;
  if (!Array.isArray(data)) return false;
  
  for (const item of data) {
    if (!isDiscretePolygon2dData(item)) return false;
  }
  
  return true;
}

function assignPoints(target: Point2d[], source: IPoint2d[]): void {
  resizeArray(target, source.length, () => new Point2d());
  
  for (let i = 0; i < target.length; i++) {
    target[i].assign(source[i]);
  }
}

function assignHoles(target: Point2d[][], source: IPoint2d[][]): void {
  resizeArray(target, source.length, () => new Array<Point2d>());
  
  for (let i = 0; i < target.length; i++) {
    assignPoints(target[i], source[i]);
  }
}

export class DiscretePolygon2d {
  outer: Point2d[];
  holes: Point2d[][];

  constructor(outer: IPoint2d[], holes: IPoint2d[][] = []) {
    this.outer = [];
    this.holes = [];
    this.assign(outer, holes);
  }

  static create(outer: IPoint2d[], holes: IPoint2d[][] = []): DiscretePolygon2d {
    return new DiscretePolygon2d(outer, holes);
  }

  assign(outer: IPoint2d[], holes: IPoint2d[][] = []): void {
    assignPoints(this.outer, outer);
    assignHoles(this.holes, holes);
  }

  getArea(): number {
    return DiscretePolygon2d.getArea([this]);
  }

  getBound(): BoundingBox2D {
    return DiscretePolygon2d.getBound([this]);
  }

  static isSamePolygon(polygon1: DiscretePolygon2d, polygon2: DiscretePolygon2d): boolean {
    if (!isSamePolygon2D(polygon1.outer, polygon2.outer)) return false;
    if (polygon1.holes.length !== polygon2.holes.length) return false;
    
    for (const hole of polygon1.holes) {
      if (!polygon2.holes.find(otherHole => isSamePolygon2D(hole, otherHole))) {
        return false;
      }
    }
    
    return true;
  }

  static isSamePolygons(polygons1: DiscretePolygon2d[], polygons2: DiscretePolygon2d[]): boolean {
    if (polygons1.length !== polygons2.length) return false;
    
    for (const polygon of polygons1) {
      if (!polygons2.find(otherPolygon => DiscretePolygon2d.isSamePolygon(polygon, otherPolygon))) {
        return false;
      }
    }
    
    return true;
  }

  static getArea(polygons: DiscretePolygon2d[]): number {
    let totalArea = 0;
    
    for (const polygon of polygons) {
      totalArea += GeLib.PolygonUtils.getArea(polygon.outer);
      
      for (const hole of polygon.holes) {
        totalArea -= GeLib.PolygonUtils.getArea(hole);
      }
    }
    
    return totalArea;
  }

  static getBound(polygons: DiscretePolygon2d[]): BoundingBox2D {
    const allPoints: IPoint2d[] = [];
    
    for (const polygon of polygons) {
      allPoints.push(...polygon.outer);
      polygon.holes.forEach(hole => allPoints.push(...hole));
    }
    
    return BoundingBox2D.getBound(allPoints);
  }

  static verify(polygons: DiscretePolygon2d[]): void {
    for (const polygon of polygons) {
      if (HSCore.Util.Math.isClockwise(polygon.outer)) {
        polygon.outer.reverse();
      }
      
      polygon.holes.forEach(hole => {
        if (!HSCore.Util.Math.isClockwise(hole)) {
          hole.reverse();
        }
      });
    }
  }
}