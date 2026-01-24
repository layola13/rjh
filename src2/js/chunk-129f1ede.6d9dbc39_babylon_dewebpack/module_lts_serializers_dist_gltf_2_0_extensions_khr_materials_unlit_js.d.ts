/**
 * KHR_materials_unlit extension for glTF 2.0 exporter
 * This extension indicates that a material should be rendered without lighting calculations
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */

import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFData';
import type { Material } from 'core/Materials/material';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { StandardMaterial } from 'core/Materials/standardMaterial';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_materials_unlit";

/**
 * Interface for the KHR_materials_unlit extension data
 */
export interface IKHRMaterialsUnlit {}

/**
 * glTF exporter extension for KHR_materials_unlit
 * Marks materials to be rendered without lighting (unlit/emissive only)
 */
export declare class KHR_materials_unlit implements IGLTFExporterExtensionV2 {
    /**
     * Name of the extension
     */
    readonly name: string;

    /**
     * Whether the extension is enabled
     */
    enabled: boolean;

    /**
     * Whether the extension is required for the glTF file
     */
    required: boolean;

    /**
     * Tracks whether this extension was actually used during export
     */
    private _wasUsed: boolean;

    /**
     * Gets whether the extension was used during the export process
     */
    get wasUsed(): boolean;

    /**
     * Creates a new instance of the KHR_materials_unlit extension
     */
    constructor();

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Post-processes a material after export to add unlit extension if applicable
     * @param context - The glTF exporter context
     * @param materialNode - The glTF material node to potentially modify
     * @param babylonMaterial - The source Babylon material being exported
     * @returns Promise that resolves with the modified material node
     */
    postExportMaterialAsync(
        context: string,
        materialNode: IMaterial,
        babylonMaterial: Material
    ): Promise<IMaterial>;
}