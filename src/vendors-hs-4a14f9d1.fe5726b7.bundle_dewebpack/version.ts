export const VERSION = "1.0.0";

export class PointError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PointError";
  }
}

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Triangle {
  public points: [Point, Point, Point];
  public neighbors: [Triangle | null, Triangle | null, Triangle | null];

  constructor(p1: Point, p2: Point, p3: Point) {
    this.points = [p1, p2, p3];
    this.neighbors = [null, null, null];
  }

  public getPoint(index: number): Point {
    return this.points[index];
  }

  public getNeighbor(index: number): Triangle | null {
    return this.neighbors[index];
  }

  public containsPoint(point: Point): boolean {
    return this.points.some(p => p === point);
  }

  public containsEdge(p1: Point, p2: Point): boolean {
    return this.points.includes(p1) && this.points.includes(p2);
  }
}

export class SweepContext {
  private points: Point[];
  private triangles: Triangle[];
  private edge: Point[];

  constructor(contour: Point[]) {
    this.points = [...contour];
    this.triangles = [];
    this.edge = [];
  }

  public addPoint(point: Point): void {
    this.points.push(point);
  }

  public addPoints(points: Point[]): void {
    this.points.push(...points);
  }

  public getTriangles(): Triangle[] {
    return this.triangles;
  }

  public getPoints(): Point[] {
    return this.points;
  }
}

export function triangulate(contour: Point[]): Triangle[] {
  const sweepContext = new SweepContext(contour);
  return sweepContext.getTriangles();
}

export const sweep = {
  Triangulate: triangulate
};

export function noConflict(): typeof import("./poly2tri") {
  return {
    VERSION,
    PointError,
    Point,
    Triangle,
    SweepContext,
    triangulate,
    sweep
  };
}