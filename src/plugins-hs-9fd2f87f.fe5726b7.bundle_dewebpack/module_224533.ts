interface LightSlot {
  lightSlotId: string;
  getEntitiesAppendOnLightSlot(): CustomizedModelEntity[];
  getUniqueParent(): CustomizedModel;
}

interface CustomizedModel {
  webCADDocument: unknown;
  faceMaterials: Map<string, FaceMaterial>;
  refreshFaceMaterial(faceIds: string[]): void;
}

interface FaceMaterial {
  mixpaint?: {
    faceGroupId: string;
    getFaceIds(): string[];
  };
}

interface CustomizedModelEntity {
  instanceOf(modelClass: string): boolean;
}

interface LightSlotSpec {
  molding: CustomizedModelEntity;
  parent: CustomizedModel;
}

interface MaterialBrushUtil {
  getDiyFaceMaterialDump(model: CustomizedModel, faceIds: string[]): unknown;
  setDiyFaceMaterialDump(model: CustomizedModel, materialDump: unknown): void;
}

class RemoveLightSlotTransaction extends HSCore.Transaction.Request {
  private readonly _lightSlot: LightSlot;
  private readonly _appendedEntities: CustomizedModelEntity[];
  private readonly _parentCustomizedModel: CustomizedModel;
  private readonly _webcadDocBefore: string;
  private _webcadDocAfter: string;
  private readonly MaterialBrushUtil: MaterialBrushUtil;
  private _spec?: LightSlotSpec;
  private _materialBefore?: unknown;
  private _materialAfter?: unknown;

  constructor(lightSlot: LightSlot) {
    super();
    this._lightSlot = lightSlot;
    this._appendedEntities = this._lightSlot.getEntitiesAppendOnLightSlot();
    this._parentCustomizedModel = lightSlot.getUniqueParent();
    this._webcadDocBefore = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );
    this._webcadDocAfter = "";
    this.MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
  }

  onCommit(): void {
    let affectedFaceIds: string[] = [];

    this._parentCustomizedModel.faceMaterials.forEach(
      (faceMaterial: FaceMaterial, faceId: string) => {
        if (
          faceMaterial?.mixpaint?.faceGroupId &&
          faceId.indexOf(this._lightSlot.lightSlotId) >= 0
        ) {
          affectedFaceIds = affectedFaceIds.concat(
            faceMaterial.mixpaint.getFaceIds().filter((id: string) => id !== faceId)
          );
        }
      }
    );

    this._materialBefore = this.MaterialBrushUtil.getDiyFaceMaterialDump(
      this._parentCustomizedModel,
      affectedFaceIds
    );

    this._spec = HSCore.Util.Content.removeCustomizedModelLightSlot(this._lightSlot);

    this._webcadDocAfter = HSCore.Model.CustomizedModel.stringifyWebCADDocument(
      this._parentCustomizedModel.webCADDocument
    );

    this._parentCustomizedModel.refreshFaceMaterial(affectedFaceIds);

    this._materialAfter = this.MaterialBrushUtil.getDiyFaceMaterialDump(
      this._parentCustomizedModel,
      affectedFaceIds
    );
  }

  onUndo(): void {
    HSCore.Util.Content.addCustomizedModelLightSlot(this._spec);

    this._appendedEntities.forEach((entity: CustomizedModelEntity) => {
      if (entity.instanceOf(HSConstants.ModelClass.CustomizedModelMolding)) {
        HSCore.Util.Content.addCustomizedModelMolding({
          molding: entity,
          parent: this._parentCustomizedModel
        });
      }
    });

    this._parentCustomizedModel.webCADDocument =
      HSCore.Model.CustomizedModel.parseWebCADDocument(this._webcadDocBefore);

    this.MaterialBrushUtil.setDiyFaceMaterialDump(
      this._parentCustomizedModel,
      this._materialBefore
    );
  }

  onRedo(): void {
    HSCore.Util.Content.removeCustomizedModelLightSlot(this._lightSlot);

    this._parentCustomizedModel.webCADDocument =
      HSCore.Model.CustomizedModel.parseWebCADDocument(this._webcadDocAfter);

    this.MaterialBrushUtil.setDiyFaceMaterialDump(
      this._parentCustomizedModel,
      this._materialAfter
    );
  }
}

export default RemoveLightSlotTransaction;