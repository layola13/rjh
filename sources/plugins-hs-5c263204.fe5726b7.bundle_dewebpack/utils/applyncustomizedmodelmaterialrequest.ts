// @ts-nocheck
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface DirtyEntity {
  entity: HSCore.Entity;
  faceIds: string[];
}

interface ApplyOptions {
  refreshAll?: boolean;
}

export class ApplyNCustomizedModelMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  private MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;
  private dirtyMaterialFaceTag: string[];
  private dirtyEntities: DirtyEntity[];
  private _entity: HSCore.Entity;
  private _materialMap: Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>;
  private _options: ApplyOptions;

  constructor(
    entity: HSCore.Entity,
    materialMap: Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>,
    options: ApplyOptions = {}
  ) {
    super();
    this.MixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
    this.dirtyMaterialFaceTag = [];
    this.dirtyEntities = [];
    this._entity = entity;
    this._materialMap = materialMap;
    this._options = options;
  }

  private _meetConditionForApplyOneFace(): boolean {
    if (Array.from(this._materialMap.values()).every((material) => material instanceof HSCore.Model.MixPaint)) {
      if (this._materialMap.size === 1) {
        return true;
      }

      const faceIds = Array.from(this._materialMap.keys());
      if (faceIds.length > 0 && HSCore.Util.NCustomizedFaceGroup.isFaceGroup(this._entity, faceIds[0])) {
        const faceMaterial = this._entity.getFaceMaterial(faceIds[0]);
        if (faceMaterial?.mixpaint) {
          const faceGroupIds = faceMaterial.mixpaint.faceGroup.getFaceIds();
          return faceIds.every((faceId) => faceGroupIds.includes(faceId));
        }
      }
    }
    return false;
  }

  private _applyToOneFaceId(): void {
    const faceId = Array.from(this._materialMap.keys())[0];
    const material = this._materialMap.get(faceId);

    if (material instanceof HSCore.Model.MixPaint) {
      const faceMaterial = this._entity.getFaceMaterial(faceId) || this._entity.createFaceMaterial(faceId);

      if (HSCore.Util.NCustomizedFaceGroup.isFaceGroup(this._entity, faceId)) {
        HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.updateNCusomizedFaceGroupMixPaint(
          this._entity,
          faceId,
          material
        );
      } else {
        faceMaterial.mixpaint = material;
        this._entity.setFaceMaterial(faceId, faceMaterial);
        this._entity.dirtyFaceMaterial([faceId]);
      }
    }
  }

  onCommit(): void {
    if (this._meetConditionForApplyOneFace()) {
      this._applyToOneFaceId();
      super.onCommit([]);
      return;
    }

    const allFaceIds = Array.from(this._materialMap.keys());
    const faceGroupIds = this.MixPaintUtil.extractCustomizedModelFaceGroupIds(this._entity, allFaceIds) || [];
    const nonMixPaintMaterials = new Map<string, HSCore.Material.MaterialData>();
    const mixPaintFaceIds: string[] = [];
    let currentFaceMaterial: HSCore.Material.FaceMaterial | undefined;

    this._materialMap.forEach((material, faceId) => {
      if (material instanceof HSCore.Model.MixPaint) {
        currentFaceMaterial = this._entity.getFaceMaterial(faceId) || this._entity.createFaceMaterial(faceId);
        currentFaceMaterial.mixpaint = material;
        this._entity.setFaceMaterial(faceId, currentFaceMaterial);
        mixPaintFaceIds.push(faceId);
      } else {
        const faceMaterial = this._entity.getFaceMaterial(faceId);
        if (faceMaterial?.mixpaint?.faceGroupId) {
          faceMaterial.mixpaint.clear(material);
          this._entity.dirtyFaceMaterial(faceMaterial.mixpaint.getFaceIds());
        } else {
          if (this._entity.hasFaceMaterial(faceId)) {
            this._entity.removeFaceMaterial(faceId);
          }
          nonMixPaintMaterials.set(faceId, material);
        }
      }
    });

    this.dirtyEntities.push({
      entity: this._entity,
      faceIds: allFaceIds
    });

    if (mixPaintFaceIds.length > 0) {
      faceGroupIds.forEach((groupId) => {
        const groupFaceIds = groupId.split(';') || [];
        const autoGroupData = HSCore.Util.CustomizedFeatureModel.getNCustomizedModelAutoGroupData(
          this._entity,
          groupFaceIds
        );
        const affectedEntities: HSCore.Entity[] = [];

        autoGroupData[1].forEach((faceData) => {
          if (!allFaceIds.includes(faceData.faceMeshKey)) {
            const mixPaint = currentFaceMaterial!.mixpaint;
            const clonedMaterial = currentFaceMaterial!.clone();
            clonedMaterial.mixpaint = mixPaint;
            faceData.entity.setFaceMaterial(faceData.faceMeshKey, clonedMaterial);

            this.dirtyEntities.push({
              entity: faceData.entity,
              faceIds: [faceData.faceMeshKey]
            });
          }
          affectedEntities.push(faceData.entity);
        });

        HSCore.Util.Paints.updateNCusomizedModelMixPaintWithGroupBackground(
          affectedEntities,
          autoGroupData[0],
          currentFaceMaterial!
        );
      });
    }

    nonMixPaintMaterials.forEach((material, faceId) => {
      const faceTag = this._entity.getFaceTagByMeshKey(faceId);
      this._entity.setMaterialData(faceTag, material);
    });

    this.dirtyMaterialFaceTag = Array.from(nonMixPaintMaterials.keys());

    if (this._options.refreshAll) {
      Array.from(this._materialMap.keys()).forEach((faceId) => {
        HSCore.Util.Paints.updateEntityFacePaint(this._entity, faceId);
      });
    }

    this.dirtyMaterial();
    super.onCommit([]);
  }

  onUndo(): void {
    super.onUndo([]);
    this.dirtyMaterial();
  }

  onRedo(): void {
    super.onRedo([]);
    this.dirtyMaterial();
  }

  private dirtyMaterial(): void {
    if (this.dirtyMaterialFaceTag.length > 0) {
      this._entity.dirtyGeometry();
    } else {
      this.dirtyEntities.forEach((dirtyEntity) => {
        dirtyEntity.entity.dirtyFaceMaterial(dirtyEntity.faceIds, false);
      });
    }
  }

  canTransactField(): boolean {
    return true;
  }

  static stringifyRequestArgs(args: unknown[]): string[] {
    const transcript = HSApp.Transcription.Transcript.instance();
    const stringifiedArgs: string[] = [];

    for (const arg of args) {
      try {
        const stringified = transcript.stringify(arg);
        stringifiedArgs.push(stringified);
      } catch (error) {
        console.error(error);
      }
    }

    const seekIds = new Set<string>();
    const materialMap = args[1] as Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>;

    for (const material of materialMap.values()) {
      if (material instanceof HSCore.Material.MaterialData) {
        seekIds.add(material.seekId);
      } else if (material instanceof HSCore.Model.MixPaint) {
        for (const ref of material.mixPave.refs()) {
          seekIds.add(ref);
        }
      }
    }

    const seekIdsJson = JSON.stringify({
      seekIds: Array.from(seekIds).filter((id) => id)
    });

    stringifiedArgs.push(seekIdsJson);
    return stringifiedArgs;
  }

  static async parseRequestArgsAsync(args: string[]): Promise<void> {
    const lastArg = args[args.length - 1];
    const { seekIds } = JSON.parse(lastArg) as { seekIds: string[] };
    await HSApp.App.getApp().catalogManager.getProductsBySeekIds(seekIds);
  }
}