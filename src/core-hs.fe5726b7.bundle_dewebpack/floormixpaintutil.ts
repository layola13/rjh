interface RoomInfo {
  structures?: HSCore.Model.Structure[];
}

interface FloorEntity {
  roomInfos: RoomInfo[];
  worldRawPath2d: Path2D;
  rawPath2d: Path2D;
  surfaceObj: {
    localToWorld: Matrix4;
  };
}

interface Path2D {
  // Define based on actual usage
}

interface PathWithHoles {
  outer: Path2D[];
  holes: Path2D[][];
}

enum ClipMode {
  Union = 'Union'
}

class Plane {
  static XOY(): Plane {
    return new Plane();
  }

  getCurve3d(curve2d: Path2D): Curve3D {
    // Implementation
    return {} as Curve3D;
  }

  getCurve2d(curve3d: Curve3D): Path2D {
    // Implementation
    return {} as Path2D;
  }
}

class Matrix4 {
  inversed(): Matrix4 | null {
    return this;
  }
}

interface Curve3D {
  transform(matrix: Matrix4): Curve3D;
}

interface Opening {
  // Define based on actual opening structure
}

namespace HSCore.Model {
  export class Structure {}
  
  export class Wall extends Structure {
    openings: Record<string, Opening>;
  }
}

class ClipperService {
  static ins: ClipperService = new ClipperService();

  clip(
    subjects: Path2D[],
    clips: Path2D[],
    mode: ClipMode
  ): PathWithHoles[] {
    return [];
  }
}

class DoorStoneMixpaintUtil {
  static canOpeningPathMergedWithFloors(
    opening: Opening,
    floors: FloorEntity[]
  ): boolean {
    return false;
  }

  static getOpeningBottomPathOnFloor(opening: Opening): Path2D | null {
    return null;
  }
}

export class FloorMixpaintUtil {
  private static _getUniqueRoomInfo(floor: FloorEntity): RoomInfo | undefined {
    if (floor.roomInfos.length > 0) {
      return floor.roomInfos[0];
    }
    return undefined;
  }

  static getFloorBackgroundWithOpening(
    floor: FloorEntity,
    transformToLocal: boolean = true
  ): Path2D | PathWithHoles {
    const worldPath = floor.worldRawPath2d;
    const openingPaths = this.getOpeningPaths(floor);
    const clippedPaths = ClipperService.ins.clip(
      [worldPath],
      openingPaths,
      ClipMode.Union
    );

    if (clippedPaths.length === 1) {
      if (!transformToLocal) {
        return clippedPaths[0];
      }

      const { outer, holes } = clippedPaths[0];
      const plane = Plane.XOY();
      const inverseTransform = floor.surfaceObj.localToWorld.inversed() ?? new Matrix4();

      return {
        outer: outer.map((curve2d: Path2D) => {
          const curve3d = plane.getCurve3d(curve2d).transform(inverseTransform);
          return plane.getCurve2d(curve3d);
        }),
        holes: holes?.map((holeGroup: Path2D[]) =>
          holeGroup.map((curve2d: Path2D) => {
            const curve3d = plane.getCurve3d(curve2d).transform(inverseTransform);
            return plane.getCurve2d(curve3d);
          })
        ) ?? []
      };
    }

    return transformToLocal ? floor.rawPath2d : floor.worldRawPath2d;
  }

  static getOpeningPaths(floor: FloorEntity): Path2D[] {
    const roomInfo = this._getUniqueRoomInfo(floor);
    const structures = roomInfo?.structures ?? [];
    const openingPaths: Path2D[] = [];

    structures.forEach((structure: HSCore.Model.Structure) => {
      if (structure instanceof HSCore.Model.Wall) {
        for (const key in structure.openings) {
          const opening = structure.openings[key];
          
          if (DoorStoneMixpaintUtil.canOpeningPathMergedWithFloors(opening, [floor])) {
            const openingPath = DoorStoneMixpaintUtil.getOpeningBottomPathOnFloor(opening);
            if (openingPath) {
              openingPaths.push(openingPath);
            }
          }
        }
      }
    });

    return openingPaths;
  }
}