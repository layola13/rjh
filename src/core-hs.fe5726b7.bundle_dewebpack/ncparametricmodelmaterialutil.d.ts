/**
 * Material information returned by getMaterialInfo
 */
interface MaterialInfo {
  /** Unique identifier for the material */
  seekId: string | number;
  /** Rotation angle in degrees */
  rotation: number;
  /** Horizontal offset */
  offsetX: number;
  /** Vertical offset */
  offsetY: number;
  /** Maximum horizontal slider value */
  maxSliderX: number;
  /** Maximum vertical slider value */
  maxSliderY: number;
  /** Horizontal scale factor */
  scaleX: number;
  /** Vertical scale factor */
  scaleY: number;
}

/**
 * Material input type - can be HSCore Material or custom material object
 */
interface CustomMaterialData {
  seekId: string | number;
  tileSize_x?: number;
  tileSize_y?: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Utility class for handling parametric model material operations
 */
export declare class NCParametricModelMaterialUtil {
  /**
   * Extracts material information from a material object or custom material data
   * @param material - HSCore Material instance or custom material data object
   * @returns Material information including scale, rotation, offsets and seekId
   */
  static getMaterialInfo(
    material: HSCore.Material.Material | CustomMaterialData
  ): MaterialInfo;

  /**
   * Checks if the material data is from an old version based on face tag
   * @param model - Background wall array or customized parametric model
   * @param faceTag - Tag identifier for the face to check
   * @returns True if the material data is from an old version
   */
  static isOldVersionByFaceTag(
    model: HSCore.Model.NCPBackgroundWallArray | HSCore.Model.NCustomizedParametricModel,
    faceTag: string | number
  ): boolean;
}