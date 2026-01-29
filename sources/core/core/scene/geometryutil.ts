interface ArcInfo {
  center: THREE.Vector3;
  radius: number;
  clockwise: boolean;
}

interface Vector3WithArcInfo extends THREE.Vector3 {
  arcInfo?: ArcInfo;
}

interface CoEdge {
  from: unknown;
  arcInfo?: ArcInfo;
}

interface Loop {
  forEachCoEdge(callback: (edge: CoEdge) => void): void;
}

interface ArcSegmentsOptions {
  segments?: number;
}

interface Arc {
  xRadius: number;
  getLength(): number;
  getPoints(segments: number): THREE.Vector2[];
}

interface PointsArrayWithArcPaths extends Array<THREE.Vector2> {
  arcPaths: THREE.Vector2[][];
}

export const GeometryUtil = {
  /**
   * Extract points from a loop by iterating through its co-edges
   */
  getLoopPoints(loop: Loop | null | undefined): THREE.Vector2[] | null {
    if (!loop) {
      return [];
    }

    const points: Vector3WithArcInfo[] = [];
    
    loop.forEachCoEdge((edge: CoEdge) => {
      const point = GeLib.VectorUtils.toTHREEVector3(edge.from) as Vector3WithArcInfo;
      const arcInfo = edge.arcInfo;
      
      if (arcInfo) {
        point.arcInfo = arcInfo;
      }
      
      points.push(point);
    });

    return this.getPoints(points, true);
  },

  /**
   * Convert points array to 2D points, handling arc interpolation
   */
  getPoints(
    points: Vector3WithArcInfo[] | null | undefined,
    isClosed: boolean
  ): PointsArrayWithArcPaths | null {
    if (!points || !points.length) {
      return null;
    }

    let closed = isClosed === undefined ? true : isClosed;
    
    const filteredPoints = points.filter((point) => point);
    
    if (this.isSamePoint(filteredPoints[0], filteredPoints[filteredPoints.length - 1])) {
      closed = false;
    }

    const pointCount = filteredPoints.length;
    const resultPoints: THREE.Vector2[] = [];
    const arcPaths: THREE.Vector2[][] = [];
    
    let previousPoint: Vector3WithArcInfo | undefined = closed 
      ? filteredPoints[filteredPoints.length - 1] 
      : undefined;

    for (let i = 0; i < pointCount; ++i) {
      const currentPoint = filteredPoints[i];

      if (previousPoint?.arcInfo) {
        const arcInfo = previousPoint.arcInfo;
        let startPoint = previousPoint;
        let endPoint = currentPoint;

        if (arcInfo.center.z != null) {
          startPoint = new THREE.Vector3(
            previousPoint.x,
            previousPoint.y,
            arcInfo.center.z
          ) as Vector3WithArcInfo;
          endPoint = new THREE.Vector3(
            currentPoint.x,
            currentPoint.y,
            arcInfo.center.z
          ) as Vector3WithArcInfo;
        }

        const arc = GeLib.ArcUtils.createArcFromPoints(
          startPoint,
          endPoint,
          arcInfo.center,
          arcInfo.radius,
          arcInfo.clockwise
        );

        let arcPoints = this.getArcPoints(arc, undefined);
        arcPoints = arcPoints.filter((point) => point);
        arcPaths.push(arcPoints);

        for (let j = 1; j < arcPoints.length; j++) {
          resultPoints.push(arcPoints[j]);
        }
      } else {
        resultPoints.push(new THREE.Vector2().copy(currentPoint));
      }

      previousPoint = currentPoint;
    }

    return Object.create(resultPoints, {
      arcPaths: {
        writable: false,
        value: arcPaths
      }
    }) as PointsArrayWithArcPaths;
  },

  /**
   * Generate interpolated points along an arc
   */
  getArcPoints(arc: Arc, options: ArcSegmentsOptions | undefined): THREE.Vector2[] {
    const DEFAULT_MIN_SEGMENTS = 48;
    const DEFAULT_MAX_SEGMENTS = 72;
    const SEGMENT_MULTIPLIER = 2.4;
    const RADIUS_MULTIPLIER = 10;
    const MIN_SEGMENTS = 3;

    let segments = options?.segments;

    if (!segments) {
      segments = Math.round(SEGMENT_MULTIPLIER * Math.round(RADIUS_MULTIPLIER * arc.xRadius));

      if (segments < DEFAULT_MIN_SEGMENTS) {
        segments = DEFAULT_MIN_SEGMENTS;
      } else if (segments > DEFAULT_MAX_SEGMENTS) {
        segments = DEFAULT_MAX_SEGMENTS;
      }

      const arcLengthRatio = arc.getLength() / (2 * Math.PI * arc.xRadius);
      segments = Math.round(segments * arcLengthRatio);
      segments = Math.max(MIN_SEGMENTS, segments);
    }

    return arc.getPoints(segments);
  },

  /**
   * Check if two points are at the same location
   */
  isSamePoint(pointA: THREE.Vector3 | THREE.Vector2, pointB: THREE.Vector3 | THREE.Vector2): boolean {
    // Implementation imported from module 59145
    // This would be the actual implementation from the imported module
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }
};