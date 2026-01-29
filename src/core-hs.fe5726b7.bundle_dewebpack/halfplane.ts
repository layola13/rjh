import { Vector2, Line2d } from './Vector';
import { ServiceManager } from './ServiceManager';

interface Point2D {
  x: number;
  y: number;
}

interface HalfPlaneData {
  w: Point2D;
  b: number;
}

export class HalfPlane {
  private w: Point2D;
  private b: number;

  /**
   * Creates a HalfPlane from a 2D line
   */
  static createByLine2d(line: Line2d): HalfPlane {
    const direction = line.getDirection();
    const startPoint = line.getStartPt();
    
    return new HalfPlane(
      {
        x: -direction.y,
        y: direction.x
      },
      startPoint.x * direction.y - startPoint.y * direction.x
    );
  }

  /**
   * Cuts a collection of meshes using an array of half-planes
   */
  static cut(meshes: unknown[], halfPlanes: HalfPlane[] = []): unknown[] {
    if (!halfPlanes.length) {
      return meshes;
    }

    const result: unknown[] = [];
    const lines = halfPlanes.map(plane => plane.toLine2d());

    meshes.forEach(mesh => {
      const cutMesh = ServiceManager.getFGIService().cutMesh2D(mesh, lines);
      if (cutMesh) {
        result.push(cutMesh);
      }
    });

    return result;
  }

  /**
   * Loads a HalfPlane from serialized data
   */
  static load(data: HalfPlaneData): HalfPlane {
    return new HalfPlane(data.w, data.b);
  }

  constructor(point1: Point2D, point2OrOffset: Point2D | number) {
    if (typeof point2OrOffset === 'object' && 'x' in point2OrOffset) {
      // Constructor from two points
      this.w = {
        x: point1.y - point2OrOffset.y,
        y: point2OrOffset.x - point1.x
      };

      const length = Math.sqrt(this.w.x * this.w.x + this.w.y * this.w.y);
      this.w.x /= length;
      this.w.y /= length;
      this.b = -(this.w.x * point1.x + this.w.y * point1.y);
    } else {
      // Constructor from normal vector and offset
      this.w = {
        x: point1.x,
        y: point1.y
      };
      this.b = point2OrOffset;
    }
  }

  /**
   * Gets the normal vector of the half-plane
   */
  get normal(): Vector2 {
    return new Vector2(this.w);
  }

  /**
   * Calculates the signed distance from a point to the half-plane
   */
  distance(point: Point2D): number {
    return this.w.x * point.x + this.w.y * point.y + this.b;
  }

  /**
   * Creates a deep copy of this half-plane
   */
  clone(): HalfPlane {
    return new HalfPlane(this.w, this.b);
  }

  /**
   * Converts the half-plane to a 2D line
   */
  toLine2d(): Line2d {
    let startPoint: Point2D;

    if (Math.abs(this.w.x) > Math.abs(this.w.y)) {
      startPoint = {
        x: -this.b / this.w.x,
        y: 0
      };
    } else {
      startPoint = {
        x: 0,
        y: -this.b / this.w.y
      };
    }

    return new Line2d(startPoint, {
      x: startPoint.x + this.w.y,
      y: startPoint.y - this.w.x
    });
  }

  /**
   * Offsets the half-plane by a given distance
   */
  offset(distance: number): this {
    this.b -= distance;
    return this;
  }

  /**
   * Finds the intersection point with another half-plane
   */
  intersect(other: HalfPlane): Point2D {
    const determinant = this.w.x * other.w.y - this.w.y * other.w.x;

    return {
      x: (this.w.y * other.b - other.w.y * this.b) / determinant,
      y: (other.w.x * this.b - this.w.x * other.b) / determinant
    };
  }

  /**
   * Checks if this half-plane is parallel to another
   */
  parallel(other: HalfPlane, tolerance: number = 1e-6): boolean {
    return Math.abs(other.w.x * this.w.y - other.w.y * this.w.x) < tolerance;
  }

  /**
   * Serializes the half-plane to a plain object
   */
  dump(): HalfPlaneData {
    return {
      w: {
        x: this.w.x,
        y: this.w.y
      },
      b: this.b
    };
  }
}