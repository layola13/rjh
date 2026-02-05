// @ts-nocheck
import { HSCore } from './HSCore';

export class ClearCustomizedModelMaterialRequest extends HSCore.Transaction.Request {
  private readonly _entity: any;
  private readonly _faceId: number;
  private _befores: any[];
  private _afters: any[];
  private readonly MixPaintUtil: any;
  private readonly MaterialBrushUtil: any;

  constructor(entity: any, faceId: number) {
    super();
    this._entity = entity;
    this._faceId = faceId;
    this._befores = [];
    this._afters = [];
    this.MixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
  }

  onCommit(): void {
    this._befores = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._entity, [this._faceId]);

    if (this.MixPaintUtil.extractCustomizedModelFaceGroupIds(this._entity, [this._faceId]).length > 0) {
      const mixpaint = this._entity.getFaceMaterial(this._faceId).mixpaint;
      mixpaint.clear(this._entity.getDefaultMaterialData());
      this._entity.dirtyFaceMaterial(mixpaint.getFaceIds());
    } else {
      this._entity.removeFaceMaterial(this._faceId);
      const materialMap = new Map();
      materialMap.set(this._faceId, this._entity.getDefaultMaterialData());
      this._entity.setMaterialData(materialMap);
    }

    this._afters = this.MaterialBrushUtil.getDiyFaceMaterialDump(this._entity, [this._faceId]);
  }

  onUndo(): void {
    this.MaterialBrushUtil.setDiyFaceMaterialDump(this._entity, this._befores);
  }

  onRedo(): void {
    this.MaterialBrushUtil.setDiyFaceMaterialDump(this._entity, this._afters);
  }
}