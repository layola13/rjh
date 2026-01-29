import { PolyCurve2d, isPolyCurve2dDumpData } from './PolyCurve2d';
import { resizeArray, isSameArray } from './ArrayUtils';
import { Vector2d } from './Vector2d';

interface DiscretePolygonOptions {
  tolerance?: number;
  maxSegmentLength?: number;
}

interface DiscretePolygon {
  outer: Vector2d[];
  holes: Vector2d[][];
}

interface Polygon2dDumpData {
  outer: unknown;
  holes: unknown[];
}

/**
 * Represents a 2D polygon with an outer boundary and optional holes
 */
export class Polygon2d {
  outer: PolyCurve2d;
  holes: PolyCurve2d[];

  constructor() {
    this.outer = new PolyCurve2d();
    this.holes = [];
  }

  /**
   * Creates a new Polygon2d instance from dump data
   */
  static create(data: Polygon2dDumpData): Polygon2d {
    const polygon = new Polygon2d();
    polygon.load(data);
    return polygon;
  }

  /**
   * Assigns values from another Polygon2d instance
   */
  assign(source: Polygon2d): void {
    this.outer.assign(source.outer);
    resizeArray(this.holes, source.holes.length, () => new PolyCurve2d());
    
    for (let i = 0; i < this.holes.length; i++) {
      this.holes[i].assign(source.holes[i]);
    }
  }

  /**
   * Loads polygon data from a serialized format
   */
  load(data: Polygon2dDumpData): void {
    this.outer.load(data.outer);
    resizeArray(this.holes, data.holes.length, () => new PolyCurve2d());
    
    for (let i = 0; i < this.holes.length; i++) {
      this.holes[i].load(data.holes[i]);
    }
  }

  /**
   * Serializes the polygon to a dump data format
   */
  dump(): Polygon2dDumpData {
    return {
      outer: this.outer.dump(),
      holes: this.holes.map(hole => hole.dump())
    };
  }

  /**
   * Creates a deep copy of this polygon
   */
  clone(): Polygon2d {
    const cloned = new Polygon2d();
    cloned.load(this.dump());
    return cloned;
  }

  /**
   * Initializes polygon from discrete point arrays
   */
  setFromDiscretePolygon(discretePolygon: DiscretePolygon): void {
    this.outer.setFromPoints(discretePolygon.outer);
    resizeArray(this.holes, discretePolygon.holes.length, () => new PolyCurve2d());
    
    for (let i = 0; i < this.holes.length; i++) {
      this.holes[i].setFromPoints(discretePolygon.holes[i]);
    }
  }

  /**
   * Converts polygon to discrete point representation
   */
  toDiscretePolygon(options: DiscretePolygonOptions = {}): DiscretePolygon {
    return {
      outer: this.outer.getDiscretePoints(options),
      holes: this.holes.map(hole => hole.getDiscretePoints(options))
    };
  }

  /**
   * Checks if a point is inside the polygon using ray casting algorithm
   */
  isPointInside(
    point: Vector2d,
    includeOutline: boolean = true,
    tolerance: number = HSConstants.Constants.TOLERANCE
  ): boolean {
    if (includeOutline && this.isPointOnOutline(point, tolerance)) {
      return true;
    }

    const intersections: Array<{ x: number }> = [];
    
    for (const polyCurve of [this.outer, ...this.holes]) {
      for (const curve of polyCurve.curves) {
        const curveIntersections = curve.hLineIntersections(point.y);
        intersections.xPushCollection(curveIntersections);
      }
    }

    let isInside = false;
    for (const intersection of intersections) {
      if (intersection.x > point.x) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  /**
   * Checks if a point lies on the polygon outline
   */
  isPointOnOutline(point: Vector2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    for (const polyCurve of [this.outer, ...this.holes]) {
      for (const curve of polyCurve.curves) {
        if (curve.isPointOnCurve(point, tolerance)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks if this polygon is geometrically identical to another
   */
  isSamePolygon2d(other: Polygon2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    if (this === other) {
      return true;
    }

    if (!this.outer.isSamePolyCurve(other.outer, tolerance)) {
      return false;
    }

    return isSameArray(
      this.holes,
      other.holes,
      false,
      (hole1, hole2) => hole1.isSamePolyCurve(hole2, tolerance)
    );
  }

  /**
   * Assigns an array of polygons from a source array
   */
  static assignArray(target: Polygon2d[], source: Polygon2d[]): void {
    resizeArray(target, source.length, () => new Polygon2d());
    
    for (let i = 0; i < target.length; i++) {
      target[i].assign(source[i]);
    }
  }

  /**
   * Loads an array of polygons from dump data
   */
  static loadArray(target: Polygon2d[], data: Polygon2dDumpData[]): void {
    resizeArray(target, data.length, () => new Polygon2d());
    
    for (let i = 0; i < target.length; i++) {
      target[i].load(data[i]);
    }
  }
}

/**
 * Type guard to check if data is valid Polygon2dDumpData
 */
export function isPolygon2dDumpData(data: unknown): data is Polygon2dDumpData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const candidate = data as Polygon2dDumpData;

  if (!isPolyCurve2dDumpData(candidate.outer)) {
    return false;
  }

  if (!Array.isArray(candidate.holes)) {
    return false;
  }

  for (const hole of candidate.holes) {
    if (!isPolyCurve2dDumpData(hole)) {
      return false;
    }
  }

  return true;
}

/**
 * Type guard to check if data is an array of valid Polygon2dDumpData
 */
export function isPolygon2dDumpDataArray(data: unknown): data is Polygon2dDumpData[] {
  if (!Array.isArray(data)) {
    return false;
  }

  for (const item of data) {
    if (!isPolygon2dDumpData(item)) {
      return false;
    }
  }

  return true;
}