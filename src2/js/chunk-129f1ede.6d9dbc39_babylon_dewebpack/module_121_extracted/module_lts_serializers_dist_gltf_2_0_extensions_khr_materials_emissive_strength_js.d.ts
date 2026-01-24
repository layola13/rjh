/**
 * glTF Exporter Extension for KHR_materials_emissive_strength
 * 
 * This extension allows materials to have emissive strength values greater than 1.0,
 * enabling HDR emissive materials in glTF 2.0.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_emissive_strength
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFData';
import type { Material } from 'core/Materials/material';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';

/**
 * Extension name constant
 */
export const EXTENSION_NAME = 'KHR_materials_emissive_strength';

/**
 * Interface for the KHR_materials_emissive_strength extension data
 */
export interface IKHRMaterialsEmissiveStrength {
  /**
   * The emissive strength multiplier.
   * This value is multiplied with the emissiveFactor to get the actual emissive color.
   * @minimum 0.0
   */
  emissiveStrength: number;
}

/**
 * glTF Exporter Extension for KHR_materials_emissive_strength
 * 
 * Exports emissive strength data for materials with HDR emissive values.
 * When a material's emissive color has components greater than 1.0,
 * this extension normalizes the emissiveFactor and stores the scale in emissiveStrength.
 */
export class KHR_materials_emissive_strength implements IGLTFExporterExtensionV2 {
  /**
   * The name of this extension
   */
  public readonly name = EXTENSION_NAME;

  /**
   * Whether this extension is enabled
   */
  public enabled = true;

  /**
   * Whether this extension is required for the glTF to be properly rendered
   */
  public required = false;

  /**
   * Internal flag tracking whether the extension was actually used during export
   */
  private _wasUsed = false;

  /**
   * Gets whether this extension was used during the export process
   */
  public get wasUsed(): boolean {
    return this._wasUsed;
  }

  /**
   * Disposes of extension resources
   */
  public dispose(): void {
    // No resources to dispose
  }

  /**
   * Post-processes a material after export to add emissive strength data if needed
   * 
   * @param context - The glTF export context
   * @param materialNode - The glTF material node being processed
   * @param babylonMaterial - The source Babylon material
   * @returns Promise resolving to the modified material node
   */
  public postExportMaterialAsync(
    context: string,
    materialNode: IMaterial,
    babylonMaterial: Material
  ): Promise<IMaterial> {
    return new Promise((resolve) => {
      // Only process PBR materials
      if (!(babylonMaterial instanceof PBRMaterial)) {
        return resolve(materialNode);
      }

      // Get the emissive color components
      const emissiveColorArray = babylonMaterial.emissiveColor.asArray();
      
      // Find the maximum component value
      const maxEmissiveComponent = Math.max(...emissiveColorArray);

      // If any component exceeds 1.0, we need to use the extension
      if (maxEmissiveComponent > 1.0) {
        this._wasUsed = true;

        // Initialize extensions object if not present
        if (!materialNode.extensions) {
          materialNode.extensions = {};
        }

        // Create extension data
        const extensionData: IKHRMaterialsEmissiveStrength = {
          emissiveStrength: maxEmissiveComponent
        };

        // Normalize the emissive factor by dividing by the strength
        const normalizedEmissiveColor = babylonMaterial.emissiveColor.scale(
          1.0 / extensionData.emissiveStrength
        );

        // Set the normalized emissive factor
        materialNode.emissiveFactor = normalizedEmissiveColor.asArray();

        // Add the extension data
        materialNode.extensions[EXTENSION_NAME] = extensionData;
      }

      return resolve(materialNode);
    });
  }
}

/**
 * Register the extension with the glTF exporter
 */
// This registration would typically happen in the exporter's extension registry
// _Exporter.RegisterExtension(EXTENSION_NAME, () => new KHR_materials_emissive_strength());