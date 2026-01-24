/**
 * glTF loader extension for KHR_materials_clearcoat
 * This extension adds a clear coating layer to materials, providing a glossy surface effect
 * commonly used for car paint, wood varnish, and similar materials.
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 */

import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { ITextureInfo, IMaterial } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Interface representing the KHR_materials_clearcoat extension data structure
 */
export interface IKHRMaterialsClearcoat {
    /**
     * The clearcoat layer intensity (coverage) of the material.
     * Range: [0.0, 1.0], Default: 0.0
     */
    clearcoatFactor?: number;

    /**
     * The clearcoat layer intensity texture.
     * Red channel contains the clearcoat intensity.
     */
    clearcoatTexture?: ITextureInfo;

    /**
     * The clearcoat layer roughness.
     * Range: [0.0, 1.0], Default: 0.0
     */
    clearcoatRoughnessFactor?: number;

    /**
     * The clearcoat layer roughness texture.
     * Green channel contains the clearcoat roughness.
     */
    clearcoatRoughnessTexture?: ITextureInfo;

    /**
     * The clearcoat normal map texture.
     * A tangent space normal map for the clearcoat layer.
     */
    clearcoatNormalTexture?: IKHRMaterialsClearcoatNormalTextureInfo;
}

/**
 * Extended texture info interface with scale property for normal maps
 */
export interface IKHRMaterialsClearcoatNormalTextureInfo extends ITextureInfo {
    /**
     * The scalar parameter applied to each normal vector of the texture.
     * This value scales the normal vector in X and Y directions.
     * Default: 1.0
     */
    scale?: number;

    /**
     * Indicates that the texture contains non-color data (normal vectors)
     * and should not be color-space converted.
     */
    nonColorData?: boolean;
}

/**
 * Loader extension for the KHR_materials_clearcoat glTF extension.
 * 
 * This extension defines a clear coating that can be layered on top of an existing glTF material definition.
 * A clear coat is a common technique used in Physically-Based Rendering to represent a protective layer
 * applied to a base material.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 */
export declare class KHR_materials_clearcoat implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled.
     * Set to true if the extension is present in the glTF extensionsUsed array.
     */
    enabled: boolean;

    /**
     * Defines the order of this extension.
     * Lower values are processed first. Default: 190
     */
    order: number;

    /**
     * The glTF loader instance.
     * @internal
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_clearcoat extension.
     * @param loader - The glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources.
     * Called when the loader is disposed.
     */
    dispose(): void;

    /**
     * Loads material properties from the glTF extension.
     * This method is called during material loading to apply clearcoat properties.
     * 
     * @param context - The context path for error messages
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon.js material instance to configure
     * @returns A promise that resolves when the properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads the clearcoat-specific properties onto a PBR material.
     * Configures clearcoat intensity, roughness, textures, and normal maps.
     * 
     * @param context - The context path for error messages
     * @param extension - The KHR_materials_clearcoat extension data
     * @param babylonMaterial - The Babylon.js PBR material to configure
     * @returns A promise that resolves when all clearcoat properties are loaded
     * @throws Error if the material is not a PBRMaterial
     * @internal
     */
    private _loadClearCoatPropertiesAsync(
        context: string,
        extension: IKHRMaterialsClearcoat,
        babylonMaterial: Material
    ): Promise<void>;
}