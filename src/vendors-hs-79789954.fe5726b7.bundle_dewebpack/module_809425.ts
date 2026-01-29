interface GlobalConfig {
  DISTANCE_TOLERENCE: number;
}

declare const global: {
  DISTANCE_TOLERENCE: number;
};

class BoundingBox {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  surfaceArea: number;

  constructor(
    minX: number = 0,
    minY: number = 0,
    minZ: number = 0,
    maxX: number = 0,
    maxY: number = 0,
    maxZ: number = 0
  ) {
    this.minX = minX;
    this.minY = minY;
    this.minZ = minZ;
    this.maxX = maxX;
    this.maxY = maxY;
    this.maxZ = maxZ;
    this.surfaceArea = this._calculateSurfaceArea();
  }

  private _calculateSurfaceArea(): number {
    return 2 * (
      this.getWidth() * this.getHeight() +
      this.getWidth() * this.getDepth() +
      this.getHeight() * this.getDepth()
    );
  }

  overlaps(other: BoundingBox | null | undefined, ignorZ?: boolean): boolean {
    if (!other) {
      return false;
    }

    const tolerance = global.DISTANCE_TOLERENCE;

    if (ignorZ) {
      return (
        this.maxX - other.minX > -tolerance &&
        this.minX - other.maxX < tolerance &&
        this.maxY - other.minY > -tolerance &&
        this.minY - other.maxY < tolerance
      );
    }

    return (
      this.maxX - other.minX > -tolerance &&
      this.minX - other.maxX < tolerance &&
      this.maxY - other.minY > -tolerance &&
      this.minY - other.maxY < tolerance &&
      this.maxZ - other.minZ > -tolerance &&
      this.minZ - other.maxZ < tolerance
    );
  }

  contains(other: BoundingBox | null | undefined): boolean {
    if (!other) {
      return false;
    }

    return (
      other.minX >= this.minX &&
      other.maxX <= this.maxX &&
      other.minY >= this.minY &&
      other.maxY <= this.maxY &&
      other.minZ >= this.minZ &&
      other.maxZ <= this.maxZ
    );
  }

  merge(other: BoundingBox | null | undefined): BoundingBox {
    if (!other) {
      return this;
    }

    return new BoundingBox(
      Math.min(this.minX, other.minX),
      Math.min(this.minY, other.minY),
      Math.min(this.minZ, other.minZ),
      Math.max(this.maxX, other.maxX),
      Math.max(this.maxY, other.maxY),
      Math.max(this.maxZ, other.maxZ)
    );
  }

  intersection(other: BoundingBox | null | undefined): BoundingBox {
    if (!other) {
      return this;
    }

    return new BoundingBox(
      Math.max(this.minX, other.minX),
      Math.max(this.minY, other.minY),
      Math.max(this.minZ, other.minZ),
      Math.min(this.maxX, other.maxX),
      Math.min(this.maxY, other.maxY),
      Math.min(this.maxZ, other.maxZ)
    );
  }

  getWidth(): number {
    return this.maxX - this.minX;
  }

  getHeight(): number {
    return this.maxY - this.minY;
  }

  getDepth(): number {
    return this.maxZ - this.minZ;
  }
}

export default BoundingBox;