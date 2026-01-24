/**
 * KHR_materials_emissive_strength extension for glTF 2.0
 * Specification: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { IKHRMaterialsEmissiveStrength } from "../glTFExtensions";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_emissive_strength";

/**
 * Interface for the KHR_materials_emissive_strength extension data
 */
export interface IKHRMaterialsEmissiveStrength {
  /**
   * The emissive strength multiplier
   */
  emissiveStrength: number;
}

/**
 * Loader extension for KHR_materials_emissive_strength
 * This extension allows for scaling the emissive color by a strength factor
 */
export declare class KHR_materials_emissive_strength implements IGLTFLoaderExtension {
  /**
   * The name of this extension
   */
  readonly name: string;

  /**
   * Defines whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Defines the order of this extension
   */
  order: number;

  /**
   * Reference to the glTF loader
   */
  private _loader: Nullable<GLTFLoader>;

  /**
   * Creates a new instance of the KHR_materials_emissive_strength extension
   * @param loader The glTF loader
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes the extension and releases resources
   */
  dispose(): void;

  /**
   * Loads material properties from the extension
   * @param context The context when loading the asset
   * @param material The glTF material property
   * @param babylonMaterial The Babylon material
   * @returns A promise that resolves when the load is complete
   */
  loadMaterialPropertiesAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Promise<void>;

  /**
   * Applies the emissive strength properties to the material
   * @param context The context when loading the asset
   * @param extension The extension data
   * @param babylonMaterial The Babylon material
   * @throws Error if the material type is not supported
   */
  private _loadEmissiveProperties(
    context: string,
    extension: IKHRMaterialsEmissiveStrength,
    babylonMaterial: Material
  ): void;
}