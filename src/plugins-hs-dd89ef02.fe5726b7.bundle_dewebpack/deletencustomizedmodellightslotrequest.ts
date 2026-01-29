import { HSCore } from './HSCore';

/**
 * Request to delete N customized model light slots
 */
export class DeleteNCustomizedModelLightSlotRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _lightSlot: HSCore.Model.NCustomizedModelLightSlot[];

  constructor(lightSlot: HSCore.Model.NCustomizedModelLightSlot[]) {
    super();
    this._lightSlot = lightSlot;
  }

  onCommit(): void {
    if (this._lightSlot.length === 0) {
      return;
    }

    const uniqueParent = this._lightSlot[0].getUniqueParent();

    for (const slot of this._lightSlot) {
      slot.facematerialmap.forEach((faceMap) => {
        if (
          faceMap &&
          faceMap.material?.mixpaint?.faceGroup.faceGroupId
        ) {
          const faceIds = faceMap.material.mixpaint.faceGroup.getFaceIds();
          const parent = slot.getUniqueParent();
          
          if (!parent) {
            return;
          }

          faceIds
            .filter((faceId) => !faceId.includes('NCustomizedModelLightSlot-'))
            .forEach((faceId) => {
              const faceTag = parent.getFaceTagByMeshKey(faceId);
              const faceMaterial = parent.facematerialmap.get(faceTag);
              
              if (faceMaterial) {
                const clonedMaterial = faceMaterial.material.clone();
                clonedMaterial.mixpaint.faceEntity = parent;
                clonedMaterial.mixpaint.faceId = parent.getMeshKeyByFaceTag(faceTag);
                parent.setFaceMaterialPolygon(
                  clonedMaterial,
                  faceTag,
                  faceMaterial.material.seekId
                );
                faceMaterial.material.mixpaint = clonedMaterial.mixpaint;

                const displayItem = HSApp.App.getApp().getActive2DView().displayList[faceTag];
                if (displayItem) {
                  displayItem.materialDirty = true;
                  displayItem.dirtyGraph();
                }
              }
            });
        }
      });

      if (slot.lightSlotId.includes('parametricCeilingAddSlot')) {
        uniqueParent?.removeParametricSelfLightSlot(slot.lightSlotId);
      } else {
        HSCore.Util.Content.removeNCustomizedModelLightSlot(slot);
      }
    }

    if (
      uniqueParent &&
      (uniqueParent instanceof HSCore.Model.NCustomizedParametricCeiling ||
        uniqueParent instanceof HSCore.Model.NCustomizedParametricBackgroundWall)
    ) {
      uniqueParent.dirtyChildModels(true);
    }
  }

  onUndo(): void {
    super.onUndo();
  }

  onRedo(): void {
    super.onRedo();

    for (const slot of this._lightSlot) {
      slot?.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
      slot.getSelfHostLightBand()[0].setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    }
  }

  canTransactField(): boolean {
    return true;
  }
}