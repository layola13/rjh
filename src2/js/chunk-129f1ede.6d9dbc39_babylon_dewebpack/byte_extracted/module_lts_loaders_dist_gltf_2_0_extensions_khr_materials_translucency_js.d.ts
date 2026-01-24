/**
 * KHR_materials_translucency extension for glTF 2.0 loader
 * Implements support for translucent materials with subsurface scattering
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_translucency
 */

import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { IProperty } from "../glTFLoaderInterfaces";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { Nullable } from "core/types";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_translucency";

/**
 * glTF extension data structure for KHR_materials_translucency
 */
export interface IKHRMaterialsTranslucency {
    /**
     * The translucency factor of the material (0.0 = opaque, 1.0 = fully translucent)
     * @default 0.0
     */
    translucencyFactor?: number;

    /**
     * The translucency texture
     * Values are linear and stored in the R channel
     */
    translucencyTexture?: ITextureInfo;
}

/**
 * Texture info interface
 */
export interface ITextureInfo {
    /**
     * The index of the texture
     */
    index: number;

    /**
     * The set index of texture's TEXCOORD attribute
     */
    texCoord?: number;

    /**
     * Indicates that the texture contains non-color data
     */
    nonColorData?: boolean;

    /**
     * Extension data
     */
    extensions?: Record<string, unknown>;
}

/**
 * Loader extension for KHR_materials_translucency
 * Enables translucent materials with subsurface light transmission
 * @order 174
 */
export declare class KHR_materials_translucency implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines the loading order of this extension (174)
     */
    order: number;

    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_materials_translucency extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties with translucency support
     * @param context The glTF context when loading the extension
     * @param material The glTF material data
     * @param babylonMaterial The Babylon material instance to apply properties to
     * @returns A promise that resolves when loading is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Nullable<Promise<void>>;

    /**
     * Internal method to load translucent material properties
     * @param context The glTF context for error messages
     * @param material The glTF material data
     * @param babylonMaterial The Babylon PBR material instance
     * @param extension The KHR_materials_translucency extension data
     * @returns A promise that resolves when translucency properties are loaded
     * @throws Error if material is not a PBRMaterial
     */
    private _loadTranslucentPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material,
        extension: IKHRMaterialsTranslucency
    ): Promise<void>;
}

/**
 * glTF material interface
 */
export interface IMaterial extends IProperty {
    /**
     * The name of the material
     */
    name?: string;

    /**
     * Extension data
     */
    extensions?: Record<string, unknown>;

    /**
     * Extras data
     */
    extras?: unknown;
}