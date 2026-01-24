/**
 * Decorator for NC Parametric Model FGI (Feature Graphics Interface)
 * Provides transformation and material data utilities for parametric models
 */

import type { MaterialObjDecorator } from './MaterialObjDecorator';
import type { MaterialDataObjDecorator } from './MaterialDataObjDecorator';

/**
 * RGB color value (0-16777215)
 */
type ColorValue = number;

/**
 * Unique identifier for seeking/referencing materials
 */
type SeekId = string | number;

/**
 * URI path to texture resource
 */
type TextureURI = string;

/**
 * Color mode enumeration from HSCore.Material
 */
declare enum ColorModeEnum {
  color = 'color',
  // Add other modes as needed
}

/**
 * 2D UV coordinate
 */
interface UV {
  x: number;
  y: number;
}

/**
 * Bounding box in UV space
 */
interface UVBox {
  min: UV;
  max: UV;
}

/**
 * Source UV mapping parameters
 */
interface SourceUVParameters {
  /** Source UV bounding box */
  srcUvBox: UVBox;
}

/**
 * FGI material input data
 */
interface FGIMaterialInput {
  /** Base color (RGB integer) */
  color?: ColorValue;
  /** Color rendering mode */
  colorMode?: ColorModeEnum;
  /** Material identifier */
  seekId?: SeekId;
  /** Diffuse texture URI */
  textureURI?: TextureURI;
  /** Normal map texture URI */
  normalTexture?: TextureURI;
}

/**
 * FGI material output data with defaults applied
 */
interface FGIMaterialData {
  /** Base color (defaults to white: 16777215) */
  color: ColorValue;
  /** Opacity (0-1 range) */
  opacity: number;
  /** Color rendering mode */
  colorMode: ColorModeEnum;
  /** Material identifier */
  seekId?: SeekId;
  /** Diffuse texture URI */
  texture?: TextureURI;
  /** Normal map texture URI */
  normalTexture?: TextureURI;
}

/**
 * Material object with transformation properties
 */
interface MaterialObject {
  /** Rotation angle in radians */
  rotation: number;
  /** Tile size in U direction */
  tileSize_x: number;
  /** Tile size in V direction */
  tileSize_y: number;
  /** Whether to fit texture to UV bounds */
  fit?: boolean;
  /** Scale factor in U direction */
  scaleX?: number;
  /** Scale factor in V direction */
  scaleY?: number;
}

/**
 * Material data container (pre-conversion format)
 */
interface MaterialDataObject {
  // Define properties based on MaterialDataObjDecorator requirements
  [key: string]: unknown;
}

/**
 * UV transformation matrix (local to world space)
 */
type UVTransformMatrix = unknown; // Replace with actual matrix type from MaterialObjDecorator

/**
 * Decorator class for NC Parametric Model FGI operations
 * Handles material data conversion and UV coordinate transformations
 */
export declare class NCParametricModelFGIDecorator {
  private readonly _model: unknown; // Replace with actual model type

  /**
   * Creates a new FGI decorator instance
   * @param model - The parametric model to decorate
   */
  constructor(model: unknown);

  /**
   * Converts raw material input to standardized FGI material data
   * Applies default values for missing properties
   * 
   * @param input - Raw material input data
   * @returns Normalized FGI material data with defaults applied
   * 
   * @remarks
   * - Default color: 16777215 (white)
   * - Default opacity: 1.0 (fully opaque)
   * - Default colorMode: HSCore.Material.ColorModeEnum.color
   */
  getFGIMaterialData(input: FGIMaterialInput): FGIMaterialData;

  /**
   * Calculates UV transformation matrix from source UV parameters to material space
   * 
   * @param sourceUV - Source UV coordinate parameters including bounding box
   * @param materialData - Material data object containing transformation properties
   * @returns UV transformation matrix (local to world space)
   */
  getUvTransform(
    sourceUV: SourceUVParameters,
    materialData: MaterialDataObject
  ): UVTransformMatrix;

  /**
   * V1 implementation of UV transformation calculation
   * 
   * @param sourceUV - Source UV coordinate parameters
   * @param materialData - Material data object
   * @returns UV transformation matrix using RTS (Rotation-Translation-Scale) method
   * 
   * @remarks
   * - Calculates UV space dimensions from bounding box
   * - Applies negative rotation (coordinate system conversion)
   * - Optionally scales texture to fit UV bounds based on tile size
   */
  private _getUvTransformV1(
    sourceUV: SourceUVParameters,
    materialData: MaterialDataObject
  ): UVTransformMatrix;

  /**
   * Converts material data object to material object format
   * 
   * @param materialData - Raw material data object
   * @returns Converted material object with transformation properties
   */
  private _getMaterialObj(materialData: MaterialDataObject): MaterialObject;
}