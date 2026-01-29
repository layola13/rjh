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

  public containsPoint(point: Point): boolean {
    return this.points.some(p => p === point);
  }
}

export class SweepContext {
  private points: Point[];
  private triangles: Triangle[];

  constructor(contour: Point[]) {
    this.points = [...contour];
    this.triangles = [];
  }

  public addPoint(point: Point): void {
    this.points.push(point);
  }

  public getTriangles(): Triangle[] {
    return this.triangles;
  }

  public addTriangle(triangle: Triangle): void {
    this.triangles.push(triangle);
  }
}

export function triangulate(contour: Point[], holes?: Point[][]): Triangle[] {
  const sweepContext = new SweepContext(contour);
  
  if (holes) {
    for (const hole of holes) {
      for (const point of hole) {
        sweepContext.addPoint(point);
      }
    }
  }

  return sweepContext.getTriangles();
}

export const sweep = {
  Triangulate: triangulate
};