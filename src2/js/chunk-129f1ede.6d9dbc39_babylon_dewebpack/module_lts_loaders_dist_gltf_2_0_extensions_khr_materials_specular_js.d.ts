/**
 * KHR_materials_specular extension for glTF loader
 * Implements the KHR_materials_specular extension which adds specular reflection properties to materials
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */

import { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import { ITextureInfo } from '../glTFLoaderInterfaces';
import { GLTFLoader } from '../glTFLoader';
import { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import { Material } from 'core/Materials/material';
import { Color3 } from 'core/Maths/math.color';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * glTF extension name
 */
declare const EXTENSION_NAME = "KHR_materials_specular";

/**
 * Specular color factor (RGB values)
 */
type SpecularColorFactor = [number, number, number];

/**
 * KHR_materials_specular extension data structure
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */
export interface IKHRMaterialsSpecular {
    /**
     * The strength of the specular reflection (F0)
     * @default 1.0
     */
    specularFactor?: number;

    /**
     * The F0 color of the specular reflection (RGB)
     * @default [1.0, 1.0, 1.0]
     */
    specularColorFactor?: SpecularColorFactor;

    /**
     * Texture that defines the strength of the specular reflection (F0)
     * Stored in the alpha channel
     */
    specularTexture?: ITextureInfo;

    /**
     * Texture that defines the F0 color of the specular reflection (RGB channels)
     */
    specularColorTexture?: ITextureInfo;
}

/**
 * Loader extension for KHR_materials_specular
 * This extension adds specular reflection properties to the metallic-roughness material model
 */
export declare class KHR_materials_specular implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: typeof EXTENSION_NAME;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Defines the order of this extension
     * Lower values execute first
     */
    order: number;

    /**
     * Reference to the glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the KHR_materials_specular extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties from the extension
     * @param context The glTF context path for error reporting
     * @param material The glTF material definition
     * @param babylonMaterial The Babylon material to populate
     * @returns A promise that resolves when loading is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void> | null;

    /**
     * Loads specular properties from the extension data
     * @param context The glTF context path for error reporting
     * @param extension The KHR_materials_specular extension data
     * @param babylonMaterial The Babylon PBR material to populate
     * @returns A promise that resolves when all specular properties are loaded
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadSpecularPropertiesAsync(
        context: string,
        extension: IKHRMaterialsSpecular,
        babylonMaterial: Material
    ): Promise<void>;
}

/**
 * glTF material definition (minimal interface for this extension)
 */
interface IMaterial {
    /**
     * The KHR_materials_specular extension data
     */
    extensions?: {
        KHR_materials_specular?: IKHRMaterialsSpecular;
    };
}