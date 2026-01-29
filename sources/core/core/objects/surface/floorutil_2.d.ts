import { ClipMode } from './ClipMode';
import { TgUtil } from './TgUtil';
import { LayerUtil } from './LayerUtil';
import { TgWallUtil } from './TgWallUtil';

/**
 * 3D point interface
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D polygon point array
 */
type Polygon2D = Point3D[];

/**
 * Wall entity interface
 */
interface Wall {
  id: string | number;
  getFaces(faceType: number): Record<string, WallFace>;
}

/**
 * Wall face interface
 */
interface WallFace {
  worldRawPath2d: Polygon2D;
}

/**
 * Floor slab entity interface
 */
interface FloorEntity {
  worldRawPath2d: Polygon2D;
  getOuterLoopVertices(): Polygon2D;
  getOuterLoopPolygon(): Polygon2D | null;
  getUniqueParent(): Layer | null;
}

/**
 * Ceiling slab face interface
 */
interface CeilingFace {
  isSplitCeiling: boolean;
  worldRawPath2d: Polygon2D;
}

/**
 * Ceiling slab interface
 */
interface CeilingSlab {
  getFaces(faceType: number): Record<string, CeilingFace>;
}

/**
 * Loop structure for floor boundaries
 */
interface Loop {
  loopPoints: Point3D[];
  boundEdgeIds: Array<string | number>;
}

/**
 * Layer containing architectural entities
 */
interface Layer {
  walls: Record<string, Wall>;
  forEachCeilingSlab(callback: (slab: CeilingSlab) => void): void;
}

/**
 * Result of finding walls loop with floor
 */
interface WallsLoopResult {
  faces: WallFace[];
  walls: Wall[];
  loop: Loop;
}

/**
 * Utility class for floor-related operations
 */
export const FloorUtil = {
  /**
   * Get the ceiling face above a given floor entity
   * @param floorEntity - The floor entity to find ceiling for
   * @returns The ceiling face with maximum overlap area, or undefined if not found
   */
  getFloorCeiling(floorEntity: FloorEntity): CeilingFace | undefined {
    const layer = HSCore.Util.Layer.getEntityLayer(floorEntity);
    if (!layer) return undefined;

    const floorPolygon = floorEntity.worldRawPath2d;
    let maxOverlapFace: CeilingFace | undefined;
    let maxOverlapArea = 0;

    layer.forEachCeilingSlab((ceilingSlab: CeilingSlab) => {
      const bottomFaces = ceilingSlab.getFaces(HSCore.Model.SlabFaceType.bottom);

      for (const faceKey in bottomFaces) {
        const face = bottomFaces[faceKey];
        if (face.isSplitCeiling) continue;

        const ceilingPolygon = face.worldRawPath2d;
        const intersection = TgUtil.clip([floorPolygon], [ceilingPolygon], ClipMode.Inter);
        const intersectionArea = TgWallUtil.getArea(intersection);

        if (!maxOverlapFace || intersectionArea > maxOverlapArea) {
          maxOverlapFace = face;
          maxOverlapArea = intersectionArea;
        }
      }
    });

    return maxOverlapFace;
  },

  /**
   * Find walls forming a loop with the given floor entity
   * @param floorEntity - The floor entity to analyze
   * @param targetEntity - The target entity containing loop information
   * @returns Object containing walls, faces, and loop, or undefined if not found
   */
  findWallsLoopWithFloor(
    floorEntity: FloorEntity,
    targetEntity?: { getCCWLoops(): Loop[] }
  ): WallsLoopResult | undefined {
    const layer = LayerUtil.getEntityLayer(floorEntity);
    if (!layer || !targetEntity) return undefined;

    const loops = targetEntity.getCCWLoops();
    if (loops.length === 0) return undefined;

    const offsetPolygon = offsetPolygonByDistance(floorEntity.getOuterLoopVertices());
    if (!offsetPolygon || offsetPolygon.length < 3) return undefined;

    let matchedLoopPoints: Polygon2D | undefined;
    const matchedLoop = loops.find((loop) => {
      matchedLoopPoints = convertLoopPointsTo2D(loop.loopPoints);
      return HSCore.Util.Math.isPolygonOverlapped(offsetPolygon, matchedLoopPoints);
    });

    if (!matchedLoop || !matchedLoopPoints) return undefined;

    const walls: Wall[] = [];
    let faces: WallFace[] = [];
    const findFaceMidPoint = HSCore.Util.Face.findFaceMidPoint;

    for (let i = 0; i < matchedLoop.boundEdgeIds.length; i++) {
      const edgeId = matchedLoop.boundEdgeIds[i];
      const wall = Object.values(layer.walls).find((w) => w.id === edgeId);
      if (!wall) continue;

      walls.push(wall);

      let wallFaces = Object.values(wall.getFaces(HSCore.Model.WallFaceType.left));
      wallFaces = wallFaces.concat(Object.values(wall.getFaces(HSCore.Model.WallFaceType.right)));

      const interiorFaces = wallFaces.filter((face) => {
        const midPoint = findFaceMidPoint(face);
        return GeLib.PolygonUtils.pointInPolygon(midPoint, matchedLoopPoints!, 1e-4) !== 0;
      });

      if (interiorFaces.length !== 0) {
        faces = faces.concat(interiorFaces);
      }
    }

    return {
      faces,
      walls,
      loop: matchedLoop,
    };
  },

  /**
   * Get the layer containing the given face entity
   * @param faceEntity - The face entity
   * @returns The parent layer
   */
  getFaceLayer(faceEntity: FloorEntity): Layer | null {
    return faceEntity.getUniqueParent();
  },

  /**
   * Find interior walls within a floor boundary
   * @param floorEntity - The floor entity to search within
   * @returns Array of walls that lie on the floor boundary
   */
  findInteriorWallsInFloor(floorEntity: FloorEntity): Wall[] {
    const floorPolygon = floorEntity.getOuterLoopPolygon();
    if (!floorPolygon) return [];

    const layer = this.getFaceLayer(floorEntity);
    if (!layer) return [];

    const allWalls = Object.values(layer.walls);
    const isWallOnBoundary = (wall: any): boolean => {
      return (
        HSCore.Util.Math.isPointOnPolygon(wall.from, floorPolygon) ||
        HSCore.Util.Math.isPointOnPolygon(wall.to, floorPolygon)
      );
    };

    const boundaryWalls: Wall[] = [];
    for (const wall of allWalls) {
      if (isWallOnBoundary(wall)) {
        boundaryWalls.push(wall);
      }
    }

    return boundaryWalls;
  },
};

/**
 * Offset a polygon inward by a small distance
 * @param vertices - Original polygon vertices
 * @returns Offset polygon or undefined if operation fails
 */
function offsetPolygonByDistance(vertices: Polygon2D): Polygon2D | undefined {
  const OFFSET_DISTANCE = -0.02;
  const offsetResult = HSCore.Util.Collision.OffsetPolygon([vertices], OFFSET_DISTANCE);
  if (offsetResult && offsetResult.length > 0) {
    return offsetResult[0];
  }
  return undefined;
}

/**
 * Convert 3D loop points to 2D by setting z to 0
 * @param loopPoints - Array of 3D points
 * @returns Array of 2D points with z=0
 */
function convertLoopPointsTo2D(loopPoints: Point3D[]): Polygon2D {
  const result: Polygon2D = [];
  loopPoints.forEach((point) => {
    result.push({
      x: point.x,
      y: point.y,
      z: 0,
    });
  });
  return result;
}