import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import BaseStrategy from './BaseStrategy';

interface MaterialData {
  color?: string;
  textureURI?: string;
  seekId?: string;
  tileSize_x: number;
  tileSize_y: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
}

interface SuckInfo {
  materialData: MaterialData;
}

interface EntityContext {
  entity: HSCore.Model.Content | null;
  meshName: string;
}

interface UndoRedoData {
  target: HSCore.Model.Content;
  meshName: string;
  material: MaterialData;
}

interface BoundingInfo {
  obj_name: string;
  uSize?: number;
  vSize?: number;
}

interface ObjInfo {
  bounding?: BoundingInfo[];
}

interface EntityMetadata {
  extension?: {
    objInfo?: ObjInfo;
  };
}

export default class ContentStrategy extends BaseStrategy {
  private _dependencies: unknown;
  public type: string;

  constructor(dependencies: unknown) {
    super();
    this._dependencies = dependencies;
    this.type = 'ContentStrategy';
  }

  /**
   * Determines if an entity can be used as a material source
   */
  public isSuckable(context: EntityContext): boolean {
    const { entity, meshName } = context;

    if (!entity || this.isDisabledEnv()) {
      return false;
    }

    if (entity.instanceOf && entity.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
      return false;
    }

    return !!(
      entity instanceof HSCore.Model.Content &&
      meshName &&
      (entity.getMaterial(meshName) || entity.getMaterialByMeshName(meshName))
    );
  }

  /**
   * Extracts material data from an entity
   */
  public suck(context: EntityContext): SuckInfo | undefined {
    const { entity, meshName } = context;

    if (!(entity instanceof HSCore.Model.Content) || !meshName) {
      return undefined;
    }

    let material = entity.getMaterial(meshName);
    if (!material) {
      material = entity.getMaterialByMeshName(meshName);
      material?.color;
      material?.textureURI;
    }

    const materialData = this._getMaterialData(material);
    this.setInitTileSizeByMeshUVSize(undefined, materialData, meshName);

    return { materialData };
  }

  /**
   * Checks if material can be applied to an entity
   */
  public isAppliable(context: EntityContext, suckInfo: SuckInfo | null): boolean {
    const { entity, meshName } = context;

    if (!entity || this.isDisabledEnv()) {
      return false;
    }

    if (entity.instanceOf && entity.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
      return false;
    }

    if (!(entity instanceof HSCore.Model.Content && suckInfo)) {
      return false;
    }

    if (entity instanceof HSCore.Model.Content && HSApp.Util.Entity.getEntityCustomizeSize(entity.metadata)) {
      const partMaterials = HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedProductPlugin)
        .getContentPartMaterial(entity, meshName);
      const seekId = suckInfo?.materialData?.seekId;

      return !!(partMaterials?.find((material) => material.materialId === seekId));
    }

    if (
      entity instanceof HSCore.Model.Content &&
      suckInfo.materialData?.seekId?.includes(HSCore.Material.MaterialIdEnum.modelMaterial)
    ) {
      const seekId = suckInfo.materialData.seekId;
      const entitySeekId = seekId.substring(0, 36);
      const meshNameFromSeekId = seekId.substring(
        37,
        seekId.length - HSCore.Material.MaterialIdEnum.modelMaterial.length - 1
      );

      if (entitySeekId === entity?.seekId && meshNameFromSeekId === context.meshName) {
        return false;
      }
    }

    return !(entity instanceof HSCore.Model.NCustomizedFeatureModel);
  }

  /**
   * Checks if current environment disables material operations
   */
  private isDisabledEnv(): boolean {
    const disabledEnvironments = [
      HSFPConstants.Environment.MixPaint,
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedPlatform,
    ];

    return disabledEnvironments.includes(HSApp.App.getApp().activeEnvironmentId);
  }

  /**
   * Applies material to an entity
   */
  public apply(context: EntityContext, suckInfo: SuckInfo | null): void {
    const { entity, meshName } = context;

    if (!(entity instanceof HSCore.Model.Content) || !suckInfo?.materialData) {
      return;
    }

    const materialData = this._getMaterialDataFromSuckInfo(suckInfo);
    this.setInitTileSizeByMeshUVSize(entity, materialData, meshName);
    entity.setMaterial(meshName, materialData);
    entity.dirtyMaterial();
  }

  /**
   * Sets initial tile size based on mesh UV size
   */
  private setInitTileSizeByMeshUVSize(
    entity: HSCore.Model.Content | undefined,
    materialData: MaterialData,
    meshName: string
  ): void {
    const metadata = entity?.metadata as EntityMetadata | undefined;

    if (HSApp.Util.Entity.getEntityCustomizeSize(metadata)) {
      const boundingArray = metadata?.extension?.objInfo?.bounding ?? [];
      const boundingInfo = boundingArray.find((info) => info.obj_name === meshName) ?? {};

      const uSize = boundingInfo.uSize ?? materialData.tileSize_x;
      const vSize = boundingInfo.vSize ?? materialData.tileSize_x;

      materialData.initTileSize_x = uSize;
      materialData.initTileSize_y = vSize;
    } else {
      materialData.initTileSize_x = undefined;
      materialData.initTileSize_y = undefined;
    }
  }

  /**
   * Gets data for undo operation
   */
  public getUndoData(context: EntityContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  /**
   * Gets data for redo operation
   */
  public getRedoData(context: EntityContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  /**
   * Performs undo operation
   */
  public undo(context: EntityContext, data: UndoRedoData): void {
    const { target, meshName, material } = data;

    if (target instanceof HSCore.Model.Content) {
      target.setMaterial(meshName, material);
    }
  }

  /**
   * Performs redo operation
   */
  public redo(context: EntityContext, data: UndoRedoData): void {
    const { target, meshName, material } = data;

    if (target instanceof HSCore.Model.Content) {
      target.setMaterial(meshName, material);
    }
  }

  /**
   * Common method to extract undo/redo data
   */
  private _getUndoRedoData(context: EntityContext): UndoRedoData {
    const { entity, meshName } = context;
    const material = entity.getMaterial(meshName);

    return {
      target: entity as HSCore.Model.Content,
      meshName,
      material,
    };
  }
}