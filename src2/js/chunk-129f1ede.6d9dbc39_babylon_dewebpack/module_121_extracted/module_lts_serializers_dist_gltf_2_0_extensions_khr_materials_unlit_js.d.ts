/**
 * KHR_materials_unlit glTF extension for exporting unlit materials
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */

import type { IMaterial } from '../glTFExporterExtension';
import type { _Exporter } from '../glTFExporter';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { StandardMaterial } from 'core/Materials/standardMaterial';
import type { Material } from 'core/Materials/material';

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_unlit";

/**
 * glTF extension that exports unlit materials using KHR_materials_unlit
 */
export declare class KHR_materials_unlit {
  /**
   * Name of this extension
   */
  readonly name: string;

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Whether this extension is required
   */
  required: boolean;

  /**
   * Internal flag indicating if the extension was used during export
   */
  private _wasUsed: boolean;

  /**
   * Creates a new instance of the KHR_materials_unlit extension
   */
  constructor();

  /**
   * Gets whether this extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Dispose and release resources
   */
  dispose(): void;

  /**
   * Post-processes a material after export to add unlit extension if needed
   * @param context - The glTF export context
   * @param material - The glTF material definition to modify
   * @param babylonMaterial - The Babylon material being exported
   * @returns Promise that resolves with the modified material
   */
  postExportMaterialAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Promise<IMaterial>;
}

/**
 * Empty extension data object for KHR_materials_unlit
 */
interface IKHRMaterialsUnlit {
  // Empty object - this extension has no properties
}

/**
 * Extended material interface with extensions property
 */
interface IMaterialWithExtensions extends IMaterial {
  extensions?: {
    [key: string]: unknown;
  };
}