/**
 * Material utility module providing helper functions for material data manipulation
 * @module Util
 */

/**
 * Position mapping configuration for material alignment
 * Maps rotation positions to their corresponding alignment positions
 */
declare const POSITION_ROTATION_MAP: Record<HSConstants.Position, [HSConstants.Position, HSConstants.Position]>;

/**
 * Regular expression for matching wallfloor texture URLs
 */
declare const WALLFLOOR_URL_PATTERN: RegExp;

/**
 * Result of style type analysis for material alignment
 */
export interface StyleTypeResult {
  /** Whether material should support alignment operations */
  doAlignment: boolean;
  /** Whether material should support position operations */
  doPosition: boolean;
}

/**
 * Offset values for material texture positioning
 */
export interface MaterialOffset {
  /** Horizontal offset (0-1 normalized) */
  offsetX: number;
  /** Vertical offset (0-1 normalized) */
  offsetY: number;
}

/**
 * Rotation information for pinhua (customized tile) materials
 */
export interface PinhuaRotation {
  /** Major rotation index (0-3, representing 0°, 90°, 180°, 270°) */
  major: number;
  /** Minor rotation adjustment */
  minor: number;
}

/**
 * Utility class for material data operations
 */
export declare class Util {
  /**
   * Flag indicating whether seam filler feature is supported
   */
  static isSeamFillerSupported: boolean | undefined;

  /**
   * Get the face type of a wall or face entity
   * @param entity - Wall or Face entity
   * @param options - Optional configuration with face type hint
   * @returns Face type enum value
   */
  static getFaceType(
    entity: HSCore.Model.Wall | HSCore.Model.Face,
    options?: { face?: HSCore.Model.WallSurfaceTypeEnum | number }
  ): HSCore.Model.WallSurfaceTypeEnum | number | undefined;

  /**
   * Get material data from various entity types
   * @param entity - Entity to extract material from
   * @param faceType - Optional face type for walls/slabs
   * @returns Material data or undefined if not applicable
   */
  static getEntityMaterial(
    entity: HSCore.Model.Wall | HSCore.Model.Slab | HSCore.Model.Face | HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot | HSCore.Model.CustomizedPMModel,
    faceType?: HSCore.Model.WallSurfaceTypeEnum | number
  ): HSCore.Material.MaterialData | undefined;

  /**
   * Calculate the total distance along a profile path
   * @param profile - Array of 2D points defining the profile
   * @param scaleX - Horizontal scale factor (default: 1)
   * @param scaleY - Vertical scale factor (default: 1)
   * @returns Total distance in scaled units
   */
  static getProfileDistance(
    profile: Array<{ x: number; y: number }>,
    scaleX?: number,
    scaleY?: number
  ): number;

  /**
   * Convert numeric color to hex string format
   * @param color - Numeric color value (RGB packed integer)
   * @returns Hex color string without '#' prefix
   */
  static convertColorToString(color: number): string;

  /**
   * Convert color string or number to numeric format
   * @param color - Color as hex string or number
   * @returns Numeric color value, defaults to white (0xFFFFFF) if null
   */
  static convertColorToNumber(color: string | number | null): number;

  /**
   * Create material data specifically for seam filler materials
   * @param metadata - Catalog metadata for the seam filler
   * @returns Configured MaterialData instance
   */
  static getSeamMaterialData(metadata: HSCatalog.MetaData): HSCore.Material.MaterialData;

  /**
   * Create material data from catalog metadata
   * @param metadata - Catalog metadata
   * @returns Configured MaterialData instance with all properties set
   */
  static getMaterialData(metadata: HSCatalog.MetaData): HSCore.Material.MaterialData;

  /**
   * Update material data object with new values
   * @param materialData - Target material data object
   * @param data - New data to apply
   */
  static setMaterialData(
    materialData: HSCore.Material.MaterialData,
    data: Partial<HSCore.Material.MaterialData>
  ): void;

  /**
   * Compare two material data objects for equality
   * @param data1 - First material data
   * @param data2 - Second material data
   * @returns True if all relevant properties match
   */
  static isSameMaterialData(
    data1: HSCore.Material.MaterialData,
    data2: HSCore.Material.MaterialData
  ): boolean;

  /**
   * Convert catalog metadata to material data JSON format
   * @param metadata - Catalog metadata
   * @returns Material data as JSON object
   */
  static getMaterialDataFromCatalogMeta(metadata: HSCatalog.MetaData): Record<string, unknown>;

  /**
   * Create MaterialData object from catalog metadata
   * @param metadata - Catalog metadata
   * @returns New MaterialData instance
   */
  static getMaterialDataObjectFromCatalogMeta(metadata: HSCatalog.MetaData): HSCore.Material.MaterialData;

  /**
   * Extract DIY material data from a material entity
   * @param entity - Material entity
   * @returns Material data JSON or undefined
   */
  static getDIYMaterialDataFromMaterialEntity(entity: unknown): Record<string, unknown> | undefined;

  /**
   * Create default material data for customized models
   * @returns MaterialData with default customized model settings
   */
  static getDefaultCustomizedModelMaterialData(): HSCore.Material.MaterialData;

  /**
   * Quick align material texture to a position within bounds
   * @param materialData - Material data to modify
   * @param bounds - Bounding box defining alignment area
   * @param position - Target alignment position
   * @returns Modified material data
   */
  static quickAlignMaterial(
    materialData: HSCore.Material.MaterialData,
    bounds: { min: { x: number; y: number }; max: { x: number; y: number } },
    position: HSConstants.Position
  ): HSCore.Material.MaterialData;

  /**
   * Base alignment function for single axis
   * @param materialData - Material data to modify
   * @param bounds - Bounding box
   * @param position - Alignment position (single axis)
   * @returns Modified material data
   */
  static quickAlignMaterialBase(
    materialData: HSCore.Material.MaterialData,
    bounds: { min: { x: number; y: number }; max: { x: number; y: number } },
    position: HSConstants.Position
  ): HSCore.Material.MaterialData;

  /**
   * Normalize offset values to 0-1 range
   * @param materialData - Material data with offsets
   * @returns Material data with normalized offsets
   */
  static normalizeOffset(materialData: HSCore.Material.MaterialData): HSCore.Material.MaterialData;

  /**
   * Check if material is from catalog (not a built-in material)
   * @param seekId - Material seek ID
   * @returns True if material is from catalog
   */
  static isCatalogMaterial(seekId: string): boolean;

  /**
   * Switch material texture URI to backup version if seam filler is supported
   * @param materialData - Material data to modify
   */
  static switchMaterialTextureURI(materialData: HSCore.Material.MaterialData): void;

  /**
   * Quick align material for DIY customization
   * @param materialData - Material data to modify
   * @param bounds - Bounding box
   * @param position - Target alignment position
   */
  static quickAlignMaterialForDiy(
    materialData: HSCore.Material.MaterialData,
    bounds: { min: { x: number; y: number }; max: { x: number; y: number } },
    position: HSConstants.Position
  ): void;

  /**
   * Base DIY alignment function considering rotation
   * @param materialData - Material data
   * @param bounds - Bounding box
   * @param position - Alignment position
   * @returns Calculated offset values
   */
  static quickAlignMaterialForDiyBase(
    materialData: HSCore.Material.MaterialData,
    bounds: { min: { x: number; y: number }; max: { x: number; y: number } },
    position: HSConstants.Position
  ): MaterialOffset;

  /**
   * Get rotation configuration for pinhua (customized tile) materials
   * @param position - Alignment position
   * @returns Rotation indices for major and minor adjustments
   */
  static getPinhuaRotation(position: HSConstants.Position): PinhuaRotation;

  /**
   * Get small icon URI for material thumbnail
   * @param materialData - Material data
   * @returns Icon URL or undefined
   */
  static getIconSmallURI(materialData: HSCore.Material.MaterialData): string | undefined;

  /**
   * Get large icon URI for material preview
   * @param materialData - Material data
   * @returns Icon URL
   */
  static getIconLargeURI(materialData: HSCore.Material.MaterialData): string;

  /**
   * Convert texture URL to icon URL
   * @param textureUrl - Original texture URL
   * @returns Icon URL with type parameter
   */
  static getIconURI(textureUrl: string): string;

  /**
   * Check if material is wall panel type
   * @param contentType - Content type object
   * @returns True if material is wall panel
   */
  static isWallPanelMaterial(contentType: HSCatalog.ContentType): boolean;

  /**
   * Analyze material style type to determine supported operations
   * @param materialData - Material data to analyze
   * @returns Style type configuration
   */
  static getStyleType(materialData: HSCore.Material.MaterialData): StyleTypeResult;

  /**
   * Create safe copy of material data without reactive signals
   * @param materialData - Source material data (may contain signals)
   * @returns Plain MaterialData object
   */
  static getSafeMaterialData(materialData?: HSCore.Material.MaterialData | Record<string, unknown>): HSCore.Material.MaterialData;

  /**
   * Check if material uses solid color mode
   * @param materialData - Material data
   * @returns True if color mode is solid color
   */
  static isUseColorOfMaterial(materialData: HSCore.Material.MaterialData): boolean;

  /**
   * Check if material uses texture mode
   * @param materialData - Material data
   * @returns True if color mode is texture
   */
  static isUseTextureOfMaterial(materialData: HSCore.Material.MaterialData): boolean;

  /**
   * Check if material uses blend mode (texture + color)
   * @param materialData - Material data
   * @returns True if color mode is blend
   */
  static isUseBlendOfMaterial(materialData: HSCore.Material.MaterialData): boolean;
}