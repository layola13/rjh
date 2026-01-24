/**
 * KHR_materials_sheen extension for glTF 2.0 serializer
 * Exports Babylon.js PBR sheen material properties to glTF format
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_sheen
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFExporter';
import type { ITextureInfo } from '../glTFSerializer';
import type { Material } from 'core/Materials/material';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { _Exporter } from '../glTFExporter';

/**
 * glTF extension name
 */
declare const EXTENSION_NAME = "KHR_materials_sheen";

/**
 * Interface representing the KHR_materials_sheen extension data structure
 */
export interface IKHRMaterialsSheen {
    /**
     * The sheen color in linear space (RGB values between 0 and 1)
     */
    sheenColorFactor: [number, number, number];

    /**
     * The sheen roughness factor (value between 0 and 1)
     */
    sheenRoughnessFactor: number;

    /**
     * Texture info for the sheen color
     */
    sheenColorTexture?: ITextureInfo;

    /**
     * Texture info for the sheen roughness
     */
    sheenRoughnessTexture?: ITextureInfo;

    /**
     * Helper method to check if any textures are defined
     */
    hasTextures(): boolean;
}

/**
 * glTF material with extensions
 */
export interface IMaterialWithExtensions extends IMaterial {
    /**
     * Dictionary of extension data
     */
    extensions?: {
        [key: string]: unknown;
        KHR_materials_sheen?: IKHRMaterialsSheen;
    };
}

/**
 * Exporter extension for KHR_materials_sheen
 * Handles export of Babylon.js PBR sheen properties to glTF format
 */
export declare class KHR_materials_sheen implements IGLTFExporterExtensionV2 {
    /**
     * Name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Whether this extension is required
     */
    required: boolean;

    /**
     * Reference to the glTF exporter
     */
    private readonly _exporter: _Exporter;

    /**
     * Tracks whether the extension was actually used during export
     */
    private _wasUsed: boolean;

    /**
     * Creates a new KHR_materials_sheen extension instance
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Cleanup resources (currently no-op)
     */
    dispose(): void;

    /**
     * Collects additional textures needed for sheen material export
     * @param context - Export context identifier
     * @param material - The glTF material definition being exported
     * @param babylonMaterial - The source Babylon.js material
     * @returns Array of textures required by the sheen extension
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Exports sheen material properties to glTF extension format
     * @param context - Export context identifier
     * @param material - The glTF material definition to extend
     * @param babylonMaterial - The source Babylon.js material
     * @returns Promise resolving to the extended material definition
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterialWithExtensions,
        babylonMaterial: Material
    ): Promise<IMaterialWithExtensions>;
}