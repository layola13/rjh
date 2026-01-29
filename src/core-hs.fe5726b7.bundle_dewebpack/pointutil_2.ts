interface Point {
  id: string;
}

interface Wall {
  id: string;
  from: Point;
  to: Point;
  center?: Point;
  radius?: number;
  clockwise?: boolean;
  length: number;
  isLoadBearing: boolean;
  height3d: number;
  width: number;
  isValid(): boolean;
  merge(wall: Wall): void;
}

interface Edge {
  from: Point;
  to: Point;
}

interface MergeResult {
  merge: Wall[];
}

interface WallWrapInfo {
  isWrapped: boolean;
}

interface NeighborWalls {
  // Define based on your domain model
}

interface AssociationManager {
  getEntityByTarget(target: Point, exact: boolean): HSCore.Model.Wall | HSCore.Model.Vertex | null;
  removeAssociation(entityId: string, target: Point): void;
  addAssociation(entity: HSCore.Model.Wall | HSCore.Model.Vertex, target: Point, associationType: string): void;
}

interface DocumentManager {
  associationManager: AssociationManager;
}

declare namespace HSCore {
  namespace Util {
    namespace Point {
      function getParentWalls(point: Point): Wall[];
      function getParentEdges(point: Point): Edge[];
    }
    namespace Math {
      function isSamePoint(point1: Point, point2: Point): boolean;
      function nearlyEquals(value1: number, value2: number): boolean;
    }
    namespace Wall {
      function isArcWall(wall: Wall): boolean;
      function getClassifiedNeighborWalls(wall: Wall, includeWrapped: boolean): NeighborWalls;
      function getWallWrapInfo(wall: Wall, neighbors: NeighborWalls): WallWrapInfo;
    }
  }
  namespace Doc {
    function getDocManager(): DocumentManager;
  }
  namespace Model {
    class Wall {
      ID: string;
    }
    class Vertex {
      // Define vertex properties
    }
  }
}

declare namespace HSConstants {
  namespace ModelClass {
    const PointOnPointAssociation: string;
    const PointOnLineAssociation: string;
  }
}

declare namespace GeLib {
  namespace VectorUtils {
    function toTHREEVector3(point: Point): THREE.Vector3;
  }
  namespace ArcUtils {
    function createArcFromPoints(
      from: THREE.Vector3,
      to: THREE.Vector3,
      center: Point,
      radius: number,
      clockwise: boolean
    ): THREE.ArcCurve;
  }
  namespace LineUtils {
    function isSameLines(line1: THREE.Line3, line2: THREE.Line3): boolean;
  }
  namespace MathUtils {
    function nearlyEqual(value1: number, value2: number, tolerance: number): boolean;
  }
}

declare namespace THREE {
  class Vector3 {}
  class Line3 {
    constructor(start: Vector3, end: Vector3);
  }
  class ArcCurve {
    aX: number;
    aY: number;
    xRadius: number;
  }
}

export const PointUtil = {
  canMergeWall(point: Point): boolean {
    const walls = HSCore.Util.Point.getParentWalls(point);
    if (walls.length === 0 || walls.length > 3) {
      return false;
    }

    walls.sort((wall1, wall2) => wall2.length - wall1.length);

    const mergeResult = this.findMergeWalls(walls);
    if (!mergeResult || mergeResult.merge.length < 2) {
      return false;
    }

    const matchingWalls = mergeResult.merge.filter(
      (wall) =>
        wall &&
        (HSCore.Util.Math.isSamePoint(wall.from, point) ||
          HSCore.Util.Math.isSamePoint(wall.to, point))
    );

    return matchingWalls.length === 2;
  },

  tryMergeWallOnPoint(point: Point, force: boolean = false): Wall | undefined {
    const walls = HSCore.Util.Point.getParentWalls(point);
    if (walls.length === 0) {
      return undefined;
    }

    if (!force && walls.length > 2) {
      return undefined;
    }

    walls.sort((wall1, wall2) => wall2.length - wall1.length);

    const mergeResult = this.findMergeWalls(walls);
    if (!mergeResult || mergeResult.merge.length < 2) {
      return undefined;
    }

    const matchingWalls = mergeResult.merge.filter(
      (wall) =>
        wall &&
        (HSCore.Util.Math.isSamePoint(wall.from, point) ||
          HSCore.Util.Math.isSamePoint(wall.to, point))
    );

    if (matchingWalls.length !== 2) {
      return undefined;
    }

    const primaryWall = matchingWalls[0];
    primaryWall.merge(matchingWalls[1]);
    return primaryWall;
  },

  findMergeWalls(walls: Wall[]): MergeResult | undefined {
    for (let i = 0; i < walls.length; i++) {
      if (!walls[i].isValid()) {
        continue;
      }

      let mergeableWall: Wall | undefined;
      const hasMergeableWall = walls.some((wall) => {
        if (wall.id === walls[i].id || !wall.isValid()) {
          return false;
        }

        if (!this._canMerge(walls[i], wall)) {
          return false;
        }

        mergeableWall = wall;
        return true;
      });

      if (hasMergeableWall && mergeableWall) {
        return {
          merge: [walls[i], mergeableWall]
        };
      }
    }

    return undefined;
  },

  _canMerge(wall1: Wall, wall2: Wall): boolean {
    function createGeometry(wall: Wall): THREE.Line3 | THREE.ArcCurve {
      const fromVector = GeLib.VectorUtils.toTHREEVector3(wall.from);
      const toVector = GeLib.VectorUtils.toTHREEVector3(wall.to);

      if (HSCore.Util.Wall.isArcWall(wall)) {
        return GeLib.ArcUtils.createArcFromPoints(
          fromVector,
          toVector,
          wall.center!,
          wall.radius!,
          wall.clockwise!
        );
      } else {
        return new THREE.Line3(fromVector, toVector);
      }
    }

    function isSameGeometry(wall1: Wall, wall2: Wall): boolean {
      const geometry1 = createGeometry(wall1);
      const geometry2 = createGeometry(wall2);

      if (
        (geometry1 instanceof THREE.Line3 && geometry2 instanceof THREE.ArcCurve) ||
        (geometry1 instanceof THREE.ArcCurve && geometry2 instanceof THREE.Line3)
      ) {
        return false;
      }

      if (geometry1 instanceof THREE.Line3 && geometry2 instanceof THREE.Line3) {
        return GeLib.LineUtils.isSameLines(geometry1, geometry2);
      }

      if (geometry1 instanceof THREE.ArcCurve && geometry2 instanceof THREE.ArcCurve) {
        const tolerance = 0.001;
        return (
          GeLib.MathUtils.nearlyEqual(geometry1.aX, geometry2.aX, tolerance) &&
          GeLib.MathUtils.nearlyEqual(geometry1.aY, geometry2.aY, tolerance) &&
          GeLib.MathUtils.nearlyEqual(geometry1.xRadius, geometry2.xRadius, tolerance)
        );
      }

      return false;
    }

    if (
      wall1.from !== wall2.to &&
      wall1.to !== wall2.from &&
      wall1.from !== wall2.from &&
      wall1.to !== wall2.to
    ) {
      return false;
    }

    if (!isSameGeometry(wall1, wall2)) {
      return false;
    }

    if (wall1.isLoadBearing !== wall2.isLoadBearing) {
      return false;
    }

    if (!HSCore.Util.Math.nearlyEquals(wall1.height3d, wall2.height3d)) {
      return false;
    }

    const neighborWalls = HSCore.Util.Wall.getClassifiedNeighborWalls(wall2, true);
    const wrapInfo = HSCore.Util.Wall.getWallWrapInfo(wall2, neighborWalls);

    if (!wrapInfo.isWrapped && !HSCore.Util.Math.nearlyEquals(wall1.width, wall2.width)) {
      return false;
    }

    return true;
  },

  getAssociatedWall(point: Point): HSCore.Model.Wall | null {
    const associatedEntity = HSCore.Doc.getDocManager().associationManager.getEntityByTarget(
      point,
      false
    );

    if (associatedEntity && associatedEntity instanceof HSCore.Model.Wall) {
      return associatedEntity;
    }

    return null;
  },

  getConnectPoints(point: Point): Point[] {
    const edges = HSCore.Util.Point.getParentEdges(point);
    const pointMap: Record<string, Point> = {};

    edges.forEach((edge) => {
      pointMap[edge.from.id] = edge.from;
      pointMap[edge.to.id] = edge.to;
    });

    delete pointMap[point.id];

    return Object.values(pointMap);
  },

  setAssociateEntity(point: Point, entity: HSCore.Model.Vertex | HSCore.Model.Wall | null): void {
    const associationManager = HSCore.Doc.getDocManager().associationManager;
    const currentEntity = associationManager.getEntityByTarget(point, false);

    if (currentEntity === entity) {
      return;
    }

    if (currentEntity) {
      associationManager.removeAssociation(currentEntity.ID, point);
    }

    if (entity) {
      if (entity instanceof HSCore.Model.Vertex) {
        associationManager.addAssociation(
          entity,
          point,
          HSConstants.ModelClass.PointOnPointAssociation
        );
      } else if (entity instanceof HSCore.Model.Wall) {
        associationManager.addAssociation(
          entity,
          point,
          HSConstants.ModelClass.PointOnLineAssociation
        );
      }
    }
  }
};