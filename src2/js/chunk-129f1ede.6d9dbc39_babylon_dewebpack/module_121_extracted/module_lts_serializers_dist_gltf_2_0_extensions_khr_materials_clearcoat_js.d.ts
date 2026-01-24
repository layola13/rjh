/**
 * glTF Exporter Extension: KHR_materials_clearcoat
 * Implements the KHR_materials_clearcoat glTF extension for exporting materials with clearcoat layers.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { _Exporter } from '../glTFExporter';
import type { IMaterial } from '../glTFExporterExtension';
import type { ITextureInfo } from '../glTFExporterExtension';
import type { PBRBaseMaterial } from 'core/Materials/PBR/pbrBaseMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Nullable } from 'core/types';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME: 'KHR_materials_clearcoat';

/**
 * Interface representing the KHR_materials_clearcoat extension data structure
 */
export interface IKHRMaterialsClearcoat {
    /**
     * The clearcoat layer intensity (0.0 = no clearcoat, 1.0 = full clearcoat)
     * @default 0.0
     */
    clearcoatFactor: number;

    /**
     * The clearcoat layer intensity texture (red channel)
     */
    clearcoatTexture?: ITextureInfo;

    /**
     * The clearcoat layer roughness (0.0 = smooth, 1.0 = rough)
     * @default 0.0
     */
    clearcoatRoughnessFactor: number;

    /**
     * The clearcoat layer roughness texture (green channel)
     */
    clearcoatRoughnessTexture?: ITextureInfo;

    /**
     * The clearcoat normal map texture
     */
    clearcoatNormalTexture?: ITextureInfo;

    /**
     * Helper method to check if any textures are present
     * @returns True if any texture properties are defined
     */
    hasTextures(): boolean;
}

/**
 * Exporter extension that handles the KHR_materials_clearcoat glTF extension.
 * This extension adds a clearcoat layer on top of the base material for realistic coating effects.
 */
export declare class KHR_materials_clearcoat implements IGLTFExporterExtensionV2 {
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
     * Internal flag indicating whether the extension was used during export
     */
    private _wasUsed: boolean;

    /**
     * Reference to the glTF exporter instance
     */
    private readonly _exporter: _Exporter;

    /**
     * Creates a new KHR_materials_clearcoat extension instance
     * @param exporter The parent glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Dispose and release resources
     */
    dispose(): void;

    /**
     * Collects additional textures required by the clearcoat extension
     * @param context The export context string
     * @param material The glTF material definition being exported
     * @param babylonMaterial The source Babylon material
     * @returns Array of additional textures to be exported
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Extends the material definition with clearcoat extension data after export
     * @param context The export context string
     * @param material The glTF material definition to extend
     * @param babylonMaterial The source Babylon material
     * @returns Promise that resolves with the extended material definition
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}