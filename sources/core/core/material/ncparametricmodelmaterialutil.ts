interface MaterialInfo {
  seekId: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  maxSliderX: number;
  maxSliderY: number;
  scaleX: number;
  scaleY: number;
}

interface MaterialLike {
  seekId: string;
  tileSize_x?: number;
  tileSize_y?: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
}

interface MixPaintPattern {
  patternUnits: Array<{
    materials: Array<{
      scaleX: number;
      scaleY: number;
      realSize_x: number;
      realSize_y: number;
    }>;
  }>;
  pavingOption: {
    rotation: number;
    sliderOffsetX: number;
    sliderOffsetY: number;
  };
}

interface MixPaint {
  mixPave: {
    getUniqueRegion(): {
      pattern: MixPaintPattern;
    } | null;
  };
}

interface HSCoreMaterial extends MaterialLike {
  mixpaint?: MixPaint;
}

interface MaterialDecorator {
  getMaterials(): {
    materials: Array<{ seekId: string }>;
  };
}

interface HSCoreMaterialConstructor {
  new (material: HSCoreMaterial): MaterialDecorator;
}

interface NCustomizedParametricModel {
  isOldVersionMaterialData(faceTag: string): boolean;
  srcModel?: NCustomizedParametricModel | null;
}

interface NCPBackgroundWallArray extends NCustomizedParametricModel {
  srcModel?: NCustomizedParametricModel | null;
}

declare namespace HSCore {
  namespace Material {
    class Material implements HSCoreMaterial {
      seekId: string;
      mixpaint?: MixPaint;
      tileSize_x?: number;
      tileSize_y?: number;
      initTileSize_x?: number;
      initTileSize_y?: number;
      rotation?: number;
      offsetX?: number;
      offsetY?: number;
    }
    const MaterialDecorator: HSCoreMaterialConstructor;
  }
  namespace Model {
    class NCustomizedParametricModel implements NCustomizedParametricModel {
      isOldVersionMaterialData(faceTag: string): boolean;
      srcModel?: NCustomizedParametricModel | null;
    }
    class NCPBackgroundWallArray extends NCustomizedParametricModel implements NCPBackgroundWallArray {
      srcModel?: NCustomizedParametricModel | null;
    }
  }
}

export class NCParametricModelMaterialUtil {
  /**
   * Extract material information including scale, rotation, and offset
   */
  static getMaterialInfo(material: HSCore.Material.Material | MaterialLike): MaterialInfo {
    let scaleX = 1;
    let scaleY = 1;
    let rotation = 0;
    let offsetX = 0;
    let offsetY = 0;
    let maxSliderX = 0;
    let maxSliderY = 0;

    const seekId =
      material instanceof HSCore.Material.Material
        ? new HSCore.Material.MaterialDecorator(material).getMaterials().materials[0].seekId
        : material.seekId;

    if (material instanceof HSCore.Material.Material) {
      if (material.mixpaint) {
        const uniqueRegion = material.mixpaint.mixPave.getUniqueRegion();
        if (uniqueRegion) {
          const pattern = uniqueRegion.pattern;
          const firstMaterial = pattern.patternUnits[0].materials[0];
          scaleX = pattern.patternUnits[0].materials[0].scaleX;
          scaleY = pattern.patternUnits[0].materials[0].scaleY;
          rotation = pattern.pavingOption.rotation;
          offsetX = pattern.pavingOption.sliderOffsetX;
          offsetY = pattern.pavingOption.sliderOffsetY;
          maxSliderX = firstMaterial.realSize_x / 2;
          maxSliderY = firstMaterial.realSize_y / 2;
        }
      }
    } else {
      scaleX = material.tileSize_x && material.initTileSize_x ? material.tileSize_x / material.initTileSize_x : 1;
      scaleY = material.tileSize_y && material.initTileSize_y ? material.tileSize_y / material.initTileSize_y : 1;
      rotation = material.rotation ?? 0;
      offsetX = material.offsetX ?? 0;
      offsetY = material.offsetY ?? 0;
      maxSliderX = material.tileSize_x ? material.tileSize_x / 2 : 0;
      maxSliderY = material.tileSize_y ? material.tileSize_y / 2 : 0;
    }

    return {
      seekId,
      rotation,
      offsetX,
      offsetY,
      maxSliderX,
      maxSliderY,
      scaleX,
      scaleY,
    };
  }

  /**
   * Check if the model uses old version material data format
   */
  static isOldVersionByFaceTag(
    model: HSCore.Model.NCPBackgroundWallArray | HSCore.Model.NCustomizedParametricModel,
    faceTag: string
  ): boolean {
    const targetModel =
      model instanceof HSCore.Model.NCPBackgroundWallArray
        ? this.findRootParametricModel(model)
        : model;

    return targetModel.isOldVersionMaterialData(faceTag);
  }

  private static findRootParametricModel(
    model: NCPBackgroundWallArray
  ): NCustomizedParametricModel {
    let current: NCustomizedParametricModel | null | undefined = model.srcModel;
    while (current) {
      if (current && current instanceof HSCore.Model.NCustomizedParametricModel) {
        return current;
      }
      current = current.srcModel;
    }
    return model;
  }
}