interface Point {
  x: number;
  y: number;
}

interface Segment {
  start: Point;
  end: Point;
}

enum LineColineType {
  Same = 0,
  Less = 1,
  More = 2,
  LessOverlap = 3,
  MoreOverlap = 4,
  Contain = 5,
  Contained = 6
}

const HORIZONTAL_VECTOR = new THREE.Vector3(1, 0, 0);
const VERTICAL_VECTOR = new THREE.Vector3(0, 1, 0);

class Util {
  /**
   * Calculate the center point between two points
   */
  static getCenterPoint(pointA: Point, pointB: Point): Point {
    return {
      x: (pointA.x + pointB.x) / 2,
      y: (pointA.y + pointB.y) / 2
    };
  }

  /**
   * Get the distance between two parallel lines
   */
  static getParallelLineDistance(lineA: Segment, lineB: Segment): number {
    return HSCore.Util.Math.closestDistance(lineA.start, lineB.start, lineB.end);
  }

  /**
   * Calculate Euclidean distance between two points
   */
  static getDistanceBetweenPoints(pointA: Point, pointB: Point): number {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get the length of a line segment
   */
  static getSegmentLength(segment: Segment): number {
    return Util.getDistanceBetweenPoints(segment.start, segment.end);
  }

  /**
   * Check if two line segments are parallel
   */
  static isParallel(lineA: Segment, lineB: Segment): boolean {
    const startA = GeLib.VectorUtils.toTHREEVector3(lineA.start);
    const endA = GeLib.VectorUtils.toTHREEVector3(lineA.end);
    const startB = GeLib.VectorUtils.toTHREEVector3(lineB.start);
    const endB = GeLib.VectorUtils.toTHREEVector3(lineB.end);

    const directionA = endA.clone().sub(startA);
    const directionB = endB.clone().sub(startB);

    return GeLib.VectorUtils.isParallel(directionA, directionB);
  }

  /**
   * Check if a line segment is horizontal
   */
  static isHorizontalLine(segment: Segment): boolean {
    const start = GeLib.VectorUtils.toTHREEVector3(segment.start);
    const end = GeLib.VectorUtils.toTHREEVector3(segment.end);
    const direction = end.clone().sub(start);

    return GeLib.VectorUtils.isParallel(direction, HORIZONTAL_VECTOR);
  }

  /**
   * Check if a line segment is vertical
   */
  static isVerticalLine(segment: Segment): boolean {
    const start = GeLib.VectorUtils.toTHREEVector3(segment.start);
    const end = GeLib.VectorUtils.toTHREEVector3(segment.end);
    const direction = end.clone().sub(start);

    return GeLib.VectorUtils.isParallel(direction, VERTICAL_VECTOR);
  }

  /**
   * Check if perpendicular projection of a point is within a segment
   */
  static isPerpendicularProjectionInSegment(
    sourceSegment: Segment,
    targetSegment: Segment,
    tolerance: number
  ): boolean {
    const projection = HSCore.Util.Math.getPerpendicularIntersect(
      sourceSegment.start,
      targetSegment.start,
      targetSegment.end
    );

    return HSCore.Util.Math.isPointInLineSegment(
      projection,
      targetSegment.start,
      targetSegment.end,
      tolerance
    );
  }

  /**
   * Get gap distances from perpendicular line projection
   */
  static getGapFromPerpendicularLine(sourceSegment: Segment, targetSegment: Segment): [number, number] {
    const start = sourceSegment.start;
    const end = sourceSegment.end;

    const projection = HSCore.Util.Math.getPerpendicularIntersect(
      start,
      targetSegment.start,
      targetSegment.end
    );

    return [
      HSCore.Util.Math.getDistance(projection, start),
      HSCore.Util.Math.getDistance(projection, end)
    ];
  }

  /**
   * Get projection segment onto another segment
   */
  static getProjectionSegment(sourceSegment: Segment, targetSegment: Segment): Segment {
    return {
      start: HSCore.Util.Math.getPerpendicularIntersect(
        sourceSegment.start,
        targetSegment.start,
        targetSegment.end
      ),
      end: HSCore.Util.Math.getPerpendicularIntersect(
        sourceSegment.end,
        targetSegment.start,
        targetSegment.end
      )
    };
  }

  /**
   * Check if two segments are perpendicularly connected
   */
  static isPerpendicularConnected(
    segmentA: Segment,
    segmentB: Segment,
    perpendicularTolerance: number,
    intersectionTolerance: number
  ): boolean {
    return (
      HSCore.Util.Math.isPerpendicular(
        segmentA.start,
        segmentA.end,
        segmentB.start,
        segmentB.end,
        perpendicularTolerance
      ) &&
      HSCore.Util.Math.segmentSegmentIntersection(
        segmentA.start,
        segmentA.end,
        segmentB.start,
        segmentB.end,
        intersectionTolerance
      )
    );
  }

  /**
   * Check if two parallel segments are connected
   */
  static isParalellConnected(segmentA: Segment, segmentB: Segment, tolerance: number): boolean {
    return HSCore.Util.Math.isSegmentsConnected(
      segmentA.start,
      segmentA.end,
      segmentB.start,
      segmentB.end,
      tolerance
    );
  }

  /**
   * Check if two segments cross each other
   */
  static isSegmentCrossed(segmentA: Segment, segmentB: Segment, tolerance: number): boolean {
    return HSCore.Util.Math.segmentSegmentIntersection(
      segmentA.start,
      segmentA.end,
      segmentB.start,
      segmentB.end,
      tolerance
    );
  }

  /**
   * Check if one polygon is completely inside another polygon
   */
  static isPolygonInPolygon(innerPolygon: Point[], outerPolygon: Point[], tolerance: number): boolean {
    if (!innerPolygon || innerPolygon.length < 3 || !outerPolygon || outerPolygon.length < 3) {
      return false;
    }

    for (let i = 0; i < innerPolygon.length - 1; i++) {
      const point = innerPolygon[i];
      if (!HSCore.Util.Math.isPointInPolygon(point, outerPolygon, true, tolerance)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if two segments form a rectangle
   */
  static isRectangle(segmentA: Segment, segmentB: Segment, tolerance: number): boolean {
    return ['start', 'end'].every((key: 'start' | 'end') => {
      const projection = HSCore.Util.Math.getPerpendicularIntersect(
        segmentA[key],
        segmentB.start,
        segmentB.end
      );
      return HSCore.Util.Math.isSamePoint(projection, segmentB[key], tolerance);
    });
  }

  /**
   * Check if one segment is completely included in another
   */
  static isSegmentIncluded(segmentA: Segment, segmentB: Segment, tolerance?: number): boolean {
    const startA = segmentA.start;
    const endA = segmentA.end;
    const startB = segmentB.start;
    const endB = segmentB.end;

    const effectiveTolerance = tolerance ?? HSCore.Util.Math.defaultTolerance;

    if (HSCore.Util.Math.isSameLineSegment(startA, endA, startB, endB, effectiveTolerance)) {
      return true;
    }

    if (HSCore.Util.Math.isSameLine(startA, endA, startB, endB, effectiveTolerance)) {
      return (
        HSCore.Util.Math.isPointInLineSegment(startA, startB, endB, effectiveTolerance) &&
        HSCore.Util.Math.isPointInLineSegment(endA, startB, endB, effectiveTolerance)
      );
    }

    return false;
  }

  /**
   * Compare two points to determine ordering
   */
  static pointLessThan(pointA: Point, pointB: Point): boolean {
    const deltaX = pointA.x - pointB.x;
    const deltaY = pointA.y - pointB.y;

    return Math.abs(deltaX) < Math.abs(deltaY) ? deltaY <= 0 : deltaX <= 0;
  }

  /**
   * Get the minimum point according to pointLessThan ordering
   */
  static minPoint(pointA: Point, pointB: Point): Point {
    return Util.pointLessThan(pointA, pointB) ? pointA : pointB;
  }

  /**
   * Get the maximum point according to pointLessThan ordering
   */
  static maxPoint(pointA: Point, pointB: Point): Point {
    return Util.pointLessThan(pointA, pointB) ? pointB : pointA;
  }

  /**
   * Determine the colinear relationship between two segments
   */
  static getColineRelationship(segmentA: Segment, segmentB: Segment): LineColineType {
    const minA = Util.minPoint(segmentA.start, segmentA.end);
    const maxA = Util.maxPoint(segmentA.start, segmentA.end);
    const minB = Util.minPoint(segmentB.start, segmentB.end);
    const maxB = Util.maxPoint(segmentB.start, segmentB.end);

    if (HSCore.Util.Math.isSameLineSegment(minA, maxA, minB, maxB, HSCore.Util.Math.defaultTolerance)) {
      return LineColineType.Same;
    }

    if (Util.pointLessThan(maxA, minB)) {
      return LineColineType.Less;
    }

    if (Util.pointLessThan(maxB, minA)) {
      return LineColineType.More;
    }

    if (Util.pointLessThan(minA, minB) && Util.pointLessThan(minB, maxA)) {
      return Util.pointLessThan(maxA, maxB) ? LineColineType.LessOverlap : LineColineType.Contain;
    }

    return Util.pointLessThan(maxB, maxA) ? LineColineType.MoreOverlap : LineColineType.Contained;
  }

  /**
   * Get the joint line combining two segments
   */
  static getJointLine(segmentA: Segment, segmentB: Segment): Segment {
    const minA = Util.minPoint(segmentA.start, segmentA.end);
    const maxA = Util.maxPoint(segmentA.start, segmentA.end);
    const minB = Util.minPoint(segmentB.start, segmentB.end);
    const maxB = Util.maxPoint(segmentB.start, segmentB.end);

    if (Util.pointLessThan(maxA, minB)) {
      return { start: minA, end: maxB };
    }

    if (Util.pointLessThan(maxB, minA)) {
      return { start: minB, end: maxA };
    }

    return {
      start: Util.minPoint(segmentA.start, segmentB.start),
      end: Util.maxPoint(segmentA.end, segmentB.end)
    };
  }

  /**
   * Get the gap line between two non-overlapping segments
   */
  static getGapLine(segmentA: Segment, segmentB: Segment): Segment | undefined {
    const minA = Util.minPoint(segmentA.start, segmentA.end);
    const maxA = Util.maxPoint(segmentA.start, segmentA.end);
    const minB = Util.minPoint(segmentB.start, segmentB.end);
    const maxB = Util.maxPoint(segmentB.start, segmentB.end);

    if (Util.pointLessThan(maxA, minB)) {
      return { start: maxA, end: minB };
    }

    if (Util.pointLessThan(maxB, minA)) {
      return { start: maxB, end: minA };
    }

    return undefined;
  }

  /**
   * Get the intersection line of two overlapping segments
   */
  static getIntersectionLine(segmentA: Segment, segmentB: Segment): Segment | undefined {
    const minA = Util.minPoint(segmentA.start, segmentA.end);
    const maxA = Util.maxPoint(segmentA.start, segmentA.end);
    const minB = Util.minPoint(segmentB.start, segmentB.end);
    const maxB = Util.maxPoint(segmentB.start, segmentB.end);

    if (Util.pointLessThan(minA, minB) && Util.pointLessThan(minB, maxA)) {
      return { start: minB, end: Util.minPoint(maxA, maxB) };
    }

    if (Util.pointLessThan(maxB, maxA) && Util.pointLessThan(minA, maxB)) {
      return { start: Util.maxPoint(minA, minB), end: maxB };
    }

    return undefined;
  }
}

export { Util, LineColineType };