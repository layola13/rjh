const EPSILON = 1e-6;

export class LineSeg {
  start: THREE.Vector2;
  end: THREE.Vector2;

  constructor() {
    this.start = new THREE.Vector2(0, 0);
    this.end = new THREE.Vector2(0, 0);
  }

  /**
   * Check if this line segment crosses another line segment
   */
  isCrosses(other: LineSeg): boolean {
    const deltaX = this.end.x - this.start.x;
    const deltaY = this.end.y - this.start.y;

    let startDeltaX = other.start.x - this.start.x;
    let startDeltaY = other.start.y - this.start.y;
    const startCross = startDeltaX * deltaY - startDeltaY * deltaX;

    let endDeltaX = other.end.x - this.start.x;
    let endDeltaY = other.end.y - this.start.y;
    const endCross = endDeltaX * deltaY - endDeltaY * deltaX;

    return startCross === 0 || endCross === 0 || (startCross < 0) !== (endCross < 0);
  }
}

class Line {
  A: number;
  B: number;
  C: number;

  constructor(point1: THREE.Vector2 | null = null, point2: THREE.Vector2 | null = null) {
    if (point1 === null || point2 === null) {
      this.A = 1;
      this.B = 0;
      this.C = 0;
      return;
    }

    this.A = point1.y - point2.y;
    this.B = point2.x - point1.x;
    this.C = point1.x * -this.A - point1.y * this.B;

    const magnitude = Math.sqrt(this.A * this.A + this.B * this.B);
    this.A /= magnitude;
    this.B /= magnitude;
    this.C /= magnitude;
  }

  /**
   * Initialize line from two points
   */
  Make(point1: THREE.Vector2 | null = null, point2: THREE.Vector2 | null = null): void {
    if (point1 === null || point2 === null) {
      return;
    }

    this.A = point1.y - point2.y;
    this.B = point2.x - point1.x;
    this.C = point1.x * -this.A - point1.y * this.B;

    const magnitude = Math.sqrt(this.A * this.A + this.B * this.B);
    this.A /= magnitude;
    this.B /= magnitude;
    this.C /= magnitude;
  }

  /**
   * Calculate intersection point with another line
   */
  Cross(other: Line): THREE.Vector2 {
    const determinant = this.A * other.B - other.A * this.B;
    return new THREE.Vector2(
      (this.B * other.C - other.B * this.C) / determinant,
      (other.A * this.C - this.A * other.C) / determinant
    );
  }

  /**
   * Calculate intersection point with a line segment
   */
  CrossLineSeg(segment: LineSeg): THREE.Vector2 {
    let startValue = this.Calc(segment.start);
    let endValue = this.Calc(segment.end);
    startValue /= startValue - endValue;
    endValue = 1 - startValue;
    return new THREE.Vector2(
      segment.start.x * endValue + segment.end.x * startValue,
      segment.start.y * endValue + segment.end.y * startValue
    );
  }

  /**
   * Offset the line by a given distance
   */
  Offset(distance: number): void {
    this.C -= distance;
  }

  /**
   * Check if this line is parallel to another line
   */
  parallel(other: Line): boolean {
    const determinant = this.A * other.B - other.A * this.B;
    return Math.abs(determinant) < EPSILON;
  }

  /**
   * Calculate the value of the line equation at a given point
   */
  Calc(point: THREE.Vector2): number {
    return point.x * this.A + point.y * this.B + this.C;
  }
}

/**
 * Check if three points form a convex angle
 */
export function checkForConvex(point1: THREE.Vector2, point2: THREE.Vector2, point3: THREE.Vector2): boolean {
  return (point2.x - point1.x) * (point3.y - point2.y) - (point2.y - point1.y) * (point3.x - point2.x) > -EPSILON;
}

/**
 * Check if two line segments cross each other
 */
export function checkForCross(segment1: LineSeg, segment2: LineSeg): boolean {
  return segment1.isCrosses(segment2) && segment2.isCrosses(segment1);
}

/**
 * Split offset path into inner and outer segments
 */
export function offsetPathSplit(
  originalPath: THREE.Vector2[],
  offsetPath: THREE.Vector2[],
  innerSegments: LineSeg[],
  outerSegments: LineSeg[]
): void {
  outerSegments.length = 0;
  innerSegments.length = 0;

  const pathLength = originalPath.length;
  let isConvex = checkForConvex(
    originalPath[pathLength - 1],
    originalPath[0],
    originalPath[1]
  );

  const line = new Line();
  const tempSegment = new LineSeg();

  for (let index = 0; index < pathLength; ++index) {
    const prevIndex = (index - 1 + pathLength) % pathLength;
    const nextIndex = (index + 1) % pathLength;

    const innerSegment = new LineSeg();
    const outerSegment = new LineSeg();
    const wasConvex = isConvex;

    line.Make(
      wasConvex ? offsetPath[index] : originalPath[index],
      wasConvex ? offsetPath[nextIndex] : originalPath[nextIndex]
    );

    tempSegment.start = wasConvex ? originalPath[prevIndex] : offsetPath[prevIndex];
    tempSegment.end = wasConvex ? originalPath[index] : offsetPath[index];

    outerSegment.start = wasConvex ? line.CrossLineSeg(tempSegment) : offsetPath[index];
    innerSegment.start = wasConvex ? originalPath[index] : line.CrossLineSeg(tempSegment);

    const nextNextIndex = (nextIndex + 1) % pathLength;
    isConvex = checkForConvex(originalPath[index], originalPath[nextIndex], originalPath[nextNextIndex]);

    if (wasConvex !== isConvex) {
      line.Make(
        isConvex ? offsetPath[index] : originalPath[index],
        isConvex ? offsetPath[nextIndex] : originalPath[nextIndex]
      );
    }

    tempSegment.start = isConvex ? originalPath[nextIndex] : offsetPath[nextIndex];
    tempSegment.end = isConvex ? originalPath[nextNextIndex] : offsetPath[nextNextIndex];

    innerSegment.end = isConvex ? originalPath[nextIndex] : line.CrossLineSeg(tempSegment);
    outerSegment.end = isConvex ? line.CrossLineSeg(tempSegment) : offsetPath[nextIndex];

    innerSegments.push(innerSegment);
    outerSegments.push(outerSegment);
  }
}