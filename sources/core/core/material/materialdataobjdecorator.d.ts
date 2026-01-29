/**
 * Material data object decorator that converts material data to a standardized material object format.
 * Provides transformation logic for texture coordinates, color modes, and normal maps.
 */

import { ColorMode } from './path/to/ColorMode';
import { MaterialConvertor } from './path/to/MaterialConvertor';

/**
 * Raw material data structure from the backend or data source.
 */
interface MaterialDataObj {
  /** Unique identifier for the material */
  seekId?: string;
  /** Initial tile size in X direction */
  initTileSize_x?: number;
  /** Initial tile size in Y direction */
  initTileSize_y?: number;
  /** Color blending mode */
  colorMode?: ColorMode;
  /** Base color of the material */
  color?: string;
  /** Blend color for mixing */
  blendColor?: string;
  /** URI/URL to the texture image */
  textureURI?: string;
  /** Horizontal offset of the texture */
  offsetX?: number;
  /** Vertical offset of the texture */
  offsetY?: number;
  /** Rotation angle of the texture in degrees */
  rotation?: number;
  /** Whether to flip texture horizontally */
  flipX?: boolean;
  /** Whether to flip texture vertically */
  flipY?: boolean;
  /** Normal map texture URL */
  normalTexture?: string;
  /** Normal map tile size in X direction */
  normalTileSize_x?: number;
  /** Normal map tile size in Y direction */
  normalTileSize_y?: number;
  /** User-defined configuration options */
  userDefined?: {
    /** If true, prevents extending image to fit face geometry */
    notExtendImageToFitFace?: boolean;
  };
  /** Whether the material has transparency */
  isTransparent?: boolean;
}

/**
 * Normal map parameters configuration.
 */
interface NormalParams {
  /** URL to the normal map texture */
  textureUrl: string;
  /** Tile size in X direction */
  tileSize_x?: number;
  /** Tile size in Y direction */
  tileSize_y?: number;
}

/**
 * Standardized material object format for rendering.
 */
interface MaterialObj {
  /** Unique identifier for the material */
  seekId: string;
  /** Tile size in X direction (default: 1) */
  tileSize_x: number;
  /** Tile size in Y direction (default: 1) */
  tileSize_y: number;
  /** Color blending mode */
  colorMode: ColorMode;
  /** Base color of the material */
  color?: string;
  /** Blend color for mixing */
  blendColor?: string;
  /** URL to the texture image */
  textureUrl: string;
  /** Horizontal offset of the texture (default: 0) */
  offsetX: number;
  /** Vertical offset of the texture (default: 0) */
  offsetY: number;
  /** Rotation angle of the texture in degrees (default: 0) */
  rotation: number;
  /** Whether to flip texture horizontally */
  flipX?: boolean;
  /** Whether to flip texture vertically */
  flipY?: boolean;
  /** Scale factor in X direction */
  scaleX: number;
  /** Scale factor in Y direction */
  scaleY: number;
  /** Normal map parameters array */
  normalParams?: NormalParams[];
  /** Whether to extend image to fit face geometry */
  fit?: boolean;
  /** Whether the material has transparency */
  isTransparent: boolean;
}

/**
 * Decorator class that wraps MaterialDataObj and provides conversion to MaterialObj format.
 * Handles default values, coordinate transformations, and normal map configuration.
 */
export class MaterialDataObjDecorator {
  private readonly _materialDataObj: MaterialDataObj;

  /**
   * Creates a new MaterialDataObjDecorator instance.
   * @param materialDataObj - The raw material data object to decorate
   */
  constructor(materialDataObj: MaterialDataObj) {
    this._materialDataObj = materialDataObj;
  }

  /**
   * Converts the internal material data object to a standardized MaterialObj format.
   * Applies default values, calculates tile size scales, and configures normal maps.
   * 
   * @returns A standardized material object ready for rendering
   */
  toMaterialObj(): MaterialObj {
    const data = this._materialDataObj;
    const [scaleX, scaleY] = MaterialConvertor.getTileSizeScale(data);

    let normalParams: NormalParams | undefined;
    if (data.normalTexture) {
      normalParams = {
        textureUrl: data.normalTexture,
        tileSize_x: data.normalTileSize_x,
        tileSize_y: data.normalTileSize_y
      };
    }

    return {
      seekId: data.seekId ?? '',
      tileSize_x: data.initTileSize_x || 1,
      tileSize_y: data.initTileSize_y || 1,
      colorMode: data.colorMode ?? ColorMode.Color,
      color: data.color,
      blendColor: data.blendColor,
      textureUrl: data.textureURI ?? '',
      offsetX: data.offsetX || 0,
      offsetY: data.offsetY || 0,
      rotation: data.rotation || 0,
      flipX: data.flipX,
      flipY: data.flipY,
      scaleX,
      scaleY,
      normalParams: normalParams ? [normalParams] : undefined,
      fit: data.userDefined?.notExtendImageToFitFace === false || undefined,
      isTransparent: !!data.isTransparent
    };
  }
}