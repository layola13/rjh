export class ParametricModelFgiParseUtil {
  static getFgiParserMeshKey(
    baseKey: string,
    entityId: string,
    meshName: string
  ): string {
    let resultKey = baseKey;
    
    const entity = HSCore.Doc.getDocManager().activeDocument.getEntityById(entityId);
    
    if (entity) {
      const topLevelModel = new HSCore.Model.ParametricModelDecorator(entity).getTopLevelModel();
      
      if (
        topLevelModel &&
        (topLevelModel instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
         topLevelModel instanceof HSCore.Model.NCPBackgroundWallUnit ||
         topLevelModel instanceof HSCore.Model.ParametricCurtain ||
         topLevelModel instanceof HSCore.Model.ParametricBathroomCabinet)
      ) {
        const variableName = HSCore.Util.NCustomizedFeatureModel.getVariableNameByMeshName(
          topLevelModel,
          meshName
        );
        
        if (variableName) {
          resultKey = `${resultKey}-${variableName}`;
        }
      }
    }
    
    return resultKey;
  }
}