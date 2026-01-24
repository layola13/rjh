/**
 * glTF Exporter Extension for KHR_materials_specular
 * Implements the KHR_materials_specular extension for glTF 2.0 exports
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */

import type { IGLTFExporterExtensionV2 } from "../glTFExporterExtension";
import type { _Exporter } from "../glTFExporter";
import type { IMaterial } from "../glTFData";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { Nullable } from "core/types";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_specular";

/**
 * Interface representing the KHR_materials_specular extension data
 */
export interface IKHRMaterialsSpecular {
    /**
     * The specular strength factor (F0 scalar)
     * @default 1.0
     */
    specularFactor?: number;

    /**
     * The specular strength texture (F0 scalar texture)
     */
    specularTexture?: ITextureInfo;

    /**
     * The specular color factor (F0 RGB color)
     * @default [1.0, 1.0, 1.0]
     */
    specularColorFactor?: [number, number, number];

    /**
     * The specular color texture (F0 RGB color texture)
     */
    specularColorTexture?: ITextureInfo;

    /**
     * Internal helper to check if textures are present
     * @internal
     */
    hasTextures?: () => boolean;
}

/**
 * Texture information interface
 */
export interface ITextureInfo {
    /** Index of the texture in the glTF textures array */
    index: number;
    /** Texture coordinate set index */
    texCoord?: number;
}

/**
 * KHR_materials_specular extension for glTF Exporter
 * 
 * This extension defines the specular reflection properties of a material.
 * It allows control over the Fresnel reflectance at normal incidence (F0)
 * for dielectric materials.
 */
export declare class KHR_materials_specular implements IGLTFExporterExtensionV2 {
    /**
     * Name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines whether this extension is required
     */
    required: boolean;

    /**
     * Internal flag tracking if the extension was used during export
     * @internal
     */
    private _wasUsed: boolean;

    /**
     * Reference to the glTF exporter
     * @internal
     */
    private _exporter: _Exporter;

    /**
     * Creates a new KHR_materials_specular extension instance
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Gets whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Collects additional textures that need to be exported for this material
     * @param context - The material context being processed
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material being exported
     * @returns Array of textures to be exported
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Checks if the extension should be enabled for the given material
     * @param material - The PBR material to check
     * @returns True if the extension is applicable to this material
     * @internal
     */
    private _isExtensionEnabled(material: PBRMaterial): boolean;

    /**
     * Checks if the material has any specular-related textures
     * @param material - The PBR material to check
     * @returns True if specular textures are present
     * @internal
     */
    private _hasTexturesExtension(material: PBRMaterial): boolean;

    /**
     * Processes the material after export and adds extension data if needed
     * @param context - The material context being processed
     * @param material - The glTF material definition to extend
     * @param babylonMaterial - The Babylon.js material being exported
     * @returns Promise that resolves with the modified material
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}