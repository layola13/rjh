/**
 * Customized tile types enumeration
 */
export enum CustomizedTileType {
  /** System predefined tiles */
  System = "system",
  /** Custom user-defined tiles */
  Custom = "custom",
  /** Editable size tiles */
  EditSize = "editsize"
}

/**
 * Parsed customized tile paint data structure
 */
export interface CustomizedTilePaintData {
  /** Type of the customized tile */
  type: CustomizedTileType;
  /** Whether the texture is rectangular (only for Custom type) */
  isRectangle?: boolean;
  /** Material path for custom tiles */
  mPath?: string | null;
  /** Default offset configuration */
  defaultOffset?: unknown;
}

/**
 * Material interface representing a paint material
 */
export interface PaintMaterial {
  /** Material identifier or data */
  [key: string]: unknown;
}

/**
 * Utility functions for handling customized tiles
 */
export interface ICustomizedTileUtil {
  /**
   * Check if the given material is a customized tiles material
   * @param material - The material to check
   * @returns True if the material is customized tiles material
   */
  isCustomizedTilesMaterial(material: PaintMaterial): boolean;

  /**
   * Determine if the texture is rectangular
   * @param material - The material to analyze
   * @returns True if the texture is rectangular or not a custom type
   */
  textureIsRectangle(material: PaintMaterial): boolean;

  /**
   * Get the texture boundary path for custom tiles
   * @param material - The material to extract boundary from
   * @returns The material path string for custom tiles, null otherwise
   */
  getTextureBoundary(material: PaintMaterial): string | null;

  /**
   * Get the default offset configuration for non-custom tiles
   * @param material - The material to extract offset from
   * @returns The default offset value, or null for custom tiles
   */
  getDefaultOffset(material: PaintMaterial): unknown;
}

/**
 * Customized tile utility singleton
 */
export declare const CustomizedTileUtil: Readonly<ICustomizedTileUtil>;

/**
 * HSCore global namespace (external dependency)
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace PaintMaterial {
        function isCustomizedTilesMaterial(material: PaintMaterial): boolean;
        function parseCustomizedTilePaintData(material: PaintMaterial): CustomizedTilePaintData;
      }
    }
  }
}