import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { DIYUtils } from './DIYUtils';

interface ModelData {
  model3d: string;
  modelInfo: {
    contentType: string;
    pos: unknown;
    XLength: number;
    YLength: number;
    ZLength: number;
    scale: number;
    rotation: { x: number; y: number; z: number };
  };
}

interface EntityData {
  data?: ModelData;
}

interface TargetPosition {
  x?: number;
  y?: number;
  z?: number;
}

interface Rotation {
  x?: number;
  y?: number;
  z?: number;
}

interface DuplicateTarget {
  targetPosition?: TargetPosition;
  rotation?: Rotation;
}

interface UndoData {
  prepareRedo: () => void;
  undo: () => void;
  redo: () => void;
}

interface Entity {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getUniqueParent: () => unknown;
}

interface Model3DData {
  paveRefDatas?: Array<[string, string]>;
}

/**
 * Proxy object for customized PM (Product Model) instances in DIY 2.0
 * Handles loading, duplication, and manipulation of custom 3D models
 */
export class CustomizedPMInstanceProxyObject extends HSCore.Model.EntityProxyObject {
  public getName(): string {
    return ResourceManager.getString("catalog_customized_model");
  }

  public removeFromFloorplan(entity: Entity): void {
    HSApp.Util.CustomizedPMModel.removeCustomizedPMInstance([entity]);
  }

  public dumpForDuplicate(entity: Entity): unknown {
    return HSApp.Util.CustomizedPMModel.dumpPMInstanceData(
      entity.getUniqueParent(),
      entity
    );
  }

  public async prepareLoadResource(entityData: EntityData): Promise<void> {
    if (!entityData.data) {
      return;
    }

    const data = entityData.data;
    const loadPromises: Array<Promise<unknown>> = [];
    const parsedModel: Model3DData = JSON.parse(data.model3d);

    if (parsedModel.paveRefDatas) {
      for (const [seekId, refData] of parsedModel.paveRefDatas) {
        if (refData !== "") {
          HSCatalog.Manager.instance().getProductBySeekIdSync(seekId, {
            data: refData
          });
        } else {
          loadPromises.push(
            HSCatalog.Manager.instance().getProductBySeekId(seekId)
          );
        }
      }
    }

    await Promise.all(loadPromises);
    await DiySdk.DmDiyApi.loadResource(data.model3d);
  }

  public loadFromDuplicateData(entityData: EntityData): unknown {
    if (!entityData.data) {
      return;
    }

    const data = entityData.data;
    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const customizedPms = activeDocument.scene.getCustomizedPms();
    let customizedPMModel = customizedPms.length ? customizedPms[0] : undefined;

    if (!customizedPMModel) {
      customizedPMModel = HSApp.Util.CustomizedPMModel.createCustomizedPMModel({
        creator: adskUser.uid,
        unit: "mm",
        webCADDocument: DiySdk.DmDiyApi.createDocument()
      });

      customizedPMModel.setFlagOn(HSCore.Model.EntityFlagEnum.freezed);
      activeDocument.scene.addChild(customizedPMModel);
      DiySdk.DmDiyApi.openDocumentSync(customizedPMModel.webCADDocument, 0.001, true);
    }

    return DIYUtils.importCustomizedPMInstanceSync(
      customizedPMModel,
      data.model3d,
      data.modelInfo.contentType,
      data.modelInfo.pos,
      data.modelInfo.XLength,
      data.modelInfo.YLength,
      data.modelInfo.ZLength,
      data.modelInfo.scale,
      data.modelInfo.rotation
    );
  }

  public trySetEntityToTarget(entity: Entity, target: DuplicateTarget): void {
    if (target.targetPosition?.x !== undefined) {
      entity.x = target.targetPosition.x;
    }
    if (target.targetPosition?.y !== undefined) {
      entity.y = target.targetPosition.y;
    }
    if (target.targetPosition?.z !== undefined) {
      entity.z = target.targetPosition.z;
    }

    if (!Number.isNaN(target.rotation?.x)) {
      entity.XRotation = target.rotation!.x;
    }
    if (!Number.isNaN(target.rotation?.y)) {
      entity.YRotation = target.rotation!.y;
    }
    if (!Number.isNaN(target.rotation?.z)) {
      entity.ZRotation = target.rotation!.z;
    }
  }

  public duplicateToTarget(entity: Entity, target: DuplicateTarget): void {
    // Implementation intentionally empty
  }

  public prepareUndoData(entity: Entity): UndoData {
    return {
      prepareRedo: () => {},
      undo: () => {},
      redo: () => {}
    };
  }

  public getAnimateConfig(entity: Entity): unknown[] {
    return [];
  }
}

// Register the proxy object with the entity proxy factory
HSCore.Model.EntityProxyFactory.registeProxyObject(
  HSCore.Model.EntityProxyTypeEnum.CustomizedPMInstance,
  new CustomizedPMInstanceProxyObject(),
  "Proxy for diy2.0 model"
);