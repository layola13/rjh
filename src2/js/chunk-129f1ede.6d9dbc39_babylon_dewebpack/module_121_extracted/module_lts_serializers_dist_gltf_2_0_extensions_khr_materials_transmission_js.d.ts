/**
 * glTF Exporter extension for KHR_materials_transmission
 * Handles transmission (refraction) properties for physically-based materials
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission
 */

import type { IExportNode } from "../glTFExporter";
import type { IMaterial } from "../glTFExporterInterfaces";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { ITextureInfo } from "../glTFExporterInterfaces";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_transmission";

/**
 * Interface for KHR_materials_transmission extension data
 */
export interface IKHRMaterialsTransmission {
    /**
     * The base percentage of light that is transmitted through the surface.
     * Range: [0.0, 1.0]
     */
    transmissionFactor?: number;

    /**
     * A texture that defines the transmission percentage of the surface.
     * Will be multiplied by transmissionFactor.
     */
    transmissionTexture?: ITextureInfo;

    /**
     * Internal helper to check if extension has textures
     * @internal
     */
    hasTextures?(): boolean;
}

/**
 * glTF Exporter Extension for KHR_materials_transmission
 * 
 * This extension allows materials to simulate light transmission (refraction) through surfaces.
 * Commonly used for glass, water, and other transparent refractive materials.
 */
export declare class KHR_materials_transmission {
    /**
     * Name of the extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Whether this extension is required for the glTF file
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
    private readonly _exporter: IExportNode;

    /**
     * Creates a new KHR_materials_transmission extension instance
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: IExportNode);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Collects additional textures required by this extension
     * @param context - Exporter context (unused)
     * @param material - The exported material data
     * @param babylonMaterial - The Babylon material being exported
     * @returns Array of additional textures (thickness texture if present)
     */
    postExportMaterialAdditionalTextures(
        context: unknown,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Checks if the transmission extension should be enabled for the given material
     * @param material - The PBR material to check
     * @returns True if transmission is enabled and has valid refraction settings
     * @internal
     */
    private _isExtensionEnabled(material: PBRMaterial): boolean;

    /**
     * Checks if the material has transmission-related textures
     * @param material - The PBR material to check
     * @returns True if refractionIntensityTexture is present
     * @internal
     */
    private _hasTexturesExtension(material: PBRMaterial): boolean;

    /**
     * Exports material transmission data asynchronously
     * @param context - Exporter context (unused)
     * @param material - The material data being exported
     * @param babylonMaterial - The Babylon material being exported
     * @returns Promise resolving to the material with transmission extension data
     */
    postExportMaterialAsync(
        context: unknown,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}