import { Material } from './Material';
import { Entity } from './Entity';
import { Request } from './Request';
import { Face } from './Face';
import { SpaceInfo } from './SpaceInfo';
import { Floor } from './Floor';
import { GeometryManager } from './GeometryManager';

interface RoomInfo {
  floor?: Floor;
}

interface MaterialData {
  flipX: boolean;
  flipY: boolean;
  mixpaint?: {
    faceGroupId: string;
  };
}

interface ObstacleEntity extends Entity {
  traverseBodyGraphicsData(callback: (data: GraphicsData, key: string) => void): void;
}

interface GraphicsData {
  customData?: {
    fpMaterialData?: MaterialData;
  };
}

interface Application {
  geometryManager: GeometryManager;
}

interface PaintPluginHelper {
  Pave: {
    FaceGroupHelper: {
      groupSameLineFaces(faces: Face[]): Face[][];
    };
  };
}

declare const HSApp: {
  PaintPluginHelper: PaintPluginHelper;
  App: {
    getApp(): Application;
  };
};

declare const HSCore: {
  Material: {
    Util: {
      getEntityMaterial(face: Face): Material;
    };
  };
  Transaction: {
    Common: {
      CompositeRequest: new () => CompositeRequest;
    };
  };
};

declare const HSFPConstants: {
  RequestType: {
    EditWallFacePaper: string;
    ApplyMaterialToObstacleRequest: string;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgObstacle: string;
    NgColumn: string;
    NgFlue: string;
    NgBeam: string;
  };
};

abstract class CompositeRequest {
  protected _subRequests: Request[] = [];
  protected mgr: RequestManager;

  protected append(request: Request): void {
    this._subRequests.push(request);
  }

  abstract onCommit(): void;
}

interface RequestManager {
  createRequest(type: string, args: unknown[]): Request;
}

interface EntityWithSpaceInfos extends Entity {
  id: string;
  material: Material;
  spaceInfos?: SpaceInfo[];
}

/**
 * Applies material to all wall faces in a space
 */
class ApplyToAllWallFacePaperRequest extends CompositeRequest {
  public entity: EntityWithSpaceInfos;
  public faces: Face[][];
  private interiorWalls: unknown;

  constructor(entity: EntityWithSpaceInfos, customFaces?: Face[] | Face[][]) {
    super();
    this.entity = entity;

    const spaceInfos = entity.spaceInfos || [];
    const allStructureFaces: Face[] = [];

    spaceInfos.forEach((spaceInfo: SpaceInfo) => {
      allStructureFaces.push(...spaceInfo.structureFaces);
    });

    const uniqueFaces = Array.from(new Set(allStructureFaces)).filter(
      (face: Face) => face.id !== entity.id
    );

    this.faces = HSApp.PaintPluginHelper.Pave.FaceGroupHelper.groupSameLineFaces(uniqueFaces);

    if (Array.isArray(customFaces)) {
      this.faces = [];
      customFaces.forEach((faceOrGroup: Face | Face[]) => {
        if (Array.isArray(faceOrGroup)) {
          this.faces.push(faceOrGroup);
        } else {
          this.faces.push([faceOrGroup]);
        }
      });
      this.interiorWalls = null;
    }
  }

  public onCommit(): void {
    const applyMaterialToFaceGroup = (faces: Face[], material: Material): void => {
      if (!faces || faces.length === 0) {
        return;
      }

      const existingMaterial = HSCore.Material.Util.getEntityMaterial(faces[0]);

      if (faces.length === 1 && existingMaterial.isSame(material)) {
        return;
      }

      const faceGroupId = faces.map((face, index) => 
        index === 0 ? face.id : `;${face.id}`
      ).join('');

      const shouldSkipMixpaint = 
        faces.length > 1 &&
        material.mixpaint?.faceGroupId === faceGroupId;

      if (shouldSkipMixpaint) {
        return;
      }

      const request = faces.length === 1
        ? this.mgr.createRequest(HSFPConstants.RequestType.EditWallFacePaper, [
            faces[0],
            material.cloneDeep(),
            undefined,
            this.entity
          ])
        : this.mgr.createRequest(HSFPConstants.RequestType.EditWallFacePaper, [
            undefined,
            material.cloneDeep(),
            faces,
            this.entity
          ]);

      this.append(request);
    };

    const app = HSApp.App.getApp();

    this.faces?.forEach((faceGroup: Face[]) => {
      applyMaterialToFaceGroup(faceGroup, this.entity.material);
    });

    const roomInfo = app.geometryManager.getFaceRoomInfo(this.entity);

    if (!roomInfo?.floor) {
      if (this._subRequests.length > 0) {
        super.onCommit();
      }
      return;
    }

    const floorContents = roomInfo.floor.contents;

    if (Object.keys(floorContents).length === 0) {
      if (this._subRequests.length > 0) {
        super.onCommit();
      }
      return;
    }

    const materialDump = this.entity.material.dump()[0] as MaterialData;
    materialDump.flipX = false;
    materialDump.flipY = true;

    for (const contentKey in floorContents) {
      const contentEntity = floorContents[contentKey] as ObstacleEntity;

      const isObstacleType =
        contentEntity.instanceOf(HSConstants.ModelClass.NgObstacle) ||
        contentEntity.instanceOf(HSConstants.ModelClass.NgColumn) ||
        contentEntity.instanceOf(HSConstants.ModelClass.NgFlue) ||
        contentEntity.instanceOf(HSConstants.ModelClass.NgBeam);

      if (!isObstacleType) {
        continue;
      }

      const newMaterialMap = new Map<string, MaterialData>();
      const oldMaterialMap = new Map<string, MaterialData>();

      contentEntity.traverseBodyGraphicsData((graphicsData: GraphicsData, key: string) => {
        if (graphicsData?.customData?.fpMaterialData) {
          oldMaterialMap.set(key, structuredClone(graphicsData.customData.fpMaterialData));
        }
        newMaterialMap.set(key, materialDump);
      });

      const oldMaterialJson = JSON.stringify(oldMaterialMap);
      const newMaterialJson = JSON.stringify(newMaterialMap);

      if (oldMaterialJson !== newMaterialJson) {
        const request = this.mgr.createRequest(
          HSFPConstants.RequestType.ApplyMaterialToObstacleRequest,
          [contentEntity, oldMaterialMap, newMaterialMap]
        );
        this.append(request);
      }
    }

    if (this._subRequests.length > 0) {
      super.onCommit();
    }
  }
}

export { ApplyToAllWallFacePaperRequest };