import { Point2D } from './Point2D';

export class Box2d {
  public min: Point2D;
  public max: Point2D;

  constructor() {
    this.min = new Point2D(Infinity, Infinity);
    this.max = new Point2D(-Infinity, -Infinity);
  }

  /**
   * Expands this box to include another box
   */
  union(other: Box2d): void {
    if (this.min.x > other.min.x) {
      this.min.x = other.min.x;
    }
    if (this.min.y > other.min.y) {
      this.min.y = other.min.y;
    }
    if (this.max.x < other.max.x) {
      this.max.x = other.max.x;
    }
    if (this.max.y < other.max.y) {
      this.max.y = other.max.y;
    }
  }

  /**
   * Updates the bounding box to include the given point(s)
   */
  update(point: Point2D | Point2D[]): void {
    if (Array.isArray(point)) {
      for (let i = 0; i < point.length; ++i) {
        if (this.min.x > point[i].x) {
          this.min.x = point[i].x;
        }
        if (this.min.y > point[i].y) {
          this.min.y = point[i].y;
        }
        if (this.max.x < point[i].x) {
          this.max.x = point[i].x;
        }
        if (this.max.y < point[i].y) {
          this.max.y = point[i].y;
        }
      }
    } else {
      if (this.min.x > point.x) {
        this.min.x = point.x;
      }
      if (this.min.y > point.y) {
        this.min.y = point.y;
      }
      if (this.max.x < point.x) {
        this.max.x = point.x;
      }
      if (this.max.y < point.y) {
        this.max.y = point.y;
      }
    }
  }

  /**
   * Returns the four corner points of the bounding box
   */
  toArray(): Point2D[] {
    return [
      { x: this.min.x, y: this.min.y },
      { x: this.max.x, y: this.min.y },
      { x: this.max.x, y: this.max.y },
      { x: this.min.x, y: this.max.y }
    ];
  }
}