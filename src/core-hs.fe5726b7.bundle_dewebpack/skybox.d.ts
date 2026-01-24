/**
 * Skybox utility module for handling skybox configuration and data transformation.
 * Provides methods for creating default skybox data and converting skybox settings.
 */

declare namespace HSCore.Model {
  /**
   * Enumeration of skybox types
   */
  enum SkyboxTypeEnum {
    /** Default built-in skybox */
    Default = 'default',
    /** Built-in skybox preset */
    Builtin = 'builtin',
    /** Custom user-provided skybox */
    Custom = 'custom'
  }

  /**
   * Enumeration of skybox texture mapping types
   */
  enum SkyboxMappingType {
    /** Equirectangular projection mapping */
    ERP = 'erp',
    /** Custom box mapping (6 faces) */
    CustomBox = 'customBox'
  }
}

/**
 * RGB color represented as a tuple of three values [R, G, B] in 0-255 range
 */
type RGB255Color = [number, number, number];

/**
 * 2D vector for UV coordinates
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * Skybox configuration data structure
 */
interface SkyboxData {
  /** Type of skybox (default, builtin, or custom) */
  type: HSCore.Model.SkyboxTypeEnum;
  /** Name identifier of the skybox */
  name: string;
  /** Display label for custom skyboxes */
  label?: string;
  /** Light intensity multiplier (0-1+ range) */
  intensity: number;
  /** Y-axis rotation in degrees or radians */
  rotationY: number;
  /** UV texture scale factor */
  uvScale?: number;
  /** Local vertical offset */
  localOffsetY?: number;
  /** Background color in RGB255 format */
  bgColor?: RGB255Color;
  /** Fill mode for texture rendering */
  fillMode?: number;
  /** Texel size for texture sampling */
  texelSize?: number;
  /** Texture mapping type */
  mappingType?: HSCore.Model.SkyboxMappingType;
  /** UV scale on X-axis */
  uvScaleX?: number;
  /** UV scale on Y-axis */
  uvScaleY?: number;
  /** UV offset on X-axis */
  uvOffsetX?: number;
  /** UV offset on Y-axis */
  uvOffsetY?: number;
}

/**
 * Input skybox configuration object with methods
 */
interface SkyboxInput {
  type: HSCore.Model.SkyboxTypeEnum;
  name: string;
  label?: string;
  intensity: number;
  rotation: number;
  uvScale: number;
  localOffsetY: number;
  bgColor: number;
  fillMode: number;
  texelSize: number;
  mappingType?: HSCore.Model.SkyboxMappingType;
  
  /** Get UV scale as a 2D vector */
  getUVScale(): Vector2;
  /** Get UV offset as a 2D vector */
  getUVOffset(): Vector2;
}

/**
 * Skybox utility class for managing skybox configurations
 */
export declare class Skybox {
  /**
   * Creates default skybox configuration data
   * 
   * @param useBlackVariant - Whether to use black outdoor variant
   * @returns Default skybox configuration object
   */
  static getDefaultSkyboxData(useBlackVariant?: boolean): SkyboxData;

  /**
   * Converts RGB color from packed 24-bit integer to RGB255 array
   * 
   * @param packedColor - Color encoded as 24-bit integer (0xRRGGBB)
   * @returns RGB color array with values in 0-255 range
   * @example
   * getSkyboxColor3FromRGB255(0xE9E9E9) // returns [233, 233, 233]
   */
  static getSkyboxColor3FromRGB255(packedColor: number): RGB255Color;

  /**
   * Transforms input skybox configuration into standardized skybox data
   * 
   * @param input - Input skybox configuration object
   * @returns Normalized skybox data structure
   */
  static getSkyboxData(input: SkyboxInput): SkyboxData;
}