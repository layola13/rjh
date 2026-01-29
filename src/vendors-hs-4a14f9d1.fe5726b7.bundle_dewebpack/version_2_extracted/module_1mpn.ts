export interface Point2D {
  x: number;
  y: number;
}

export class Point {
  public x: number;
  public y: number;
  public _p2t_edge_list: unknown;

  constructor(x?: number, y?: number) {
    this.x = +x || 0;
    this.y = +y || 0;
    this._p2t_edge_list = null;
  }

  public toString(): string {
    return `Point(${this.x}, ${this.y})`;
  }

  public toJSON(): Point2D {
    return {
      x: this.x,
      y: this.y
    };
  }

  public clone(): Point {
    return new Point(this.x, this.y);
  }

  public set_zero(): this {
    this.x = 0;
    this.y = 0;
    return this;
  }

  public set(x?: number, y?: number): this {
    this.x = +x || 0;
    this.y = +y || 0;
    return this;
  }

  public negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  public add(point: Point2D): this {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  public sub(point: Point2D): this {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  public mul(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): number {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return length;
  }

  public equals(point: Point2D): boolean {
    return this.x === point.x && this.y === point.y;
  }

  public static negate(point: Point2D): Point {
    return new Point(-point.x, -point.y);
  }

  public static add(pointA: Point2D, pointB: Point2D): Point {
    return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
  }

  public static sub(pointA: Point2D, pointB: Point2D): Point {
    return new Point(pointA.x - pointB.x, pointA.y - pointB.y);
  }

  public static mul(scalar: number, point: Point2D): Point {
    return new Point(scalar * point.x, scalar * point.y);
  }

  public static cross(a: number, b: number): number;
  public static cross(a: number, b: Point2D): Point;
  public static cross(a: Point2D, b: number): Point;
  public static cross(a: Point2D, b: Point2D): number;
  public static cross(a: number | Point2D, b: number | Point2D): number | Point {
    if (typeof a === 'number') {
      if (typeof b === 'number') {
        return a * b;
      }
      return new Point(-a * b.y, a * b.x);
    }
    if (typeof b === 'number') {
      return new Point(b * a.y, -b * a.x);
    }
    return a.x * b.y - a.y * b.x;
  }

  public static dot(pointA: Point2D, pointB: Point2D): number {
    return pointA.x * pointB.x + pointA.y * pointB.y;
  }

  public static compare(pointA: Point2D, pointB: Point2D): number {
    if (pointA.x !== pointB.x) {
      return pointA.x - pointB.x;
    }
    return pointA.y - pointB.y;
  }

  public static cmp(pointA: Point2D, pointB: Point2D): number {
    return Point.compare(pointA, pointB);
  }

  public static equals(pointA: Point2D, pointB: Point2D): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }
}