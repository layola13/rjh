/**
 * Material Seam Filler Plugin
 * 
 * This module provides functionality for processing material textures with seam filling.
 * It registers with the material manager to handle seamed image generation for supported materials.
 */

/**
 * Configuration for seam filler processing
 */
interface SeamFillerConfig {
  /** The texture URI to process */
  textureURI: string;
  /** Width of the seam in pixels (default: 2) */
  seamWidth?: number;
  /** Seam color in hex format (default: "FFFFFF") */
  seamColor?: string;
  /** Horizontal tile size */
  tileSize_x: number;
  /** Vertical tile size */
  tileSize_y: number;
}

/**
 * Material image process handler
 */
interface MaterialImageProcess {
  /** Check function to determine if material supports seam processing */
  check: (material: unknown) => boolean;
  /** Process function to generate seamed image */
  do: (config: SeamFillerConfig) => Promise<string>;
}

/**
 * Material with seam support properties
 */
interface SeamSupportedMaterial {
  /** Whether the material supports seam filling */
  seamFillerSupported?: boolean;
  /** Width of the seam */
  seamWidth?: number;
}

/**
 * Application initialization config
 */
interface AppInitConfig {
  /** Application instance */
  app: {
    /** Material manager instance */
    materialManager: {
      /** Register a seam image processor */
      registerSeamedImageProcess(
        pluginType: string,
        process: MaterialImageProcess
      ): void;
    };
  };
}

/**
 * Material Seam Filler Plugin Class
 * 
 * Handles the generation of seamed images for materials, adding border lines
 * between tiles to prevent visual artifacts in tiled textures.
 */
export default class MaterialSeamFillerPlugin {
  /** Application instance reference */
  private _app: AppInitConfig['app'];
  
  /** Cache for generated material URLs to avoid redundant API calls */
  private _materialUrlCache: Map<string, Promise<string>>;

  /**
   * Initialize the seam filler plugin
   * 
   * Registers the plugin with the material manager and sets up URL caching.
   * 
   * @param config - Initialization configuration containing app instance
   */
  init(config: AppInitConfig): void;

  /**
   * Get material URL with seam filler applied
   * 
   * Constructs a URL to request a seamed version of the texture from the API.
   * Results are cached to improve performance on repeated requests.
   * 
   * @param textureUrl - Original texture URL
   * @param seamWidth - Width of the seam border in pixels
   * @param seamColorHex - Seam color in hex format (without '#')
   * @param aspectRatio - Optional aspect ratio (width/height) for the texture
   * @returns Promise resolving to the seamed image URL
   */
  getMaterialUrlWithSeamFiller(
    textureUrl: string,
    seamWidth: number,
    seamColorHex: string,
    aspectRatio?: number
  ): Promise<string>;

  /**
   * Reset the material URL cache
   * 
   * Clears all cached seamed material URLs, forcing fresh generation
   * on subsequent requests.
   */
  resetMaterialUrlCache(): void;

  /**
   * Generate a seam image URL from canvas
   * 
   * Creates a solid color image of specified dimensions using canvas API
   * and returns it as a data URL.
   * 
   * @param width - Image width in pixels
   * @param height - Image height in pixels
   * @param fillColor - Fill color (CSS color format)
   * @returns Data URL of the generated image (PNG format)
   */
  getSeamImageUrl(width: number, height: number, fillColor: string): string;

  /**
   * Check if material supports seam processing
   * 
   * Determines whether a given material has the required properties
   * for seam filler processing.
   * 
   * @param material - Material object to check
   * @returns True if material supports seam filling, false otherwise
   */
  isSeamSupportedMaterial(material: SeamSupportedMaterial | null | undefined): boolean;

  /**
   * Generate a seamed image for the given material configuration
   * 
   * Main processing function that generates a seamed version of the texture
   * by calculating the aspect ratio and calling the seam filler API.
   * 
   * @param config - Seam filler configuration
   * @returns Promise resolving to the URL of the seamed image
   */
  generateSeamedImage(config: SeamFillerConfig): Promise<string>;

  /**
   * Add leading zeros to ensure 6-digit hex color format
   * 
   * @param hexValue - Hex value (string or number)
   * @returns 6-character hex string with leading zeros
   */
  addPreZero(hexValue: string | number): string;
}