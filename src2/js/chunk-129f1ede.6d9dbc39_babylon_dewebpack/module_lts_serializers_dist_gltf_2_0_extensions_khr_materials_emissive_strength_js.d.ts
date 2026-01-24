/**
 * glTF Exporter Extension for KHR_materials_emissive_strength
 * Handles materials with emissive strength values greater than 1.0
 */

import type { IMaterial } from '../glTFExporterInterfaces';
import type { IglTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';

/**
 * Extension data structure for KHR_materials_emissive_strength
 */
interface IKHRMaterialsEmissiveStrength {
  /** The emissive strength multiplier */
  emissiveStrength: number;
}

/**
 * glTF material definition with extensions
 */
interface IGLTFMaterial extends IMaterial {
  /** Material extensions */
  extensions?: {
    [key: string]: unknown;
  };
  /** Emissive color factor [R, G, B] */
  emissiveFactor?: number[];
}

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_emissive_strength";

/**
 * Exporter extension for KHR_materials_emissive_strength
 * 
 * This extension allows materials to have emissive values greater than 1.0
 * by separating the emissive color from its intensity multiplier.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_emissive_strength
 */
export declare class KHR_materials_emissive_strength implements IglTFExporterExtensionV2 {
  /** Extension name */
  readonly name: string;

  /** Whether this extension is enabled */
  enabled: boolean;

  /** Whether this extension is required for the glTF file */
  required: boolean;

  /** Internal flag tracking if the extension was used during export */
  private _wasUsed: boolean;

  /**
   * Creates a new instance of the emissive strength extension
   */
  constructor();

  /**
   * Indicates whether the extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Post-processes a material after export to add emissive strength extension if needed
   * 
   * If the material is a PBR material with emissive color components > 1.0,
   * this method normalizes the emissive color and stores the strength multiplier
   * in the extension data.
   * 
   * @param context - The export context (unused)
   * @param material - The glTF material definition to modify
   * @param babylonMaterial - The source Babylon material
   * @returns Promise resolving to the modified material
   */
  postExportMaterialAsync(
    context: string,
    material: IGLTFMaterial,
    babylonMaterial: Material
  ): Promise<IGLTFMaterial>;

  /**
   * Disposes of extension resources
   */
  dispose(): void;
}