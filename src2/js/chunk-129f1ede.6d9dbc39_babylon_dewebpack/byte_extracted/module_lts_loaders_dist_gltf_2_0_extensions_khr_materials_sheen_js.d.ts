/**
 * glTF extension for KHR_materials_sheen
 * Adds sheen material properties to PBR materials for cloth-like surfaces
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */

import type { Nullable } from "core/types";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { Material } from "core/Materials/material";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { ITextureInfo } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { IProperty } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Interface for KHR_materials_sheen extension data
 */
export interface IKHRMaterialsSheen {
    /**
     * The sheen color in linear space (RGB)
     */
    sheenColorFactor?: [number, number, number];
    
    /**
     * The sheen color texture
     */
    sheenColorTexture?: ITextureInfo;
    
    /**
     * The sheen roughness factor (0.0 - 1.0)
     */
    sheenRoughnessFactor?: number;
    
    /**
     * The sheen roughness texture
     */
    sheenRoughnessTexture?: ITextureInfo;
}

/**
 * glTF loader extension for KHR_materials_sheen
 * Enables sheen effect on PBR materials for simulating cloth and fabric surfaces
 */
export declare class KHR_materials_sheen implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;
    
    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;
    
    /**
     * Defines the order of this extension
     * Lower values are processed first
     */
    order: number;
    
    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;
    
    /**
     * Creates a new KHR_materials_sheen extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;
    
    /**
     * Loads material properties from the extension
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material instance
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IProperty,
        babylonMaterial: Material
    ): Promise<void>;
    
    /**
     * Loads sheen-specific properties and applies them to the material
     * @param context The context when loading the asset
     * @param extension The KHR_materials_sheen extension data
     * @param babylonMaterial The Babylon PBR material instance
     * @returns A promise that resolves when sheen properties are loaded
     * @internal
     */
    private _loadSheenPropertiesAsync(
        context: string,
        extension: IKHRMaterialsSheen,
        babylonMaterial: PBRMaterial
    ): Promise<void>;
}