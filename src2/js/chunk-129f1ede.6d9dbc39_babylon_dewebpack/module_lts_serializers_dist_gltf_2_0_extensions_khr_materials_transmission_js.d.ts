/**
 * KHR_materials_transmission extension for glTF 2.0 serialization
 * Implements the KHR_materials_transmission specification for exporting transmission materials
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { _Exporter } from '../glTFExporter';
import type { IMaterial } from '../glTFExporterMaterial';
import type { ITextureInfo } from '../glTFExporterInterfaces';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_transmission";

/**
 * Transmission properties for the KHR_materials_transmission extension
 */
export interface IKHRMaterialsTransmission {
    /**
     * The base percentage of light that is transmitted through the surface.
     * Range: [0.0, 1.0]
     */
    transmissionFactor?: number;

    /**
     * A texture that defines the transmission percentage of the surface.
     * Stored in channel R.
     */
    transmissionTexture?: ITextureInfo;

    /**
     * Internal method to check if extension has textures
     * @internal
     */
    hasTextures?(): boolean;
}

/**
 * Exporter extension for KHR_materials_transmission
 * Exports transmission materials to glTF format according to the KHR_materials_transmission specification
 */
export declare class KHR_materials_transmission implements IGLTFExporterExtensionV2 {
    /**
     * Name of this extension
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines whether this extension is required
     */
    required: boolean;

    /**
     * Internal flag indicating if the extension was actually used during export
     * @internal
     */
    private _wasUsed: boolean;

    /**
     * Reference to the glTF exporter
     * @internal
     */
    private _exporter: _Exporter;

    /**
     * Creates a new KHR_materials_transmission extension
     * @param exporter The glTF exporter instance
     */
    constructor(exporter: _Exporter);

    /**
     * Disposes and cleans up extension resources
     */
    dispose(): void;

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Collects additional textures required by this extension for a given material
     * @param context The context when loading the asset
     * @param material The glTF material to export
     * @param babylonMaterial The Babylon material instance
     * @returns Array of textures used by this extension
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Checks if the transmission extension should be enabled for the given material
     * @param material The Babylon PBR material to check
     * @returns True if extension is enabled, false otherwise
     * @internal
     */
    private _isExtensionEnabled(material: PBRMaterial): boolean;

    /**
     * Checks if the material has textures that require this extension
     * @param material The Babylon PBR material to check
     * @returns True if material has transmission textures, false otherwise
     * @internal
     */
    private _hasTexturesExtension(material: PBRMaterial): boolean;

    /**
     * Exports material properties to glTF format after material processing
     * @param context The context when loading the asset
     * @param material The glTF material to export
     * @param babylonMaterial The Babylon material instance
     * @returns Promise that resolves with the updated glTF material
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}