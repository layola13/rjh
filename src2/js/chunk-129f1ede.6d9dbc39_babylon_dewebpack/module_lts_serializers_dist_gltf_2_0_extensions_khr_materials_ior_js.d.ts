/**
 * KHR_materials_ior extension for glTF 2.0 serializer
 * Handles the export of index of refraction (IOR) material property
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior
 */

import type { IMaterial } from '../glTFExporter';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_ior";

/**
 * glTF extension data structure for KHR_materials_ior
 */
export interface IKHRMaterialsIor {
    /**
     * Index of refraction value
     * @default 1.5
     */
    ior: number;
}

/**
 * Extended material interface with KHR_materials_ior extension
 */
export interface IMaterialWithIorExtension extends IMaterial {
    extensions?: {
        [EXTENSION_NAME]?: IKHRMaterialsIor;
    };
}

/**
 * Exporter extension for KHR_materials_ior
 * Exports index of refraction (IOR) for PBR materials
 */
export declare class KHR_materials_ior {
    /**
     * Name of the extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Whether the extension is enabled
     */
    enabled: boolean;

    /**
     * Whether the extension is required
     */
    required: boolean;

    /**
     * Internal flag tracking if the extension was used during export
     */
    private _wasUsed: boolean;

    /**
     * Creates a new instance of the KHR_materials_ior extension
     */
    constructor();

    /**
     * Gets whether the extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Disposes of the extension resources
     */
    dispose(): void;

    /**
     * Checks if the extension should be enabled for a given material
     * @param babylonMaterial - The Babylon material to check
     * @returns True if the material has a non-default IOR and is not unlit
     */
    private _isExtensionEnabled(babylonMaterial: PBRMaterial): boolean;

    /**
     * Post-processes a material after export to add IOR extension data
     * @param context - The glTF export context
     * @param materialNode - The glTF material node being exported
     * @param babylonMaterial - The source Babylon material
     * @returns Promise that resolves with the modified material node
     */
    postExportMaterialAsync(
        context: unknown,
        materialNode: IMaterialWithIorExtension,
        babylonMaterial: PBRMaterial
    ): Promise<IMaterialWithIorExtension>;
}

/**
 * Default export
 */
export { KHR_materials_ior as default };