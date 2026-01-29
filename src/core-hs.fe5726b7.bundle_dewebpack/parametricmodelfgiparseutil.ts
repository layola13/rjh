export class ParametricModelFgiParseUtil {
  static getFgiParserMeshKey(
    baseKey: string,
    entityId: string,
    meshName: string
  ): string {
    let resultKey = baseKey;
    
    const docManager = HSCore.Doc.getDocManager();
    const activeDoc = docManager.activeDocument;
    const entity = activeDoc.getEntityById(entityId);
    
    if (entity) {
      const decorator = new HSCore.Model.ParametricModelDecorator(entity);
      const topLevelModel = decorator.getTopLevelModel();
      
      if (topLevelModel) {
        const isValidModelType = 
          topLevelModel instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
          topLevelModel instanceof HSCore.Model.NCPBackgroundWallUnit ||
          topLevelModel instanceof HSCore.Model.ParametricCurtain ||
          topLevelModel instanceof HSCore.Model.ParametricBathroomCabinet;
        
        if (isValidModelType) {
          const variableName = HSCore.Util.NCustomizedFeatureModel.getVariableNameByMeshName(
            topLevelModel,
            meshName
          );
          
          if (variableName) {
            resultKey = `${resultKey}-${variableName}`;
          }
        }
      }
    }
    
    return resultKey;
  }
}