export enum ColorMode {
  Color = 0,
  Texture = 1,
  Blend = 2
}

interface NormalTextureParams {
  textureUrl: string;
  tileSize_x: number;
  tileSize_y: number;
}

interface MaterialData {
  seekId?: string;
  normalTexture?: string;
  normalTileSize_x?: number;
  normalTileSize_y?: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
  colorMode?: ColorMode;
  color?: string;
  blendColor?: string;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  flipX?: boolean;
  flipY?: boolean;
  userDefined?: {
    notExtendImageToFitFace?: boolean;
  };
  isTransparent?: boolean;
}

interface MaterialObject {
  seekId: string;
  tileSize_x: number;
  tileSize_y: number;
  colorMode: ColorMode;
  color?: string;
  blendColor?: string;
  textureUrl: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
  flipX?: boolean;
  flipY?: boolean;
  scaleX: number;
  scaleY: number;
  normalParams?: NormalTextureParams[];
  fit: boolean;
  isTransparent: boolean;
}

class MaterialConvertor {
  static getTileSizeScale(materialData: MaterialData): [number, number] {
    // Implementation would be needed from the actual module
    return [1, 1];
  }
}

export class MaterialDataObjDecorator {
  private readonly _materialDataObj: MaterialData;

  constructor(materialDataObj: MaterialData) {
    this._materialDataObj = materialDataObj;
  }

  toMaterialObj(): MaterialObject {
    const materialData = this._materialDataObj;
    const tileSizeScale = MaterialConvertor.getTileSizeScale(materialData);

    let normalParams: NormalTextureParams | undefined;
    
    if (materialData.normalTexture) {
      normalParams = {
        textureUrl: materialData.normalTexture,
        tileSize_x: materialData.normalTileSize_x ?? 1,
        tileSize_y: materialData.normalTileSize_y ?? 1
      };
    }

    return {
      seekId: materialData.seekId ?? "",
      tileSize_x: materialData.initTileSize_x ?? 1,
      tileSize_y: materialData.initTileSize_y ?? 1,
      colorMode: materialData.colorMode ?? ColorMode.Color,
      color: materialData.color,
      blendColor: materialData.blendColor,
      textureUrl: materialData.textureURI ?? "",
      offsetX: materialData.offsetX ?? 0,
      offsetY: materialData.offsetY ?? 0,
      rotation: materialData.rotation ?? 0,
      flipX: materialData.flipX,
      flipY: materialData.flipY,
      scaleX: tileSizeScale[0],
      scaleY: tileSizeScale[1],
      normalParams: normalParams ? [normalParams] : undefined,
      fit: materialData.userDefined?.notExtendImageToFitFace === false || undefined,
      isTransparent: !!materialData.isTransparent
    };
  }
}