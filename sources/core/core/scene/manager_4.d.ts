/**
 * Material management system for handling various material types, textures, and processing operations.
 * Manages material metadata, texture generation, boundary calculations, and custom tile services.
 */

/** Material type enumeration for custom tiles */
export interface MaterialTypeEnum {
  /** Spread custom tiles material type */
  spreadCustomTiles: "spread_custom_tiles";
  /** DWG custom tiles material type */
  dwgCustomTiles: "dwg_custom_tiles";
}

/** Material data structure containing texture and configuration */
export interface MaterialData {
  /** Unique identifier for the material */
  seekId?: string;
  /** Texture URI (can be URL or data URL) */
  textureURI?: string | unknown;
  /** Flag indicating if texture URI is using default */
  textureURIDefault?: boolean;
  /** Additional material properties */
  [key: string]: unknown;
}

/** Product metadata from catalog */
export interface ProductMeta {
  /** Unique identifier */
  seekId: string;
  /** Product type classification */
  productType: string;
  /** Additional metadata fields */
  [key: string]: unknown;
}

/** Process handler with check and execute functions */
export interface ProcessHandler<TInput, TOutput> {
  /** Check if material matches this process */
  check: (material: MaterialData) => boolean;
  /** Execute the process */
  do: (material: TInput) => TOutput;
}

/** Material processor for image generation */
export interface MaterialProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Generate image from material data */
  generateImage: (material: MaterialData) => Promise<string>;
}

/** Boundary path processor */
export interface BoundaryProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Extract boundary path from material */
  getBoundary: (material: MaterialData) => unknown;
}

/** Inner paths processor */
export interface InnerPathsProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Extract inner paths from material */
  getInnerPaths: (material: MaterialData) => unknown;
}

/** Rectangle check processor */
export interface RectangleProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Determine if material texture is rectangular */
  isRectangle: (material: MaterialData) => boolean;
}

/** Data URL change requirement processor */
export interface DataURLProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
}

/** Material type name processor */
export interface TypeNameProcessor {
  /** Check material and return type name or null */
  checkMaterial: (material: MaterialData) => string | null;
}

/** Post-processing processor */
export interface PostProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Apply post-processing to material */
  postProcessMaterial: (material: MaterialData) => void;
}

/** Default offset processor */
export interface DefaultOffsetProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Get default offset for material */
  getDefaultOffset: (material: MaterialData) => unknown;
}

/** Area and seek ID processor */
export interface AreaSeekProcessor {
  /** Verify if this processor handles the material */
  checkMaterial: (material: MaterialData) => boolean;
  /** Get area and seek ID mapping */
  getAreaAndSeekId: (material: MaterialData) => Record<string, number>;
}

/** Generic handler interface */
export interface Handler {
  [key: string]: unknown;
}

/**
 * Manager class for material processing and data management.
 * Singleton pattern implementation for centralized material handling.
 */
export declare class Manager {
  /** Material type enumeration constants */
  readonly MaterialTypeEnum: MaterialTypeEnum;

  /** Private material processing registry */
  private readonly _materialProcess: Record<string, MaterialProcessor>;
  
  /** Private seamed image processing registry */
  private readonly _materialSeamedImageProcess: Record<string, MaterialProcessor>;
  
  /** Private boundary path processing registry */
  private readonly _materialBoundaryPathProcess: Record<string, BoundaryProcessor>;
  
  /** Private inner paths processing registry */
  private readonly _materialInnerPathsProcess: Record<string, InnerPathsProcessor>;
  
  /** Private rectangle check registry */
  private readonly _materialIsRectangle: Record<string, RectangleProcessor>;
  
  /** Private data URL change requirement registry */
  private readonly _materialNeedToChangeDataURL: Record<string, DataURLProcessor>;
  
  /** Private material type name registry */
  private readonly _materialTypeName: Record<string, TypeNameProcessor>;
  
  /** Private material inner paths registry */
  private readonly _materialInnerPaths: Record<string, InnerPathsProcessor>;
  
  /** Private material area seek registry */
  private readonly _materialAreaSeek: Record<string, AreaSeekProcessor>;
  
  /** Private products metadata map */
  private readonly _productsMap: Map<string, ProductMeta>;
  
  /** Private post-processing registry */
  private readonly _materialPostProcess: Record<string, PostProcessor>;
  
  /** Private default offset registry */
  private readonly _materialDefaultOffset: Record<string, DefaultOffsetProcessor>;
  
  /** Private handlers map */
  private readonly _handlers: Map<string, Handler>;
  
  /** Private normal map material data cache */
  private readonly _normalMapMaterialData: Map<string, unknown>;
  
  /** Private default material data cache */
  private readonly _defaultMaterialData: Map<string, unknown>;
  
  /** Private pattern material data cache */
  private readonly _patternMaterialData: Map<string, unknown>;

  /** Singleton instance holder */
  private static _instance?: Manager;

  /**
   * Constructor initializes all registries and default materials.
   * Registers default wall, floor, ceiling materials and customized tile service.
   */
  constructor();

  /**
   * Register customized tile service with boundary, rectangle, and offset processors.
   * Uses HSCore.Util.CustomizedTile utilities for custom tile handling.
   */
  registerCustomizedTileService(): void;

  /**
   * Retrieve product metadata by seek ID.
   * Falls back to catalog manager if not found in local cache.
   * @param seekId - Unique material identifier
   * @returns Product metadata or undefined
   */
  getMetaData(seekId: string): ProductMeta | undefined;

  /**
   * Cache product metadata if it's a material type.
   * @param meta - Product metadata to store
   */
  setMetaData(meta: ProductMeta): void;

  /**
   * Retrieve pattern material data by key.
   * @param key - Pattern identifier
   * @returns Pattern material data or undefined
   */
  getPatternMaterialData(key: string): unknown;

  /**
   * Store pattern material data.
   * @param key - Pattern identifier
   * @param data - Pattern material data
   */
  setPatternMaterialData(key: string, data: unknown): void;

  /**
   * Get all cached material products.
   * @returns Map of seek IDs to product metadata
   */
  getMaterials(): Map<string, ProductMeta>;

  /**
   * Generate or retrieve image URL from material data.
   * Returns textureURI if already a string, otherwise processes through registered handlers.
   * @param material - Material data containing texture information
   * @returns Promise resolving to image URL or empty string
   */
  getImageFromMaterialData(material: MaterialData): Promise<string>;

  /**
   * Generate or retrieve seamed image URL from material data.
   * Handles default texture URIs and processes through seamed image handlers.
   * @param material - Material data containing texture information
   * @returns Promise resolving to seamed image URL or empty string
   */
  getSeamedImageFromMaterialData(material: MaterialData): Promise<string>;

  /**
   * Extract boundary path from material data.
   * @param material - Material data
   * @returns Boundary path or null if no processor matches
   */
  getBoundaryFromMaterialData(material: MaterialData): unknown;

  /**
   * Extract inner paths from material data.
   * @param material - Material data
   * @returns Inner paths or null if no processor matches
   */
  getInnerPathsFromMaterialData(material: MaterialData): unknown;

  /**
   * Check if material texture is rectangular.
   * @param material - Material data
   * @returns True if rectangular, false otherwise (defaults to true)
   */
  getIsRectangleFromMaterialData(material: MaterialData): boolean;

  /**
   * Determine if material texture URI needs conversion to data URL.
   * Checks if textureURI is empty or already a data URL.
   * @param material - Material data
   * @returns True if conversion needed
   */
  isMaterialNeedToChangeDataURL(material: MaterialData): boolean;

  /**
   * Register material data processor for image generation.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialDataProcess(
    key: string,
    handler: ProcessHandler<MaterialData, Promise<string>>
  ): void;

  /**
   * Register seamed image processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerSeamedImageProcess(
    key: string,
    handler: ProcessHandler<MaterialData, Promise<string>>
  ): void;

  /**
   * Register boundary path processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialBoundaryProcess(
    key: string,
    handler: ProcessHandler<MaterialData, unknown>
  ): void;

  /**
   * Register inner paths processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialInnerPathsProcess(
    key: string,
    handler: ProcessHandler<MaterialData, unknown>
  ): void;

  /**
   * Register rectangle check processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialIsRectangleProcess(
    key: string,
    handler: ProcessHandler<MaterialData, boolean>
  ): void;

  /**
   * Register data URL change requirement processor.
   * @param key - Processor identifier
   * @param handler - Handler with check function only
   */
  registerMaterialNeedToChangeDataURL(
    key: string,
    handler: { check: (material: MaterialData) => boolean }
  ): void;

  /**
   * Register material type name processor.
   * @param key - Processor identifier
   * @param handler - Handler with check function returning type name or null
   */
  registerMaterialTypeName(
    key: string,
    handler: { check: (material: MaterialData) => string | null }
  ): void;

  /**
   * Register material internal paths processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialInternalPaths(
    key: string,
    handler: ProcessHandler<MaterialData, unknown>
  ): void;

  /**
   * Register post-processing material processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerPostProcessMaterialProcess(
    key: string,
    handler: ProcessHandler<MaterialData, void>
  ): void;

  /**
   * Register default offset processor for customized materials.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialGetDefaultOffsetProcess(
    key: string,
    handler: ProcessHandler<MaterialData, unknown>
  ): void;

  /**
   * @deprecated Use getCustomizedMaterialDefaultOffset instead
   * Get default offset for customized material.
   * @param material - Material data
   * @returns Default offset or undefined
   */
  getCutomizedMaterialDefaultOffset(material: MaterialData): unknown;

  /**
   * Get default offset for customized material.
   * @param material - Material data
   * @returns Default offset or undefined
   */
  getCustomizedMaterialDefaultOffset(material: MaterialData): unknown;

  /**
   * Get material type name by checking registered processors.
   * @param material - Material data
   * @returns Type name or null if no match found
   */
  getMaterialTypeName(material: MaterialData): string | null;

  /**
   * Get material internal paths.
   * @param material - Material data
   * @returns Internal paths or null if no processor matches
   */
  getMaterialInternalPaths(material: MaterialData): unknown;

  /**
   * Register area and seek ID processor.
   * @param key - Processor identifier
   * @param handler - Handler with check and do functions
   */
  registerMaterialAreaAndSeekId(
    key: string,
    handler: ProcessHandler<MaterialData, Record<string, number>>
  ): void;

  /**
   * Get material area and seek ID mapping.
   * @param material - Material data
   * @returns Area-seekId mapping or null
   */
  getMaterialAreaSeekId(material: MaterialData): Record<string, number> | null;

  /**
   * Get main seek ID by finding the area with maximum value.
   * Falls back to material.seekId if no processor matches.
   * @param material - Material data
   * @returns Main seek ID
   */
  getMaterialMainSeekId(material: MaterialData): string | undefined;

  /**
   * Apply post-processing to material through registered processors.
   * @param material - Material data to process
   */
  postProcessMaterial(material: MaterialData): void;

  /**
   * Retrieve normal map material data.
   * @param key - Material identifier
   * @returns Normal map data or undefined
   */
  getNormalMaterialData(key: string): unknown;

  /**
   * Store normal map material data.
   * @param key - Material identifier
   * @param data - Normal map data
   */
  setNormalMaterialData(key: string, data: unknown): void;

  /**
   * Get default material data by key and create material instance.
   * @param key - Default material identifier (e.g., "DEFAULT_WALL_MATERIAL")
   * @returns Created material data instance
   */
  getDefaultMaterialData(key: string): MaterialData | undefined;

  /**
   * Register default material data constant.
   * @param key - Material identifier key
   * @param data - Material data constant
   */
  registerDefaultMaterialData(key: string, data: unknown): void;

  /**
   * Register custom handler.
   * @param key - Handler identifier
   * @param handler - Handler implementation
   */
  registerHandler(key: string, handler: Handler): void;

  /**
   * Get singleton instance of Manager.
   * Creates instance on first call.
   * @returns Manager singleton instance
   */
  static instance(): Manager;
}