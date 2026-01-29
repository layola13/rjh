interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface ArcInfo {
  center: Point3D;
  radius: number;
  clockwise: boolean;
}

interface PointWithArc extends Point2D {
  arcInfo?: ArcInfo;
}

interface GeometrySegment {
  path: THREE.Vector3[];
  planePath: THREE.Vector3[];
}

interface ExtrudeSurfaceGeometry {
  path: THREE.Vector3[];
  planePath: THREE.Vector3[];
  segments: GeometrySegment[];
}

interface GeometryData {
  geometry: PointWithArc[];
  indices: number[];
}

interface WallGeometryInfo {
  borderlinePath: PointWithArc[];
  leftFrom: PointWithArc;
  leftTo: PointWithArc;
  rightFrom: PointWithArc;
  rightTo: PointWithArc;
  geometry: PointWithArc[];
  indices: number[];
  readonly leftPath: THREE.Vector2[];
  readonly rightPath: THREE.Vector2[];
  readonly fromPath: PointWithArc[];
  readonly toPath: PointWithArc[];
  readonly path: Point2D[];
}

interface ArcPointsOptions {
  segments?: number;
}

interface PointsWithArcPaths extends Array<THREE.Vector2> {
  arcPaths: THREE.Vector2[][];
}

export class Util {
  static getExtrudeSurfaceGeometry(
    points: Point2D[],
    direction: THREE.Vector3,
    startZ: number,
    endZ: number
  ): ExtrudeSurfaceGeometry {
    const bottomPath = points.map(point => new THREE.Vector3(point.x, point.y, startZ));
    const topPath = bottomPath.map(point => new THREE.Vector3(point.x, point.y, endZ));

    const projectPath = (basePath: THREE.Vector3[], targetZ: number): THREE.Vector3[] => {
      let currentBase = basePath[0];
      let previousOriginal = basePath[0];
      const result: THREE.Vector3[] = [];
      result.push(currentBase);

      for (let i = 1; i < basePath.length; ++i) {
        const currentOriginal = basePath[i];
        const distance = currentOriginal.distanceTo(previousOriginal);
        const offset = new THREE.Vector3().addVectors(
          currentBase,
          direction.clone().setLength(distance)
        );
        result.push(offset);
        previousOriginal = currentOriginal;
        currentBase = offset;
      }
      return result;
    };

    const planePath = projectPath(bottomPath, startZ);
    const planePathTop = planePath.map(point => new THREE.Vector3(point.x, point.y, endZ));

    const segmentCount = bottomPath.length;
    const segments: GeometrySegment[] = [];

    for (let i = 0; i < segmentCount - 1; i++) {
      const segmentPath = [
        bottomPath[i],
        bottomPath[i + 1],
        topPath[i + 1],
        topPath[i]
      ];
      const segmentPlanePath = [
        planePath[i],
        planePath[i + 1],
        planePathTop[i + 1],
        planePathTop[i]
      ];
      segments.push({
        path: segmentPath,
        planePath: segmentPlanePath
      });
    }

    return {
      path: bottomPath.concat(topPath.slice().reverse()),
      planePath: planePath.concat(planePathTop.slice().reverse()),
      segments
    };
  }

  static getWallGeometryInfoExt(element: { id: string }): WallGeometryInfo | undefined {
    if (!element) return undefined;

    const geometryData = DocManager.instance().geometries.get(element.id) as GeometryData | undefined;
    if (!geometryData) return undefined;

    const { geometry, indices } = geometryData;
    if (!geometry || !indices) return undefined;

    const getPathSegment = function(this: WallGeometryInfo, startIndex: number, endIndex: number): PointWithArc[] {
      const start = this.indices[startIndex];
      const end = this.indices[endIndex];
      return start < end
        ? this.geometry.slice(start, end + 1)
        : this.geometry.slice(start).concat(this.geometry.slice(0, end + 1));
    };

    const baseInfo = {
      borderlinePath: geometry,
      leftFrom: geometry[indices[0]],
      leftTo: geometry[indices[1]],
      rightFrom: geometry[indices[2]],
      rightTo: geometry[indices[3]],
      geometry,
      indices
    };

    return Object.create(baseInfo, {
      leftPath: {
        get(this: WallGeometryInfo): THREE.Vector2[] {
          return Util.getPoints([this.leftFrom, this.leftTo], false);
        }
      },
      rightPath: {
        get(this: WallGeometryInfo): THREE.Vector2[] {
          return Util.getPoints([this.rightFrom, this.rightTo], false);
        }
      },
      fromPath: {
        get(this: WallGeometryInfo): PointWithArc[] {
          return getPathSegment.call(this, 3, 0);
        }
      },
      toPath: {
        get(this: WallGeometryInfo): PointWithArc[] {
          return getPathSegment.call(this, 1, 2);
        }
      },
      path: {
        get(this: WallGeometryInfo): Point2D[] {
          const result: Point2D[] = [];
          const left = this.leftPath;
          const right = this.rightPath;
          const from = this.fromPath;
          const to = this.toPath;

          left.pop();
          right.pop();
          from.pop();
          to.pop();

          result.push(...from);
          result.push(...left);
          result.push(...to);
          result.push(...right);

          return result;
        }
      }
    }) as WallGeometryInfo;
  }

  static getPoints(points: PointWithArc[], closed?: boolean): PointsWithArcPaths {
    if (!points || !points.length) return null as any;

    const isClosed = closed ?? true;
    const filteredPoints = points.filter(point => point);

    if (isSamePoint(filteredPoints[0], filteredPoints[filteredPoints.length - 1])) {
      closed = false;
    }

    const pointCount = filteredPoints.length;
    const result: THREE.Vector2[] = [];
    const arcPaths: THREE.Vector2[][] = [];
    let previousPoint: PointWithArc | undefined = isClosed ? filteredPoints[filteredPoints.length - 1] : undefined;

    for (let i = 0; i < pointCount; ++i) {
      const currentPoint = filteredPoints[i];

      if (previousPoint?.arcInfo) {
        const arcInfo = previousPoint.arcInfo;
        let startPoint = previousPoint;
        let endPoint = currentPoint;

        if (arcInfo.center.z != null) {
          startPoint = new THREE.Vector3(previousPoint.x, previousPoint.y, arcInfo.center.z) as any;
          endPoint = new THREE.Vector3(currentPoint.x, currentPoint.y, arcInfo.center.z) as any;
        }

        const arc = GeLib.ArcUtils.createArcFromPoints(
          startPoint,
          endPoint,
          arcInfo.center,
          arcInfo.radius,
          arcInfo.clockwise
        );

        let arcPoints = this.getArcPoints(arc, {});
        arcPoints = arcPoints.filter(point => point);
        arcPaths.push(arcPoints);

        for (let j = 1; j < arcPoints.length; j++) {
          result.push(arcPoints[j]);
        }
      } else {
        result.push(new THREE.Vector2().copy(currentPoint));
      }

      previousPoint = currentPoint;
    }

    return Object.create(result, {
      arcPaths: {
        writable: false,
        value: arcPaths
      }
    }) as PointsWithArcPaths;
  }

  static getArcPoints(arc: any, options: ArcPointsOptions): THREE.Vector2[] {
    const DEFAULT_BASE_SEGMENTS = 48;
    const MIN_SEGMENTS = 3;
    const MAX_SEGMENTS = 72;
    const SEGMENT_MULTIPLIER = 2.4;
    const RADIUS_MULTIPLIER = 10;

    let segments = options.segments;

    if (!segments) {
      const baseCalculation = Math.round(SEGMENT_MULTIPLIER * Math.round(RADIUS_MULTIPLIER * arc.xRadius));
      let calculatedSegments = baseCalculation < DEFAULT_BASE_SEGMENTS
        ? DEFAULT_BASE_SEGMENTS
        : Math.min(baseCalculation, MAX_SEGMENTS);

      const arcLengthRatio = arc.getLength() / (2 * Math.PI * arc.xRadius);
      calculatedSegments = Math.round(calculatedSegments * arcLengthRatio);
      segments = Math.max(MIN_SEGMENTS, calculatedSegments);
    }

    return arc.getPoints(segments);
  }
}

function isSamePoint(point1: Point2D, point2: Point2D): boolean {
  const EPSILON = 1e-10;
  return Math.abs(point1.x - point2.x) < EPSILON && Math.abs(point1.y - point2.y) < EPSILON;
}

declare const GeLib: {
  ArcUtils: {
    createArcFromPoints(start: any, end: any, center: Point3D, radius: number, clockwise: boolean): any;
  };
};

declare const DocManager: {
  instance(): {
    geometries: Map<string, GeometryData>;
  };
};

declare global {
  interface Array<T> {
    xPushCollection?(items: T[]): void;
  }
}