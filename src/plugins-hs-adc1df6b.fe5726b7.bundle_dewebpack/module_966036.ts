export default class PropertyBarUtil {
  static getThicknessOptions(scale: number): Array<{ id: string; title: string }> {
    const thicknessValues = [80, 120, 150, 200, 400];
    
    return thicknessValues.map((thickness) => {
      const calculatedValue = (thickness * scale * 0.001).toFixed(2);
      return {
        id: calculatedValue,
        title: calculatedValue
      };
    });
  }

  static getRoof(): any {
    const app = HSApp.App.getApp();
    
    if (app.activeEnvironmentId === HSFPConstants.Environment.AddRoofEnv) {
      return app.activeEnvironment.status.getRoof();
    }
    
    return app.selectionManager.selected(true).find((entity: any) => {
      return entity instanceof HSCore.Model.NCustomizedParametricRoof;
    });
  }

  static getShowNameByNode(node: { name: string; friendlyName: string }): string {
    switch (node.name) {
      case "thickness":
        return ResourceManager.getString("plugin_right_propertybar_thickness");
      case "offset":
        return ResourceManager.getString("plugin_right_propertybar_offset");
      case "height":
        return ResourceManager.getString("plugin_right_propertybar_height");
      default:
        return node.friendlyName;
    }
  }

  static getEntityFaceMaterial(entity: any, faceIndex: number): any {
    const existingMaterial = HSCore.Material.Util.getEntityMaterial(entity, faceIndex);
    
    if (existingMaterial) {
      return existingMaterial;
    }
    
    const faceMaterialData = entity.getFaceMaterialData(faceIndex);
    return HSCore.Material.Material.create(faceMaterialData);
  }

  static getCatalogQuery(material: any): { seekId: string; categoryId: string } {
    let seekId = "";
    let categoryId = "";

    if (material) {
      categoryId = material.categoryId;
      seekId = material.seekId;
    }

    if (HSCore.Util.PaintMaterial.isMixPaintMaterial(material)) {
      const paintData = HSCore.Util.PaintMaterial.getPaintDataFromMixPaintEntity(material);
      
      if (paintData?.data?.backgroundMaterial?.parent) {
        categoryId = paintData.data.backgroundMaterial.categoryId;
        seekId = paintData.data.backgroundMaterial.seekId;
      }
    }

    if (HSApp.Util.Material.isParamPaint(material)) {
      const paintData = HSCore.Util.PaintMaterial.getPaintDataFromMixPaintEntity(material);
      const patternKey = paintData?.data?.paints?.[0]?.pattern;
      const pattern = material.patterns?.[patternKey];
      const metadata = pattern?.metadata;

      if (metadata) {
        categoryId = metadata.categories[0];
        seekId = metadata.seekId;
      }
    }

    return {
      seekId,
      categoryId
    };
  }
}