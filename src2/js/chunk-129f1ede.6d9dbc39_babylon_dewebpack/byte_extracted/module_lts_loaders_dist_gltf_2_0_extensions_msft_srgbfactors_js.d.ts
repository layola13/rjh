/**
 * glTF extension for handling sRGB color space conversions for material factors.
 * This extension ensures that color values are properly converted to linear space
 * when the MSFT_sRGBFactors extension is present in a glTF file.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_sRGBFactors
 */

import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { Nullable } from "core/types";
import { IProperty } from "babylonjs-gltf2interface";
import { IMaterial } from "../glTFLoaderInterfaces";
import { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
const EXTENSION_NAME = "MSFT_sRGBFactors";

/**
 * Interface for the MSFT_sRGBFactors extension data structure
 */
interface IMSFTSRGBFactors {
  // Extension-specific properties would be defined here
  // Currently, this extension uses its presence as a flag
}

/**
 * Loader extension for handling MSFT_sRGBFactors glTF extension.
 * 
 * When this extension is present, material color factors (albedo, reflectivity)
 * are interpreted as sRGB values and converted to linear space for physically
 * correct rendering in a linear workflow.
 * 
 * @remarks
 * This extension only affects materials that don't have textures for the
 * corresponding properties, as texture color space is handled separately.
 */
export class MSFT_sRGBFactors implements IGLTFLoaderExtension {
  /**
   * The name of this extension.
   */
  public readonly name: string = EXTENSION_NAME;

  /**
   * Defines whether this extension is enabled.
   * Set to true if the extension is listed in extensionsUsed in the glTF file.
   */
  public enabled: boolean;

  /**
   * Reference to the parent glTF loader instance.
   */
  private _loader: Nullable<GLTFLoader>;

  /**
   * Creates a new instance of the MSFT_sRGBFactors extension.
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader) {
    this._loader = loader;
    this.enabled = this._loader.isExtensionUsed(EXTENSION_NAME);
  }

  /**
   * Disposes of the extension and releases resources.
   */
  public dispose(): void {
    this._loader = null;
  }

  /**
   * Loads material properties with sRGB to linear space conversion.
   * 
   * When the extension is present, this method converts albedo and reflectivity
   * color factors from sRGB space to linear space for correct rendering.
   * 
   * @param context - The glTF context path for error reporting
   * @param material - The glTF material definition
   * @param babylonMaterial - The Babylon.js material instance to modify
   * @returns A promise that resolves when the material properties are loaded, or null if extension is not present
   * @throws Error if the material is not a PBRMaterial
   */
  public loadMaterialPropertiesAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: Material
  ): Nullable<Promise<void>> {
    return GLTFLoader.LoadExtraAsync<IMSFTSRGBFactors>(
      context,
      material,
      this.name,
      (extensionContext: string, extra: Nullable<IMSFTSRGBFactors>) => {
        if (!extra) {
          return null;
        }

        // Ensure the material is a PBR material
        if (!(babylonMaterial instanceof PBRMaterial)) {
          throw new Error(`${extensionContext}: Material type not supported`);
        }

        // Load base material properties
        const loadPromise = this._loader!.loadMaterialPropertiesAsync(
          context,
          material,
          babylonMaterial
        );

        // Determine if exact sRGB conversions should be used
        const useExactSrgbConversions = babylonMaterial
          .getScene()
          .getEngine().useExactSrgbConversions;

        // Convert albedo color to linear space if no albedo texture is present
        if (!babylonMaterial.albedoTexture) {
          babylonMaterial.albedoColor.toLinearSpaceToRef(
            babylonMaterial.albedoColor,
            useExactSrgbConversions
          );
        }

        // Convert reflectivity color to linear space if no reflectivity texture is present
        if (!babylonMaterial.reflectivityTexture) {
          babylonMaterial.reflectivityColor.toLinearSpaceToRef(
            babylonMaterial.reflectivityColor,
            useExactSrgbConversions
          );
        }

        return loadPromise;
      }
    );
  }
}

/**
 * Register the MSFT_sRGBFactors extension with the glTF loader.
 */
GLTFLoader.RegisterExtension(EXTENSION_NAME, (loader: GLTFLoader) => {
  return new MSFT_sRGBFactors(loader);
});