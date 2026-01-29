export enum GeometryObjectType {
  Point2d = 'Point2d'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export interface IPoint2d {
  x: number;
  y: number;
}

/**
 * Represents a point in 2D space with x and y coordinates
 */
export class Point2d implements IPoint2d {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a new Point2d instance from an IPoint2d object
   */
  static create(point: IPoint2d): Point2d {
    return new Point2d(point.x, point.y);
  }

  /**
   * Sets the x and y coordinates of this point
   */
  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the geometry object type identifier
   */
  getType(): GeometryObjectType {
    return GeometryObjectType.Point2d;
  }

  /**
   * Assigns coordinates from another point to this point
   */
  assign(point: IPoint2d): void {
    this.set(point.x, point.y);
  }

  /**
   * Serializes the point to an array format
   */
  dump(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * Loads coordinates from an IPoint2d object
   */
  load(point: IPoint2d): void {
    this.assign(point);
  }

  /**
   * Creates a deep copy of this point
   */
  clone(): Point2d {
    return Point2d.create(this);
  }
}

/**
 * Type guard to check if a value is an IPoint2d object
 */
export function isIPoint2d(value: unknown): value is IPoint2d {
  return !!value && 
         typeof value === 'object' &&
         isNumber((value as IPoint2d).x) && 
         isNumber((value as IPoint2d).y);
}

/**
 * Type guard to check if a value is an array of IPoint2d objects
 */
export function isIPoint2dArray(value: unknown): value is IPoint2d[] {
  if (!Array.isArray(value)) return false;
  
  for (const item of value) {
    if (!isIPoint2d(item)) return false;
  }
  
  return true;
}

/**
 * Type guard to check if a value is a 2D array of IPoint2d objects
 */
export function isIPoint2dArrayArray(value: unknown): value is IPoint2d[][] {
  if (!Array.isArray(value)) return false;
  
  for (const item of value) {
    if (!isIPoint2dArray(item)) return false;
  }
  
  return true;
}

/**
 * Creates a deep copy of an array of points
 */
export function clonePoint2ds<T extends IPoint2d[] | undefined>(points: T): T {
  return points 
    ? (points.map(point => ({ x: point.x, y: point.y })) as T)
    : points;
}