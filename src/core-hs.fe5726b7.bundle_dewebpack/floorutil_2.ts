import { ClipMode } from './ClipMode';
import { TgUtil } from './TgUtil';
import { LayerUtil } from './LayerUtil';
import { TgWallUtil } from './TgWallUtil';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Loop {
  loopPoints: Point2D[];
  boundEdgeIds: string[];
}

interface Wall {
  id: string;
  from: Point2D;
  to: Point2D;
  getFaces(faceType: number): Record<string, Face>;
}

interface Face {
  isSplitCeiling?: boolean;
  worldRawPath2d: Point2D[];
  getUniqueParent(): Layer | null;
}

interface CeilingSlab {
  getFaces(faceType: number): Record<string, Face>;
}

interface Layer {
  walls: Record<string, Wall>;
  forEachCeilingSlab(callback: (slab: CeilingSlab) => void): void;
}

interface Entity {
  worldRawPath2d: Point2D[];
  getOuterLoopVertices(): Point2D[];
  getOuterLoopPolygon(): Point2D[] | null;
}

interface FindWallsResult {
  faces: Face[];
  walls: Wall[];
  loop: Loop;
}

/**
 * Converts loop points from 2D to 3D coordinates
 */
function convertLoopPointsTo3D(loopPoints: Point2D[]): Point3D[] {
  const result: Point3D[] = [];
  loopPoints.forEach((point) => {
    result.push({
      x: point.x,
      y: point.y,
      z: 0
    });
  });
  return result;
}

/**
 * Utility class for floor-related operations
 */
export const FloorUtil = {
  /**
   * Finds the ceiling face that best matches the given entity
   */
  getFloorCeiling(entity: Entity): Face | undefined {
    const layer = HSCore.Util.Layer.getEntityLayer(entity);
    if (!layer) {
      return undefined;
    }

    const entityPath = entity.worldRawPath2d;
    let bestCeilingFace: Face | undefined;
    let maxOverlapArea = 0;

    layer.forEachCeilingSlab((slab: CeilingSlab) => {
      const bottomFaces = slab.getFaces(HSCore.Model.SlabFaceType.bottom);
      
      for (const faceKey in bottomFaces) {
        const face = bottomFaces[faceKey];
        
        if (face.isSplitCeiling) {
          continue;
        }

        const facePath = face.worldRawPath2d;
        const intersection = TgUtil.clip([entityPath], [facePath], ClipMode.Inter);
        const overlapArea = TgWallUtil.getArea(intersection);

        if (!bestCeilingFace || overlapArea > maxOverlapArea) {
          bestCeilingFace = face;
          maxOverlapArea = overlapArea;
        }
      }
    });

    return bestCeilingFace;
  },

  /**
   * Finds walls that form a loop with the given floor
   */
  findWallsLoopWithFloor(entity: Entity, targetFace: Face | null): FindWallsResult | undefined {
    const layer = LayerUtil.getEntityLayer(entity);
    if (!layer) {
      return undefined;
    }

    if (!targetFace) {
      return undefined;
    }

    const ccwLoops = targetFace.getCCWLoops();
    if (ccwLoops.length === 0) {
      return undefined;
    }

    const OFFSET_TOLERANCE = -0.02;
    const offsetPolygon = HSCore.Util.Collision.OffsetPolygon(
      [entity.getOuterLoopVertices()],
      OFFSET_TOLERANCE
    );

    const outerLoop = offsetPolygon?.[0];
    if (!outerLoop || outerLoop.length < 3) {
      return undefined;
    }

    let loop3DPoints: Point3D[] | undefined;
    const matchingLoop = ccwLoops.find((loop) => {
      loop3DPoints = convertLoopPointsTo3D(loop.loopPoints);
      return HSCore.Util.Math.isPolygonOverlapped(outerLoop, loop3DPoints);
    });

    if (!matchingLoop || !loop3DPoints) {
      return undefined;
    }

    const walls: Wall[] = [];
    let faces: Face[] = [];
    const findFaceMidPoint = HSCore.Util.Face.findFaceMidPoint;
    const POINT_IN_POLYGON_TOLERANCE = 1e-4;

    for (let i = 0; i < matchingLoop.boundEdgeIds.length; i++) {
      const edgeId = matchingLoop.boundEdgeIds[i];
      const wall = Object.values(layer.walls).find((w) => w.id === edgeId);
      
      if (!wall) {
        continue;
      }

      walls.push(wall);

      let wallFaces = Object.values(wall.getFaces(HSCore.Model.WallFaceType.left));
      wallFaces = wallFaces.concat(Object.values(wall.getFaces(HSCore.Model.WallFaceType.right)));

      const interiorFaces = wallFaces.filter((face) => {
        const midPoint = findFaceMidPoint(face);
        return GeLib.PolygonUtils.pointInPolygon(midPoint, loop3DPoints, POINT_IN_POLYGON_TOLERANCE) !== 0;
      });

      if (interiorFaces.length !== 0) {
        faces = faces.concat(interiorFaces);
      }
    }

    return {
      faces,
      walls,
      loop: matchingLoop
    };
  },

  /**
   * Gets the layer containing the given face
   */
  getFaceLayer(face: Face): Layer | null {
    return face.getUniqueParent();
  },

  /**
   * Finds all interior walls within the given floor
   */
  findInteriorWallsInFloor(floor: Entity): Wall[] {
    const outerPolygon = floor.getOuterLoopPolygon();
    if (!outerPolygon) {
      return [];
    }

    const layer = this.getFaceLayer(floor);
    if (!layer) {
      return [];
    }

    const allWalls = Object.values(layer.walls);
    const isWallOnBoundary = (wall: Wall): boolean => {
      return HSCore.Util.Math.isPointOnPolygon(wall.from, outerPolygon) ||
             HSCore.Util.Math.isPointOnPolygon(wall.to, outerPolygon);
    };

    const boundaryWalls: Wall[] = [];
    for (const wall of allWalls) {
      if (isWallOnBoundary(wall)) {
        boundaryWalls.push(wall);
      }
    }

    return boundaryWalls;
  }
};