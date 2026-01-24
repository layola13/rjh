/**
 * glTF extension for KHR_materials_clearcoat support
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat
 */

import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";
import type { ITextureInfo, IMaterial } from "../glTFLoaderInterfaces";

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME: "KHR_materials_clearcoat";

/**
 * glTF texture info with scale property for normal maps
 */
export interface IKHRMaterialsClearcoatNormalTextureInfo extends ITextureInfo {
    /**
     * The scalar parameter applied to each normal vector of the texture
     */
    scale?: number;
    
    /**
     * Indicates that the texture contains non-color data
     */
    nonColorData?: boolean;
}

/**
 * Clearcoat material extension properties
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat
 */
export interface IKHRMaterialsClearcoat {
    /**
     * The clearcoat layer intensity (range: 0.0-1.0)
     */
    clearcoatFactor?: number;
    
    /**
     * The clearcoat layer intensity texture
     */
    clearcoatTexture?: ITextureInfo;
    
    /**
     * The clearcoat layer roughness (range: 0.0-1.0)
     */
    clearcoatRoughnessFactor?: number;
    
    /**
     * The clearcoat layer roughness texture
     */
    clearcoatRoughnessTexture?: ITextureInfo;
    
    /**
     * The clearcoat normal map texture
     */
    clearcoatNormalTexture?: IKHRMaterialsClearcoatNormalTextureInfo;
}

/**
 * Loader extension for KHR_materials_clearcoat
 * Adds a clear coat layer on top of the base material
 */
export declare class KHR_materials_clearcoat implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: "KHR_materials_clearcoat";
    
    /**
     * Defines the order of this extension
     */
    readonly order: 190;
    
    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;
    
    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;
    
    /**
     * Creates a new KHR_materials_clearcoat extension
     * @param loader The glTF loader
     */
    constructor(loader: GLTFLoader);
    
    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;
    
    /**
     * Loads material properties from the extension
     * @param context The context path for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon material instance
     * @returns Promise that resolves when the material properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;
    
    /**
     * Loads clearcoat properties and applies them to the PBR material
     * @param context The context path for error reporting
     * @param extension The clearcoat extension data
     * @param babylonMaterial The Babylon PBR material instance
     * @returns Promise that resolves when clearcoat properties are loaded
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadClearCoatPropertiesAsync(
        context: string,
        extension: IKHRMaterialsClearcoat,
        babylonMaterial: Material
    ): Promise<void>;
}