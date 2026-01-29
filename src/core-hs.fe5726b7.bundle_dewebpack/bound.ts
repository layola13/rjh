interface Point {
  x: number;
  y: number;
}

export class Bound {
  left: number;
  bottom: number;
  width: number;
  height: number;

  constructor() {
    this.left = Infinity;
    this.bottom = Infinity;
    this.width = 0;
    this.height = 0;
  }

  appendPoint(point: Point): void {
    if (!isFinite(this.left) || isNaN(this.left)) {
      this.left = point.x;
      this.bottom = point.y;
      return;
    }

    if (point.x < this.left) {
      this.width += this.left - point.x;
      this.left = point.x;
    } else {
      this.width = Math.max(this.width, point.x - this.left);
    }

    if (point.y < this.bottom) {
      this.height += this.bottom - point.y;
      this.bottom = point.y;
    } else {
      this.height = Math.max(this.height, point.y - this.bottom);
    }
  }

  getCenter(): Point {
    return {
      x: this.left + 0.5 * this.width,
      y: this.bottom + 0.5 * this.height
    };
  }

  center(): Point {
    return this.getCenter();
  }
}