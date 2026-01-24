/**
 * KHR_materials_emissive_strength extension for glTF 2.0
 * 
 * This extension allows materials to have emissive strength values greater than 1.0,
 * enabling HDR emissive materials in glTF assets.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_emissive_strength
 */

import type { Nullable } from "core/types";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { Material } from "core/Materials/material";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { IProperty } from "../glTFLoaderInterfaces";
import type { IMaterial } from "../glTFLoaderInterfaces";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_emissive_strength";

/**
 * Interface representing the KHR_materials_emissive_strength extension data
 */
export interface IKHRMaterialsEmissiveStrength {
    /**
     * The emissive strength multiplier. This value is multiplied with the emissive color.
     * Values greater than 1.0 produce HDR emissive materials.
     */
    emissiveStrength?: number;
}

/**
 * Loader extension for KHR_materials_emissive_strength
 * 
 * This extension applies an emissive strength multiplier to materials,
 * allowing for HDR emissive effects by scaling the emissive color.
 */
export declare class KHR_materials_emissive_strength implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * The order in which this extension is applied
     * Lower values are applied first
     */
    readonly order: number;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_emissive_strength extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties asynchronously, including emissive strength
     * @param context The context for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon.js material instance to apply properties to
     * @returns A promise that resolves when the properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Applies emissive strength properties to the Babylon.js material
     * @param context The context for error reporting
     * @param extension The extension data containing emissive strength
     * @param babylonMaterial The Babylon.js material to modify
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadEmissiveProperties(
        context: string,
        extension: IKHRMaterialsEmissiveStrength,
        babylonMaterial: Material
    ): void;
}