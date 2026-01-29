import { Loop, MathAlg } from './Loop';
import { HSCore } from './HSCore';

interface FaceInfo {
  face: Face;
  moldingType: HSCore.Model.MoldingTypeEnum;
}

interface Face {
  getMolding(type: HSCore.Model.MoldingTypeEnum): unknown[];
  roomInfos: RoomInfo[];
}

interface RoomInfo {
  faces: Face[];
  beamFaces: BeamFace[];
}

interface BeamFace {
  getMaster(): BeamMaster | null;
}

interface BeamMaster {
  profile: ProfilePoint[];
  parent: Slab | null;
}

interface ProfilePoint {
  getMidPt(): Point;
}

interface Point {
  x: number;
  y: number;
}

interface Slab {
  // Add specific slab properties as needed
}

interface TransactionManager {
  startSession(): Transaction;
  commit(request: Request): void;
  createRequest(type: string, args: unknown[]): Request;
}

interface Transaction {
  commit(): void;
}

interface Request {
  // Request properties
}

interface App {
  transManager: TransactionManager;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    AddWallFaceMolding: string;
  };
  LogGroupTypes: {
    FaceOperation: string;
  };
};

declare const HSMath: {
  MathAlg: {
    PositionJudge: {
      ptToLoop(point: Point, loop: Loop): { type: MathAlg.PtLoopPositonType };
    };
    PtLoopPositonType: {
      IN: symbol;
    };
  };
};

abstract class Command {
  abstract onExecute(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdClearFacesMolding extends Command {
  private readonly _facesInfo: FaceInfo[];

  constructor(facesInfo: FaceInfo[]) {
    super();
    this._facesInfo = facesInfo;
  }

  onExecute(): void {
    const session = HSApp.App.getApp().transManager.startSession();

    for (const faceInfo of this._facesInfo) {
      const { face, moldingType } = faceInfo;
      const molding = face.getMolding(moldingType) || [];

      const allFaces: Face[] = [];
      const allBeamFaces: BeamFace[] = [];

      face.roomInfos.forEach((roomInfo) => {
        allFaces.push(...roomInfo.faces);
        allBeamFaces.push(...roomInfo.beamFaces);
      });

      const uniqueFaces = Array.from(new Set(allFaces));
      const uniqueBeamFaces = Array.from(new Set(allBeamFaces));

      uniqueFaces?.forEach((currentFace) => {
        this._applyClearMoldingRequest(currentFace, moldingType);
      });

      if (
        uniqueBeamFaces &&
        molding &&
        molding.length >= 0 &&
        moldingType === HSCore.Model.MoldingTypeEnum.Cornice
      ) {
        uniqueBeamFaces.forEach((beamFace) => {
          const master = beamFace.getMaster();
          if (!master) {
            return;
          }

          const profileLoop = new Loop(master.profile);
          const parentSlab = master.parent;
          if (!parentSlab) {
            return;
          }

          const layerTopRoomPaths = HSCore.Util.TgSlab.getLayerTopRoomPaths(parentSlab);
          let shouldClear = true;

          for (const roomPath of layerTopRoomPaths) {
            const outerLoop = new Loop(roomPath.path.outer);
            const loopPosition = MathAlg.PositionJudge.loopToLoop(profileLoop, outerLoop);

            if (loopPosition === MathAlg.LoopLoopPositonType.IN) {
              const allPointsInside = master.profile.every((profilePoint) => {
                const midPoint = profilePoint.getMidPt();
                const pointPosition = HSMath.MathAlg.PositionJudge.ptToLoop(midPoint, outerLoop);
                return pointPosition.type === HSMath.MathAlg.PtLoopPositonType.IN;
              });

              if (allPointsInside) {
                shouldClear = false;
              }
            }
          }

          if (shouldClear) {
            this._applyClearMoldingRequest(beamFace, moldingType);
          }
        });
      }
    }

    session.commit();
  }

  private _applyClearMoldingRequest(
    face: Face | BeamFace,
    moldingType: HSCore.Model.MoldingTypeEnum
  ): void {
    const request = HSApp.App.getApp().transManager.createRequest(
      HSFPConstants.RequestType.AddWallFaceMolding,
      [undefined, face, moldingType]
    );
    HSApp.App.getApp().transManager.commit(request);
  }

  getDescription(): string {
    return '清空房间线条';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}