/**
 * glTF Exporter Extension for KHR_materials_iridescence
 * 
 * This extension enables export of iridescence material properties to glTF 2.0 format.
 * Iridescence creates thin-film interference effects on material surfaces.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFExporter';
import type { ITextureInfo } from '../glTFExporterTypes';
import type { PBRBaseMaterial } from 'core/Materials/PBR/pbrBaseMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_iridescence";

/**
 * glTF material iridescence extension interface
 * Defines the structure of the KHR_materials_iridescence extension data
 */
export interface IKHRMaterialsIridescence {
    /**
     * The iridescence intensity factor (0.0 - 1.0)
     * Controls the strength of the iridescence effect
     * @default 0.0
     */
    iridescenceFactor?: number;

    /**
     * The index of refraction of the thin-film layer
     * Typical values range from 1.0 to 3.0
     * @default 1.3
     */
    iridescenceIor?: number;

    /**
     * The minimum thickness of the thin-film layer in nanometers
     * @default 100.0
     */
    iridescenceThicknessMinimum?: number;

    /**
     * The maximum thickness of the thin-film layer in nanometers
     * @default 400.0
     */
    iridescenceThicknessMaximum?: number;

    /**
     * Texture that defines the iridescence intensity per pixel
     * Stored in the red (R) channel
     */
    iridescenceTexture?: ITextureInfo;

    /**
     * Texture that defines the thickness of the thin-film layer per pixel
     * Stored in the green (G) channel, values are mapped between min and max thickness
     */
    iridescenceThicknessTexture?: ITextureInfo;
}

/**
 * Extended material interface with KHR_materials_iridescence extension
 */
export interface IMaterialWithIridescence extends IMaterial {
    extensions?: {
        [EXTENSION_NAME]?: IKHRMaterialsIridescence;
        [key: string]: unknown;
    };
}

/**
 * Exporter extension for KHR_materials_iridescence
 * 
 * Handles the serialization of Babylon.js PBR material iridescence properties
 * to the glTF KHR_materials_iridescence extension format.
 */
export declare class KHR_materials_iridescence implements IGLTFExporterExtensionV2 {
    /**
     * Name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Whether this extension is required for the asset to render correctly
     */
    required: boolean;

    /**
     * Reference to the glTF exporter instance
     */
    private readonly _exporter: any;

    /**
     * Tracks whether this extension was actually used during export
     */
    private _wasUsed: boolean;

    /**
     * Creates a new KHR_materials_iridescence extension instance
     * @param exporter - The parent glTF exporter
     */
    constructor(exporter: any);

    /**
     * Indicates whether this extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Dispose of the extension and release resources
     */
    dispose(): void;

    /**
     * Collect additional textures used by iridescence properties
     * 
     * @param context - The export context string
     * @param node - The glTF material node
     * @param babylonMaterial - The Babylon.js source material
     * @returns Array of textures to be exported
     */
    postExportMaterialAdditionalTextures(
        context: string,
        node: IMaterial,
        babylonMaterial: Material
    ): BaseTexture[];

    /**
     * Export iridescence material properties to glTF extension
     * 
     * @param context - The export context string
     * @param node - The glTF material node to extend
     * @param babylonMaterial - The Babylon.js source material
     * @returns Promise that resolves with the extended material node
     */
    postExportMaterialAsync(
        context: string,
        node: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterialWithIridescence>;
}

/**
 * Default export
 */
export default KHR_materials_iridescence;