interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface PointEntity {
  parents: Record<string, unknown>;
}

interface Wall {
  from: Point2D | Point3D;
  to: Point2D | Point3D;
}

declare namespace HSCore {
  namespace Model {
    class Edge {}
  }
  namespace Util {
    namespace Math {
      function isSamePoint(
        point1: Point2D | Point3D,
        point2: Point2D | Point3D,
        tolerance: number
      ): boolean;
    }
  }
}

const POINT_TOLERANCE = 0.001;
const DIMENSION_2D = 2;
const DIMENSION_3D = 3;

export const PointUtil = {
  /**
   * Get all parent walls associated with a point entity
   */
  getParentWalls(pointEntity: PointEntity | null | undefined): Wall[] {
    const walls: Wall[] = [];
    if (!pointEntity) return walls;

    for (const key in pointEntity.parents) {
      const parent = pointEntity.parents[key];
      if (parent instanceof Wall && !walls.includes(parent)) {
        walls.push(parent);
      }
    }

    return walls;
  },

  /**
   * Get all parent edges associated with a point entity
   */
  getParentEdges(pointEntity: PointEntity | null | undefined): HSCore.Model.Edge[] {
    const edges: HSCore.Model.Edge[] = [];
    if (!pointEntity) return edges;

    for (const key in pointEntity.parents) {
      const parent = pointEntity.parents[key];
      if (!edges.includes(parent as HSCore.Model.Edge) && parent instanceof HSCore.Model.Edge) {
        edges.push(parent as HSCore.Model.Edge);
      }
    }

    return edges;
  },

  /**
   * Replace a point with another in all parent walls if they are at the same position
   */
  replace(oldPoint: Point2D | Point3D, newPoint: Point2D | Point3D): void {
    if (oldPoint !== newPoint && HSCore.Util.Math.isSamePoint(oldPoint, newPoint, POINT_TOLERANCE)) {
      this.getParentWalls(oldPoint as unknown as PointEntity).forEach((wall) => {
        if (wall.from === oldPoint) {
          wall.from = newPoint;
        } else if (wall.to === oldPoint) {
          wall.to = newPoint;
        }
      });
    }
  },

  /**
   * Serialize 2D points to a flat number array
   */
  savePoints2(points: Point2D[]): number[] | undefined {
    return this._savePoints(points, DIMENSION_2D);
  },

  /**
   * Deserialize 2D points from a flat number array
   */
  loadPoints2(data: number[] | Point2D[] | null | undefined): Point2D[] {
    if (!data || data.length === 0) return [];
    if (typeof data[0] !== 'number') return data as Point2D[];
    return this._loadPoints(data as number[], DIMENSION_2D) as Point2D[];
  },

  /**
   * Serialize 3D points to a flat number array
   */
  savePoints3(points: Point3D[]): number[] | undefined {
    return this._savePoints(points, DIMENSION_3D);
  },

  /**
   * Deserialize 3D points from a flat number array
   */
  loadPoints3(data: number[] | Point3D[] | null | undefined): Point3D[] {
    if (!data || data.length === 0) return [];
    if (typeof data[0] !== 'number') return data as Point3D[];
    return this._loadPoints(data as number[], DIMENSION_3D) as Point3D[];
  },

  _savePoints(points: Point2D[] | Point3D[], dimension: number): number[] | undefined {
    if (!points || points.length === 0) return undefined;
    if (dimension !== DIMENSION_2D && dimension !== DIMENSION_3D) return undefined;

    const is3D = dimension === DIMENSION_3D;
    const result: number[] = [];

    for (let i = 0, length = points.length; i < length; i++) {
      const point = points[i];
      if (point) {
        result.push(point.x, point.y);
        if (is3D) {
          result.push((point as Point3D).z);
        }
      }
    }

    return result;
  },

  _loadPoints(data: number[], dimension: number): Point2D[] | Point3D[] | undefined {
    if (!data || data.length === 0) return [];
    if (typeof data[0] !== 'number') return data as Point2D[] | Point3D[];
    if (dimension !== DIMENSION_2D && dimension !== DIMENSION_3D) return undefined;

    const is3D = dimension === DIMENSION_3D;
    const points: (Point2D | Point3D)[] = [];
    const validLength = Math.floor(data.length / dimension) * dimension;

    for (let i = 0; i < validLength; i += dimension) {
      const point = is3D
        ? { x: data[i], y: data[i + 1], z: data[i + 2] }
        : { x: data[i], y: data[i + 1] };
      points.push(point);
    }

    return points;
  }
};