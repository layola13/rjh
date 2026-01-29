import { MathAlg } from './math-alg';
import { Wall } from './wall';

interface RawPath {
  outer: any[];
}

interface FaceInfo {
  id: string;
  rawPath: RawPath;
  roomInfos: any[];
  holesPath: RawPath[];
}

interface Opening {
  faceList: FaceInfo[];
  splitFaceList: FaceInfo[];
  host: Wall | any;
  getBrotherFace(faceId: string): FaceInfo | null;
}

interface WallFaces {
  aWallFaces: FaceInfo[];
  bWallFaces: FaceInfo[];
}

interface SplitFacePairs extends WallFaces {
  aFaces: FaceInfo[];
  bFaces: FaceInfo[];
}

interface AFacePairs {
  aFaces: FaceInfo[];
  aWallFaces: FaceInfo[];
}

export class ParametricOpeningDecorator {
  private readonly _opening: Opening;

  constructor(opening: Opening) {
    this._opening = opening;
  }

  /**
   * Get split face pairs organized by A and B sides with their corresponding wall faces
   */
  getSplitABFacePairs(): SplitFacePairs {
    const opening = this._opening;
    const facePairs = this._getUnorderedABFacePairs(opening);
    const { aWallFaces, bWallFaces } = this._getABWallFaces();

    facePairs.forEach((pair) => {
      const hasOverlap = aWallFaces.some((wallFace) =>
        wallFace.holesPath.some((holePath) =>
          this._isOverlap(pair[0].rawPath, holePath)
        )
      );

      if (!hasOverlap) {
        pair.reverse();
      }
    });

    return {
      aFaces: facePairs.map((pair) => pair[0]),
      bFaces: facePairs.map((pair) => pair[1]),
      aWallFaces,
      bWallFaces
    };
  }

  /**
   * Get face pairs for A side only
   */
  getAFacePairs(): AFacePairs {
    const faceList = this._opening.faceList;
    const aFaces: FaceInfo[] = [];
    const { aWallFaces } = this._getABWallFaces();

    faceList.forEach((face) => {
      const hasOverlap = aWallFaces.some((wallFace) =>
        wallFace.holesPath.some((holePath) =>
          this._isOverlap(face.rawPath, holePath)
        )
      );

      if (hasOverlap) {
        aFaces.push(face);
      }
    });

    return {
      aFaces,
      aWallFaces
    };
  }

  /**
   * Get wall faces separated into A and B sides based on room information
   */
  private _getABWallFaces(): WallFaces {
    const host = this._opening.host;
    let aWallFaces: FaceInfo[] = [];
    let bWallFaces: FaceInfo[] = [];

    if (host instanceof Wall) {
      const leftFaces = Object.values(host.leftFaces) as FaceInfo[];
      const rightFaces = Object.values(host.rightFaces) as FaceInfo[];
      const hasRightRoomInfo = rightFaces.length && rightFaces[0].roomInfos.length;

      aWallFaces = hasRightRoomInfo ? rightFaces : leftFaces;
      bWallFaces = hasRightRoomInfo ? leftFaces : rightFaces;
    }

    return {
      aWallFaces,
      bWallFaces
    };
  }

  /**
   * Get unordered pairs of brother faces from split face list
   */
  private _getUnorderedABFacePairs(opening: Opening): Array<[FaceInfo, FaceInfo]> {
    const processedFaces = new Set<FaceInfo>();
    const facePairs: Array<[FaceInfo, FaceInfo]> = [];

    opening.splitFaceList.forEach((face) => {
      if (!processedFaces.has(face)) {
        const brotherFace = opening.getBrotherFace(face.id);

        if (brotherFace) {
          processedFaces.add(face);
          processedFaces.add(brotherFace);
          facePairs.push([face, brotherFace]);
        }
      }
    });

    return facePairs;
  }

  /**
   * Check if two raw paths have overlapping curves
   */
  private _isOverlap(pathA: RawPath, pathB: RawPath): boolean {
    return pathA.outer.some((curveA) =>
      pathB.outer.some((curveB) => {
        const positionType = MathAlg.PositionJudge.curveCurveOverlap(curveB, curveA);
        return (
          positionType === MathAlg.CurveCuvePositonType.OVERLAP ||
          positionType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
        );
      })
    );
  }
}