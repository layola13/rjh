import { MaterialData } from './MaterialData';

interface MaterialDataV1 {
  version: number;
  seekId?: string;
  colorMode?: string;
  color?: string;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTexture?: string;
  isTransparent?: boolean;
  paveMethod?: string;
  scaleX?: number;
  scaleY?: number;
}

interface LegacyMaterialData {
  regions?: unknown;
  seekId?: string;
  colorMode?: string;
  color?: string;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTexture?: string;
  isTransparent?: boolean;
}

interface MaterialDataInput {
  seekId?: string;
  colorMode?: string;
  color?: string;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTexture?: string;
  isTransparent?: boolean;
  userDefined?: {
    notExtendImageToFitFace?: boolean;
  };
}

interface MaterialDataWithTileSize extends ReturnType<typeof MaterialData.create> {
  initTileSize_x?: number;
  initTileSize_y?: number;
  tileSize_x?: number;
  tileSize_y?: number;
}

export class NCParametricModelMaterialDataUtil {
  /**
   * Converts material data to the current version format
   * @param data - Input material data (can be legacy or versioned format)
   * @returns MaterialData instance with current version
   */
  static toMaterialDataWithVersion(data: LegacyMaterialData | MaterialDataV1 | null | undefined): ReturnType<typeof MaterialData.create> {
    if (!data || (data as LegacyMaterialData).regions) {
      return MaterialData.create();
    }

    const versionedData = data as MaterialDataV1;
    if (!versionedData.version) {
      return MaterialData.create(data as MaterialDataInput);
    }

    let result: ReturnType<typeof MaterialData.create>;
    result = this._toMaterialDataV1(versionedData);
    return result;
  }

  /**
   * Checks if material data is in old version format
   * @param data - Material data to check
   * @returns True if data is in old version format
   */
  static isOldVersion(data: LegacyMaterialData | MaterialDataV1 | null | undefined): boolean {
    return !(!data || (data as LegacyMaterialData).regions || (data as MaterialDataV1).version);
  }

  /**
   * Converts V1 material data to current format
   * @param data - V1 versioned material data
   * @returns Converted MaterialData instance
   */
  private static _toMaterialDataV1(data: MaterialDataV1): MaterialDataWithTileSize {
    const materialInput: MaterialDataInput = {
      seekId: data.seekId,
      colorMode: data.colorMode,
      color: data.color,
      textureURI: data.textureURI,
      offsetX: data.offsetX,
      offsetY: data.offsetY,
      rotation: data.rotation,
      normalTexture: data.normalTexture,
      isTransparent: data.isTransparent
    };

    if (data.paveMethod === 'stretch') {
      materialInput.userDefined = {
        notExtendImageToFitFace: false
      };
    }

    const materialData = MaterialData.create(materialInput) as MaterialDataWithTileSize;

    if (data.scaleX !== undefined && data.scaleX !== 1 && materialData.initTileSize_x !== undefined) {
      materialData.tileSize_x = data.scaleX * materialData.initTileSize_x;
    }

    if (data.scaleY !== undefined && data.scaleY !== 1 && materialData.initTileSize_y !== undefined) {
      materialData.tileSize_y = data.scaleY * materialData.initTileSize_y;
    }

    return materialData;
  }
}