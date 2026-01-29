import { Loop } from './Loop';
import { Vertex } from './Vertex';

interface Point3D {
  x: number;
  y: number;
  z?: number;
}

interface ArcInfo {
  center: Point3D;
  clockwise: boolean;
}

interface SplitEdgeInfo {
  isSplitEdge: boolean;
  isInnerEdge: boolean;
}

interface LoopPoint extends Point3D {
  arcInfo?: ArcInfo;
  splitEdgeInfo?: SplitEdgeInfo;
}

interface DivideInfo extends Array<LoopPoint[]> {}

interface CeilingEntity {
  outerLoop: unknown;
  divideInfo?: DivideInfo;
  __material?: unknown;
}

interface Edge {
  parents: Record<string, unknown>;
  isSplitEdge: boolean;
  isInnerEdge: boolean;
  changeToArcEdge(center: Point3D, clockwise: boolean): void;
}

interface CoEdge {
  edge: Edge;
  reversed: boolean;
}

interface ClipOptions {
  operation: unknown;
}

export const CeilingUtil = {
  getCeilingFloor(entity: unknown): unknown | undefined {
    const layer = HSCore.Util.Layer.getEntityLayer(entity);
    if (!layer) return;

    const geometryManager = HSCore.Doc.getDocManager().geometryManager;
    let targetFloor: unknown | undefined;

    layer.forEachFloor((floor: unknown) => {
      const roomInfo = geometryManager.getFaceRoomInfo(floor);
      if (roomInfo && roomInfo.ceilingFace === entity) {
        targetFloor = floor;
      }
    });

    return targetFloor;
  },

  isValidDivideInfo(outerLoopPoints: LoopPoint[], divideInfo: LoopPoint[][]): boolean {
    const clippedPolygons = HSCore.Util.Collision.ClipPolygon(
      [outerLoopPoints],
      divideInfo,
      {
        operation: HSCore.Util.Collision.ClipType.diff
      }
    );

    return !(clippedPolygons && clippedPolygons.length > 0);
  },

  loadCeilingDivideInfo(ceiling: CeilingEntity, options: unknown): void {
    let divideInfo = ceiling.divideInfo;
    const vertexCache: Point3D[] = [];
    const outerLoopPoints = HSCore.Util.Loop.getLoopPoints(ceiling.outerLoop);

    const createLoopFromPoints = (points: LoopPoint[]): void => {
      const vertices: unknown[] = [];
      const arcInfos: (ArcInfo | undefined)[] = [];
      const splitEdgeInfos: (SplitEdgeInfo | undefined)[] = [];

      points.forEach((point: LoopPoint) => {
        const cachedVertex = vertexCache.find((cached: Point3D) =>
          HSCore.Util.Math.isSamePoint3(cached, point)
        );

        if (cachedVertex) {
          vertices.push(cachedVertex);
        } else {
          const newVertex = Vertex.create(point.x, point.y, point.z ?? 0);
          vertices.push(newVertex);
          vertexCache.push(vertices[vertices.length - 1] as Point3D);
        }

        arcInfos.push(point.arcInfo);
        splitEdgeInfos.push(point.splitEdgeInfo);
      });

      const loop = Loop.createFromPoints(vertices);
      const hasNoSplitEdgeInfo = splitEdgeInfos.every((info: SplitEdgeInfo | undefined) => !info);
      let edgeIndex = 0;

      loop.forEachCoEdge((coEdge: CoEdge) => {
        if (hasNoSplitEdgeInfo && Object.keys(coEdge.edge.parents).length > 1) {
          coEdge.edge.isSplitEdge = true;
        }

        const arcInfo = arcInfos[edgeIndex];
        if (arcInfo) {
          coEdge.edge.changeToArcEdge(
            arcInfo.center,
            coEdge.reversed ? !arcInfo.clockwise : arcInfo.clockwise
          );
        }

        const splitEdgeInfo = splitEdgeInfos[edgeIndex];
        if (splitEdgeInfo) {
          coEdge.edge.isSplitEdge = splitEdgeInfo.isSplitEdge;
          coEdge.edge.isInnerEdge = splitEdgeInfo.isInnerEdge;
        }

        edgeIndex++;
      });

      const createdCeiling = HSCore.Model.Ceiling.create([], loop, ceiling.__material);
      createdCeiling.isSplitCeiling = true;
    };

    if (divideInfo && !this.isValidDivideInfo(outerLoopPoints, divideInfo)) {
      divideInfo = undefined;
    }

    if (!divideInfo || divideInfo.length <= 1) {
      ceiling.divideInfo = [];
      createLoopFromPoints(outerLoopPoints);
    } else {
      divideInfo.forEach((pointsList: LoopPoint[]) => {
        createLoopFromPoints(pointsList);
      });
    }
  }
};