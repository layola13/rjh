export enum CustomizedTileType {
  System = "system",
  Custom = "custom",
  EditSize = "editsize"
}

export interface CustomizedTilePaintData {
  type: CustomizedTileType;
  isRectangle?: boolean;
  mPath?: string | null;
  defaultOffset?: { x: number; y: number } | null;
}

export const CustomizedTileUtil = {
  /**
   * Check if the material is a customized tiles material
   */
  isCustomizedTilesMaterial(material: unknown): boolean {
    return HSCore.Util.PaintMaterial.isCustomizedTilesMaterial(material);
  },

  /**
   * Check if the texture is a rectangle shape
   */
  textureIsRectangle(material: unknown): boolean {
    const paintData: CustomizedTilePaintData = 
      HSCore.Util.PaintMaterial.parseCustomizedTilePaintData(material);
    return paintData.type !== CustomizedTileType.Custom || (paintData.isRectangle ?? false);
  },

  /**
   * Get the texture boundary path
   */
  getTextureBoundary(material: unknown): string | null {
    const paintData: CustomizedTilePaintData = 
      HSCore.Util.PaintMaterial.parseCustomizedTilePaintData(material);
    return paintData.type === CustomizedTileType.Custom ? (paintData.mPath ?? null) : null;
  },

  /**
   * Get the default offset for the texture
   */
  getDefaultOffset(material: unknown): { x: number; y: number } | null {
    const paintData: CustomizedTilePaintData = 
      HSCore.Util.PaintMaterial.parseCustomizedTilePaintData(material);
    return paintData.type !== CustomizedTileType.Custom ? (paintData.defaultOffset ?? null) : null;
  }
};