import { HSCore } from './HSCore';

interface ApplyCustomizedModelMaterialOptions {
  refreshAll?: boolean;
}

type MaterialOrClearData = HSCore.Material.Material | unknown;

interface MaterialDump {
  faceId: number;
  material: HSCore.Material.Material | null;
}

export class ApplyCustomizedModelMaterialRequest extends HSCore.Transaction.Request {
  private readonly _entity: HSCore.Entity;
  private readonly _materialMap: Map<number, MaterialOrClearData>;
  private readonly _options: ApplyCustomizedModelMaterialOptions;
  private _befores: MaterialDump[] = [];
  private _afters: MaterialDump[] = [];
  private readonly MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
  private readonly MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;

  constructor(
    entity: HSCore.Entity,
    materialMap: Map<number, MaterialOrClearData>,
    options: ApplyCustomizedModelMaterialOptions = {}
  ) {
    super();
    this._entity = entity;
    this._materialMap = materialMap;
    this._options = options;
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
    this.MixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
  }

  onCommit(): void {
    const faceIds = Array.from(this._materialMap.keys());
    this._befores = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._entity, faceIds);

    const faceGroupIds = this.MixPaintUtil.extractCustomizedModelFaceGroupIds(this._entity, faceIds);
    const clearDataMap = new Map<number, unknown>();
    const materialFaceIds: number[] = [];

    this._materialMap.forEach((materialOrData, faceId) => {
      if (materialOrData instanceof HSCore.Material.Material) {
        this._entity.setFaceMaterial(faceId, materialOrData);
        materialFaceIds.push(faceId);
        return;
      }

      const existingMaterial = this._entity.getFaceMaterial(faceId);
      if (existingMaterial?.mixpaint?.faceGroupId) {
        existingMaterial.mixpaint.clear(materialOrData);
        this._entity.dirtyFaceMaterial(existingMaterial.mixpaint.getFaceIds());
        return;
      }

      if (this._entity.hasFaceMaterial(faceId)) {
        this._entity.removeFaceMaterial(faceId);
      }
      clearDataMap.set(faceId, materialOrData);
    });

    if (materialFaceIds.length > 0) {
      HSCore.Util.Paints.updateMixPaintWithGroupBackground(
        this._entity,
        faceGroupIds,
        materialFaceIds
      );
    }

    if (clearDataMap.size > 0) {
      this._entity.setMaterialData(clearDataMap);
    }

    if (this._options.refreshAll) {
      this._entity.refreshFaceMaterial(faceIds);
    }

    this._afters = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._entity, faceIds);
  }

  onUndo(): void {
    this.MaterialBrushUtil.setDiyFaceMaterialDump(this._entity, this._befores);
  }

  onRedo(): void {
    this.MaterialBrushUtil.setDiyFaceMaterialDump(this._entity, this._afters);
  }
}