import type { ITextureInfo } from 'babylonjs-gltf2interface';
import type { Nullable } from 'core/types';
import type { Texture } from 'core/Materials/Textures/texture';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { IMaterial } from '../glTFExporter';
import type { _Exporter } from '../glTFExporter';

/**
 * Interface for KHR_materials_specular extension data structure
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */
export interface IKHRMaterialsSpecular {
  /**
   * The strength of the specular reflection (0.0 to 1.0)
   * Default value is 1.0
   */
  specularFactor?: number;

  /**
   * A texture that defines the strength of the specular reflection
   */
  specularTexture?: ITextureInfo;

  /**
   * The F0 color of the specular reflection (RGB values)
   * Default value is [1.0, 1.0, 1.0]
   */
  specularColorFactor?: number[];

  /**
   * A texture that defines the F0 color of the specular reflection
   */
  specularColorTexture?: ITextureInfo;

  /**
   * Internal helper method to check if extension has textures
   * @returns True if the extension uses any textures
   */
  hasTextures?: () => boolean;
}

/**
 * KHR_materials_specular extension for glTF 2.0 exporter
 * 
 * This extension defines the specular reflectance of materials,
 * allowing more control over the specular appearance of PBR materials.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */
export declare class KHR_materials_specular {
  /**
   * Name of this extension
   */
  readonly name: string;

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Whether this extension is required for the glTF file to be loaded correctly
   */
  required: boolean;

  /**
   * Reference to the glTF exporter
   */
  private readonly _exporter: _Exporter;

  /**
   * Indicates whether this extension was used during export
   */
  private _wasUsed: boolean;

  /**
   * Creates a new KHR_materials_specular extension
   * @param exporter The glTF exporter instance
   */
  constructor(exporter: _Exporter);

  /**
   * Dispose and release resources
   */
  dispose(): void;

  /**
   * Gets whether this extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Collects additional textures required by this extension for the given material
   * 
   * @param context The glTF material context
   * @param material The exported glTF material
   * @param babylonMaterial The Babylon material to export
   * @returns Array of additional textures required by this extension
   */
  postExportMaterialAdditionalTextures(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Texture[];

  /**
   * Checks if the extension should be enabled for the given material
   * 
   * @param material The Babylon PBR material to check
   * @returns True if the extension should be enabled
   */
  private _isExtensionEnabled(material: PBRMaterial): boolean;

  /**
   * Checks if the material uses any textures that require this extension
   * 
   * @param material The Babylon PBR material to check
   * @returns True if the material uses specular textures
   */
  private _hasTexturesExtension(material: PBRMaterial): boolean;

  /**
   * Exports material properties to the glTF extension
   * 
   * @param context The glTF material context
   * @param material The exported glTF material (modified in place)
   * @param babylonMaterial The Babylon material to export
   * @returns Promise that resolves with the updated glTF material
   */
  postExportMaterialAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Promise<IMaterial>;
}

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_specular";