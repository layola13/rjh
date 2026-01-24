/**
 * glTF extension for KHR_materials_translucency
 * This extension defines the translucency of a material.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_translucency
 */

import type { Nullable } from "core/types";
import type { Observer } from "core/Misc/observable";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IMaterial } from "../glTFLoaderInterfaces";
import type { ITextureInfo } from "../glTFLoaderInterfaces";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_translucency";

/**
 * Interface for KHR_materials_translucency extension data
 */
export interface IKHRMaterialsTranslucency {
    /**
     * The translucency factor of the material.
     * A value of 0.0 means the material is fully opaque.
     * A value of 1.0 means the material is fully translucent.
     */
    translucencyFactor?: number;

    /**
     * The translucency texture.
     * This texture defines the translucency factor per pixel.
     */
    translucencyTexture?: ITextureInfo;
}

/**
 * glTF loader extension for KHR_materials_translucency
 * Implements support for translucent materials in glTF 2.0
 */
export declare class KHR_materials_translucency implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;

    /**
     * Defines the order of this extension.
     * The order determines when this extension is loaded relative to other extensions.
     */
    order: number;

    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_translucency extension
     * @param loader The glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties from the glTF extension
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads the translucent properties for a material
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon PBR material
     * @param extension The KHR_materials_translucency extension data
     * @returns A promise that resolves when the load is complete
     * @throws Error if the material type is not supported
     */
    private _loadTranslucentPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material,
        extension: IKHRMaterialsTranslucency
    ): Promise<void>;
}