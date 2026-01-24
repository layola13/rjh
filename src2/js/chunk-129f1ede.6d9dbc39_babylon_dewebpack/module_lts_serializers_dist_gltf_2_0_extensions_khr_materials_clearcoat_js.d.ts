/**
 * KHR_materials_clearcoat Extension for glTF 2.0 Exporter
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat
 */

import type { ITextureInfo, IMaterial, IMaterialExtension } from '../glTFExporterInterfaces';
import type { _Exporter } from '../glTFExporter';
import type { PBRBaseMaterial } from 'core/Materials/PBR/pbrBaseMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Material } from 'core/Materials/material';
import type { Nullable } from 'core/types';

/**
 * Interface representing the KHR_materials_clearcoat extension data
 */
export interface IKHRMaterialsClearcoat {
  /**
   * The clearcoat layer intensity (0.0 = no clearcoat, 1.0 = full clearcoat)
   * @default 0.0
   */
  clearcoatFactor: number;

  /**
   * The clearcoat layer intensity texture (multiplied with clearcoatFactor)
   */
  clearcoatTexture?: ITextureInfo;

  /**
   * The clearcoat layer roughness (0.0 = smooth, 1.0 = rough)
   * @default 0.0
   */
  clearcoatRoughnessFactor: number;

  /**
   * The clearcoat layer roughness texture (multiplied with clearcoatRoughnessFactor)
   */
  clearcoatRoughnessTexture?: ITextureInfo;

  /**
   * The clearcoat normal map texture
   */
  clearcoatNormalTexture?: ITextureInfo;

  /**
   * Checks if any textures are present in the extension
   * @returns True if at least one texture is defined
   */
  hasTextures(): boolean;
}

/**
 * Exporter extension for KHR_materials_clearcoat
 * Exports clearcoat material properties to glTF 2.0 format
 */
export declare class KHR_materials_clearcoat implements IMaterialExtension {
  /**
   * Name of this extension
   */
  readonly name: 'KHR_materials_clearcoat';

  /**
   * Defines whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Defines whether this extension is required
   */
  required: boolean;

  /**
   * Internal flag tracking whether this extension was actually used during export
   * @internal
   */
  private _wasUsed: boolean;

  /**
   * Reference to the glTF exporter
   * @internal
   */
  private _exporter: _Exporter;

  /**
   * Creates a new KHR_materials_clearcoat extension instance
   * @param exporter The glTF exporter instance
   */
  constructor(exporter: _Exporter);

  /**
   * Dispose and clean up resources
   */
  dispose(): void;

  /**
   * Indicates whether this extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Collects additional textures from the material that need to be exported
   * @param context The export context string
   * @param material The glTF material definition
   * @param babylonMaterial The Babylon material to export
   * @returns Array of textures to export
   */
  postExportMaterialAdditionalTextures(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): BaseTexture[];

  /**
   * Exports the clearcoat material extension data
   * @param context The export context string
   * @param material The glTF material definition to augment
   * @param babylonMaterial The Babylon material to export
   * @returns A promise that resolves with the updated material
   */
  postExportMaterialAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Promise<IMaterial>;
}