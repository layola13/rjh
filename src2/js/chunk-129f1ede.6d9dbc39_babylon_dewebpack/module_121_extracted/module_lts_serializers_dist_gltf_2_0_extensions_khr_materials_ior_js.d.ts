/**
 * glTF Exporter Extension for KHR_materials_ior
 * 
 * This extension exports the index of refraction (IOR) property for PBR materials
 * in glTF 2.0 format according to the KHR_materials_ior specification.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFData';
import type { Material } from 'core/Materials/material';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';

/**
 * Extension name constant
 */
export const EXTENSION_NAME = 'KHR_materials_ior';

/**
 * Default IOR value for common materials
 */
const DEFAULT_IOR = 1.5;

/**
 * Interface for the KHR_materials_ior extension data structure
 */
export interface IKHRMaterialsIor {
  /**
   * The index of refraction (IOR) value
   * Typical values: glass ~1.5, water ~1.33, diamond ~2.42
   */
  ior: number;
}

/**
 * glTF Exporter Extension for KHR_materials_ior
 * 
 * Exports the index of refraction property from Babylon.js PBRMaterial
 * to glTF format using the KHR_materials_ior extension.
 */
export declare class KHR_materials_ior implements IGLTFExporterExtensionV2 {
  /**
   * Name of the extension
   */
  readonly name: string;

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Whether this extension is required for the glTF file
   */
  required: boolean;

  /**
   * Indicates whether the extension was actually used during export
   * @internal
   */
  private _wasUsed: boolean;

  /**
   * Creates a new instance of the KHR_materials_ior extension
   */
  constructor();

  /**
   * Disposes of the extension and releases resources
   */
  dispose(): void;

  /**
   * Gets whether the extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Checks if the extension should be enabled for the given material
   * 
   * The extension is enabled when:
   * - Material is not unlit
   * - Material has a defined index of refraction
   * - Index of refraction is not the default value (1.5)
   * 
   * @param babylonMaterial - The Babylon.js material to check
   * @returns True if the extension should be enabled
   * @internal
   */
  private _isExtensionEnabled(babylonMaterial: Material): boolean;

  /**
   * Post-processes a material after export to add IOR extension data
   * 
   * @param context - The export context
   * @param glTFMaterial - The glTF material being exported
   * @param babylonMaterial - The source Babylon.js material
   * @returns A promise that resolves with the modified glTF material
   */
  postExportMaterialAsync(
    context: string,
    glTFMaterial: IMaterial,
    babylonMaterial: Material
  ): Promise<IMaterial>;
}

/**
 * Factory function type for creating KHR_materials_ior extension instances
 */
export type KHRMaterialsIorFactory = () => KHR_materials_ior;