/**
 * Material data utility for NC parametric models.
 * Handles conversion and versioning of material data structures.
 */

import { MaterialData } from './material-data-module'; // Adjust import path as needed

/**
 * Legacy material data structure (pre-versioning)
 */
interface LegacyMaterialData {
  seekId?: string;
  colorMode?: string;
  color?: string | number;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTexture?: string;
  isTransparent?: boolean;
  scaleX?: number;
  scaleY?: number;
  paveMethod?: 'stretch' | 'tile' | string;
}

/**
 * Versioned material data structure (V1+)
 */
interface VersionedMaterialData extends LegacyMaterialData {
  version: number;
}

/**
 * Modern material data structure with regions support
 */
interface ModernMaterialData {
  regions: unknown;
  [key: string]: unknown;
}

/**
 * Union type for all material data formats
 */
type AnyMaterialData = LegacyMaterialData | VersionedMaterialData | ModernMaterialData | null | undefined;

/**
 * User-defined material configuration
 */
interface MaterialUserDefined {
  notExtendImageToFitFace?: boolean;
}

/**
 * Material data creation parameters
 */
interface MaterialDataParams {
  seekId?: string;
  colorMode?: string;
  color?: string | number;
  textureURI?: string;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTexture?: string;
  isTransparent?: boolean;
  userDefined?: MaterialUserDefined;
}

/**
 * Material data with tile size properties
 */
interface MaterialDataWithTileSize extends MaterialData {
  tileSize_x?: number;
  tileSize_y?: number;
  initTileSize_x?: number;
  initTileSize_y?: number;
}

/**
 * Utility class for handling material data conversion and versioning.
 * Supports migration from legacy formats to current material data structure.
 */
export declare class NCParametricModelMaterialDataUtil {
  /**
   * Converts material data to the current format, handling version migrations.
   * 
   * @param data - Material data in any supported format (legacy, versioned, or modern)
   * @returns Normalized MaterialData instance
   * 
   * @remarks
   * - Returns empty MaterialData if input is null/undefined
   * - Returns empty MaterialData if input already has 'regions' property (modern format)
   * - Migrates versioned data through appropriate conversion pipeline
   * - Falls back to direct creation for unversioned legacy data
   */
  static toMaterialDataWithVersion(data: AnyMaterialData): MaterialData;

  /**
   * Determines if the material data uses an old/legacy format.
   * 
   * @param data - Material data to check
   * @returns True if data is in legacy format (no 'regions' and no 'version' property)
   * 
   * @remarks
   * Old version criteria:
   * - Data exists (not null/undefined)
   * - Does not have 'regions' property
   * - Does not have 'version' property
   */
  static isOldVersion(data: AnyMaterialData): boolean;

  /**
   * Converts V1 versioned material data to current MaterialData format.
   * 
   * @param data - Versioned material data (V1)
   * @returns Converted MaterialData with applied transformations
   * 
   * @remarks
   * Conversion process:
   * - Extracts core material properties (color, texture, transforms)
   * - Handles 'stretch' pave method by setting userDefined flags
   * - Applies scaleX/scaleY to tile sizes if present
   * - Preserves transparency and normal texture settings
   * 
   * @internal
   */
  private static _toMaterialDataV1(data: VersionedMaterialData): MaterialDataWithTileSize;
}