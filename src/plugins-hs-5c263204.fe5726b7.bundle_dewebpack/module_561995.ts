export default class MaterialReplacementHelper {
  static getCanReplaceSameMaterialModels(
    targetModel: HSCore.Model.NCustomizedModelMolding | HSCore.Model.BaseModel,
    materialKey: string
  ): HSCore.Model.BaseModel[] {
    const replaceableModels: HSCore.Model.BaseModel[] = [];
    const featureModels = HSApp.App.getApp().activeEnvironment.getAllFeatureModels();

    if (targetModel instanceof HSCore.Model.NCustomizedModelMolding) {
      featureModels.forEach((featureModel) => {
        const moldingChildren = Object.values(featureModel.children).filter(
          (child): child is HSCore.Model.NCustomizedModelMolding =>
            child instanceof HSCore.Model.NCustomizedModelMolding
        );
        replaceableModels.push(
          ...MaterialReplacementHelper.getSameMaterialMoldings(
            moldingChildren,
            targetModel,
            materialKey
          )
        );
      });
    } else {
      replaceableModels.push(...featureModels);

      const lightSlotModels: HSCore.Model.NCustomizedModelLightSlot[] = [];
      featureModels.forEach((featureModel) => {
        const lightSlotChildren = Object.values(featureModel.children).filter(
          (child): child is HSCore.Model.NCustomizedModelLightSlot =>
            child instanceof HSCore.Model.NCustomizedModelLightSlot
        );
        lightSlotModels.push(...lightSlotChildren);
      });
      replaceableModels.push(...lightSlotModels);
    }

    return replaceableModels;
  }

  static getSameMaterialFaceIds(
    sourceModel: HSCore.Model.BaseModel,
    targetModel: HSCore.Model.BaseModel,
    targetMaterialKey: string
  ): string[] {
    const matchingFaceIds: string[] = [];
    const mixPaintHelper = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper;
    const targetMaterialKeyValue = mixPaintHelper.getCModelMaterialKey(
      targetModel,
      targetMaterialKey
    );
    const isFaceSupported =
      targetModel.isFaceSupportPaintMaterialByMeshKey?.(targetMaterialKey) ?? false;

    if (!targetMaterialKeyValue || !isFaceSupported) {
      return matchingFaceIds;
    }

    sourceModel.faceIds.forEach((faceId) => {
      if (
        sourceModel.isFaceSupportPaintMaterialByMeshKey &&
        !sourceModel.isFaceSupportPaintMaterialByMeshKey(faceId)
      ) {
        return;
      }

      const sourceMaterialKey = mixPaintHelper.getCModelMaterialKey(sourceModel, faceId);
      if (sourceMaterialKey === targetMaterialKeyValue) {
        matchingFaceIds.push(faceId);
      }
    });

    return matchingFaceIds;
  }

  static getSameMaterialMoldings(
    moldingModels: HSCore.Model.NCustomizedModelMolding[],
    targetMolding: HSCore.Model.NCustomizedModelMolding,
    materialKey: string
  ): HSCore.Model.NCustomizedModelMolding[] {
    const targetMaterialData = targetMolding.materialData;

    return moldingModels.filter((molding) => {
      const moldingMaterialData = molding.materialData;
      return (
        targetMaterialData.seekId === moldingMaterialData.seekId &&
        targetMaterialData.blendColor === moldingMaterialData.blendColor
      );
    });
  }
}