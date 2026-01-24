/**
 * glTF extension for handling sRGB color space conversions in materials.
 * This extension applies sRGB to linear space conversions for albedo and reflectivity colors
 * when textures are not present.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_sRGBFactors
 */

import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { ILoader } from '../glTFLoader';
import type { IMaterial } from '../glTFLoaderInterfaces';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { Nullable } from 'core/types';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "MSFT_sRGBFactors";

/**
 * Loader extension for the MSFT_sRGBFactors glTF extension.
 * This extension handles sRGB color space conversion for PBR materials.
 */
export declare class MSFT_sRGBFactors implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;

    /**
     * The glTF loader instance.
     * @internal
     */
    private _loader: Nullable<ILoader>;

    /**
     * Creates a new instance of the MSFT_sRGBFactors extension.
     * @param loader The glTF loader
     */
    constructor(loader: ILoader);

    /**
     * Disposes of the extension and releases resources.
     */
    dispose(): void;

    /**
     * Loads material properties asynchronously with sRGB factor conversion.
     * Converts albedo and reflectivity colors from sRGB to linear space when textures are not present.
     * 
     * @param context The glTF context
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon.js material instance
     * @returns A promise that resolves when the material properties are loaded, or null if the extension is not present
     * @throws Error if the material is not a PBRMaterial
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: PBRMaterial
    ): Nullable<Promise<void>>;
}