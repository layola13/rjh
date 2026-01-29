export class Point2D {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  clone(): Point2D {
    return new Point2D(this.x, this.y);
  }

  dot(other?: Point2D): number {
    if (other) {
      return this.x * other.x + this.y * other.y;
    }
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.dot());
  }

  normalize(): this {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    return this;
  }

  normal(): this {
    const tempX = -this.y;
    this.y = this.x;
    this.x = tempX;
    return this;
  }
}

export class Point3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone(): Point3D {
    return new Point3D(this.x, this.y, this.z);
  }

  dot(other?: Point3D): number {
    if (other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length(): number {
    return Math.sqrt(this.dot());
  }

  cross(other: Point3D): Point3D {
    return new Point3D(
      this.y * other.z - other.y * this.z,
      this.x * other.z - other.x * this.z,
      this.x * other.y - other.x * this.y
    );
  }

  normalize(): this {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
  }
}