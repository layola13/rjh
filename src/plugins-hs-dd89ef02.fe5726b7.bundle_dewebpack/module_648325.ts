import type { NgEntity, NgFace, NgFloor, NgObstacle } from './types/models';
import type { MoldingTypeEnum, Molding } from './types/molding';

interface RoomInfo {
  faces: NgFace[];
  beamFaces: NgFace[];
}

interface EntityWithRoomInfos {
  roomInfos: RoomInfo[];
  getMolding(type: MoldingTypeEnum): Molding[] | undefined;
}

interface GeometryManager {
  getFaceRoomInfo(entity: EntityWithRoomInfos): FaceRoomInfo | null;
}

interface FaceRoomInfo {
  floor?: NgFloor;
}

interface App {
  geometryManager: GeometryManager;
}

interface RequestManager {
  createRequest(type: string, args: unknown[]): unknown;
}

abstract class CompositeRequest {
  protected _subRequests: unknown[] = [];
  protected mgr!: RequestManager;

  protected append(request: unknown): void {
    this._subRequests.push(request);
  }

  abstract onCommit(): void;
}

declare const HSFPConstants: {
  RequestType: {
    AddWallFaceMolding: string;
    SetObstacleMolding: string;
  };
};

declare const HSCore: {
  Model: {
    MoldingTypeEnum: {
      Baseboard: MoldingTypeEnum;
      Cornice: MoldingTypeEnum;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: typeof CompositeRequest;
    };
  };
  Util: {
    TgSlab: {
      getLayerTopRoomPaths(parent: unknown): Array<{ outer: unknown[] }>;
    };
  };
};

declare const HSConstants: {
  ModelClass: {
    NgFloor: string;
    NgObstacle: string;
  };
};

declare const HSMath: {
  Loop: new (profile: unknown[]) => {
    outer?: unknown[];
  };
  MathAlg: {
    PositionJudge: {
      loopToLoop(loop1: unknown, loop2: unknown): string;
      ptToLoop(point: unknown, loop: unknown): { type: string };
    };
    LoopLoopPositonType: {
      IN: string;
    };
    PtLoopPositonType: {
      IN: string;
    };
  };
};

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

interface BeamFace {
  getMaster(): BeamMaster | null;
  getMolding(type: MoldingTypeEnum): Molding[] | undefined;
}

interface BeamMaster {
  profile: Array<{ getMidPt(): unknown }>;
  parent?: unknown;
}

/**
 * Request to apply molding to all wall faces
 */
export class ApplyToAllWallFaceMoldingRequest extends HSCore.Transaction.Common.CompositeRequest {
  private entity: EntityWithRoomInfos;
  private faces: NgFace[];
  private beamFaces: NgFace[];
  private wallMoldingType?: MoldingTypeEnum;

  constructor(entity: EntityWithRoomInfos, wallMoldingType?: MoldingTypeEnum) {
    super();
    this.entity = entity;

    const allFaces: NgFace[] = [];
    const allBeamFaces: NgFace[] = [];

    entity.roomInfos.forEach((roomInfo) => {
      allFaces.push(...roomInfo.faces);
      allBeamFaces.push(...roomInfo.beamFaces);
    });

    this.faces = Array.from(new Set(allFaces));
    this.beamFaces = Array.from(new Set(allBeamFaces));
    this.wallMoldingType = wallMoldingType;
  }

  onCommit(): void {
    const addMoldingToFace = (
      face: NgFace,
      moldingType: MoldingTypeEnum,
      molding?: Molding
    ): void => {
      const existingMolding = face.getMolding(moldingType);
      if ((existingMolding && existingMolding.length !== 0) || molding) {
        const request = this.mgr.createRequest(
          HSFPConstants.RequestType.AddWallFaceMolding,
          [molding, face, moldingType]
        );
        this.append(request);
      }
    };

    const processWallMoldingType = (moldingType: MoldingTypeEnum): void => {
      const moldings = this.entity.getMolding(moldingType) || [];

      this.faces.forEach((face) => {
        addMoldingToFace(face, moldingType, moldings[0]);
      });

      if (
        this.beamFaces &&
        moldings &&
        moldings.length >= 0 &&
        moldingType === HSCore.Model.MoldingTypeEnum.Cornice
      ) {
        this.beamFaces.forEach((beamFace) => {
          const master = (beamFace as unknown as BeamFace).getMaster();
          if (!master) {
            return;
          }

          const masterLoop = new HSMath.Loop(master.profile);
          const parent = master.parent;
          if (!parent) {
            return;
          }

          const layerPaths = HSCore.Util.TgSlab.getLayerTopRoomPaths(parent);
          let shouldAddMolding = true;

          for (const path of layerPaths) {
            const pathLoop = new HSMath.Loop(path.outer);
            const loopPosition = HSMath.MathAlg.PositionJudge.loopToLoop(
              masterLoop,
              pathLoop
            );

            if (loopPosition === HSMath.MathAlg.LoopLoopPositonType.IN) {
              const allPointsInside = master.profile.every((profilePt) => {
                const midPoint = profilePt.getMidPt();
                const pointPosition = HSMath.MathAlg.PositionJudge.ptToLoop(
                  midPoint,
                  pathLoop
                );
                return pointPosition.type === HSMath.MathAlg.PtLoopPositonType.IN;
              });

              if (allPointsInside) {
                shouldAddMolding = false;
                break;
              }
            }
          }

          if (shouldAddMolding) {
            addMoldingToFace(beamFace, moldingType, moldings[0]);
          }
        });
      }

      const faceRoomInfo = HSApp.App.getApp().geometryManager.getFaceRoomInfo(
        this.entity
      );

      if (
        faceRoomInfo &&
        moldings &&
        moldings.length > 0 &&
        faceRoomInfo.floor?.instanceOf(HSConstants.ModelClass.NgFloor) &&
        (faceRoomInfo.floor as unknown as { contents?: Record<string, NgObstacle> })
          .contents
      ) {
        const contents = (
          faceRoomInfo.floor as unknown as { contents: Record<string, NgObstacle> }
        ).contents;

        for (const key in contents) {
          const obstacle = contents[key];
          if (
            obstacle &&
            obstacle.instanceOf(HSConstants.ModelClass.NgObstacle)
          ) {
            const obstacleMolding = obstacle.getMolding
              ? obstacle.getMolding(moldingType)
              : undefined;

            const moldingsChanged =
              (moldings[0] && !moldings[0].isSameMolding(obstacleMolding)) ||
              (obstacleMolding && !obstacleMolding.isSameMolding(moldings[0]));

            if (moldingsChanged) {
              const request = this.mgr.createRequest(
                HSFPConstants.RequestType.SetObstacleMolding,
                [moldings[0], obstacle, moldingType]
              );
              this.append(request);
            }
          }
        }
      }
    };

    if (this.wallMoldingType === undefined) {
      processWallMoldingType(HSCore.Model.MoldingTypeEnum.Baseboard);
      processWallMoldingType(HSCore.Model.MoldingTypeEnum.Cornice);
    } else {
      processWallMoldingType(this.wallMoldingType);
    }

    if (this._subRequests.length > 0) {
      super.onCommit();
    }
  }
}