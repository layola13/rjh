/**
 * KHR_materials_ior extension for glTF loader
 * Implements the KHR_materials_ior extension which defines the index of refraction for materials
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { IProperty } from "../glTFLoaderInterfaces";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Interface for the KHR_materials_ior extension data
 */
export interface IKHRMaterialsIor {
    /**
     * The index of refraction (IOR) of the material
     * @default 1.5
     */
    ior?: number;
}

/**
 * Loader extension for KHR_materials_ior
 * This extension defines the index of refraction (IOR) for dielectric materials
 */
export declare class KHR_materials_ior implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name = "KHR_materials_ior";

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines the order of this extension
     */
    order: number;

    /**
     * Default index of refraction value
     */
    private static readonly _DEFAULT_IOR: number;

    /**
     * Reference to the glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the KHR_materials_ior extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes this extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties from the extension
     * @param context The context when loading the asset
     * @param material The glTF material data
     * @param babylonMaterial The Babylon material instance
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void> | null;

    /**
     * Loads the IOR properties from the extension data
     * @param context The context when loading the asset
     * @param extension The extension data
     * @param babylonMaterial The Babylon material instance
     * @returns A promise that resolves when the load is complete
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadIorPropertiesAsync(
        context: string,
        extension: IKHRMaterialsIor,
        babylonMaterial: Material
    ): Promise<void>;
}