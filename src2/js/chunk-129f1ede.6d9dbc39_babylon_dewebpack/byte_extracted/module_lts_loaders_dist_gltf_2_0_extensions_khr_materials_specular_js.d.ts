/**
 * glTF extension for KHR_materials_specular
 * 
 * This extension defines the specular reflection properties of materials,
 * allowing for more physically accurate rendering of non-metallic surfaces
 * by controlling the Fresnel reflectance at normal incidence (F0).
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */

import type { Nullable } from 'core/types';
import type { Observable } from 'core/Misc/observable';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { ITextureInfo } from '../glTFLoaderInterfaces';
import type { IMaterial } from '../glTFLoaderInterfaces';
import type { Material } from 'core/Materials/material';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_specular";

/**
 * Interface representing the KHR_materials_specular extension data structure
 * as defined in the glTF specification.
 */
export interface IKHRMaterialsSpecular {
    /**
     * The strength of the specular reflection (F0 scalar).
     * Controls the intensity of specular reflections at normal incidence.
     * @default 1.0
     */
    specularFactor?: number;

    /**
     * The RGB color of the specular reflection (F0 color).
     * Tints the specular reflections at normal incidence.
     * @default [1.0, 1.0, 1.0]
     */
    specularColorFactor?: [number, number, number];

    /**
     * Texture that defines the strength of the specular reflection.
     * Stored in the alpha channel. Will be multiplied by specularFactor.
     */
    specularTexture?: ITextureInfo;

    /**
     * Texture that defines the color of the specular reflection.
     * Stored in RGB channels. Will be multiplied by specularColorFactor.
     */
    specularColorTexture?: ITextureInfo;
}

/**
 * Loader extension for KHR_materials_specular.
 * 
 * This extension enhances PBR materials with configurable specular reflectance
 * properties, enabling more realistic rendering of dielectric (non-metallic) materials.
 * 
 * @remarks
 * - The extension modifies the material's F0 (Fresnel reflectance at 0 degrees)
 * - Only compatible with PBRMaterial instances
 * - Execution order: 190 (loads after base material but before overlays)
 */
export declare class KHR_materials_specular implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;

    /**
     * Defines the order in which this extension is applied.
     * Lower values execute first. Value 190 ensures base material properties
     * are loaded before applying specular enhancements.
     */
    readonly order: number;

    /**
     * Defines whether this extension is enabled.
     * Automatically set based on whether the extension is used in the glTF asset.
     */
    enabled: boolean;

    /**
     * Reference to the parent glTF loader instance.
     * @internal
     */
    private _loader: Nullable<any>;

    /**
     * Creates a new instance of the KHR_materials_specular extension.
     * 
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: any);

    /**
     * Disposes of this extension and releases all associated resources.
     * Called automatically during loader cleanup.
     */
    dispose(): void;

    /**
     * Loads material properties from the glTF extension data.
     * 
     * This method is called during material loading to apply specular properties
     * defined in the KHR_materials_specular extension to the Babylon.js material.
     * 
     * @param context - The glTF context path for error reporting (e.g., "/materials/0")
     * @param material - The source glTF material definition
     * @param babylonMaterial - The target Babylon.js material instance to modify
     * @returns A promise that resolves when all material properties are loaded
     * @throws Error if the material is not a PBRMaterial instance
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads specular-specific properties from the extension data.
     * 
     * Applies the following mappings:
     * - specularFactor → material.metallicF0Factor
     * - specularColorFactor → material.metallicReflectanceColor
     * - specularTexture → material.metallicReflectanceTexture (alpha channel)
     * - specularColorTexture → material.reflectanceTexture (RGB channels)
     * 
     * @param context - The glTF context path for error reporting
     * @param extension - The parsed KHR_materials_specular extension data
     * @param babylonMaterial - The target PBR material to modify
     * @returns A promise that resolves when all textures are loaded
     * @throws Error if babylonMaterial is not a PBRMaterial instance
     * @internal
     */
    private _loadSpecularPropertiesAsync(
        context: string,
        extension: IKHRMaterialsSpecular,
        babylonMaterial: PBRMaterial
    ): Promise<void>;
}