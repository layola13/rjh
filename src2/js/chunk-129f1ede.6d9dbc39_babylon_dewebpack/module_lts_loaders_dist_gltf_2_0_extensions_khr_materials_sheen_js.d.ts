/**
 * KHR_materials_sheen extension for glTF 2.0 loader
 * Implements support for sheen material properties as defined in the KHR_materials_sheen specification.
 * This extension adds a sheen layer on top of the base material, commonly used for cloth and fabric rendering.
 */

import { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import { IProperty } from '../glTFLoaderInterfaces';
import { GLTFLoader } from '../glTFLoader';
import { Material } from 'core/Materials/material';
import { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Color3 } from 'core/Maths/math.color';

/**
 * Interface representing the KHR_materials_sheen extension data structure
 */
export interface IKHRMaterialsSheen {
    /**
     * The sheen color in linear RGB space (default: [0, 0, 0])
     */
    sheenColorFactor?: [number, number, number];

    /**
     * The sheen color texture
     */
    sheenColorTexture?: ITextureInfo;

    /**
     * The sheen roughness factor (default: 0)
     */
    sheenRoughnessFactor?: number;

    /**
     * The sheen roughness texture
     */
    sheenRoughnessTexture?: ITextureInfo;
}

/**
 * Interface for glTF texture info
 */
export interface ITextureInfo extends IProperty {
    /**
     * The index of the texture
     */
    index: number;

    /**
     * The set index of the texture's TEXCOORD attribute
     */
    texCoord?: number;

    /**
     * Indicates that the texture contains non-color data
     */
    nonColorData?: boolean;
}

/**
 * Loader extension for KHR_materials_sheen
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */
export declare class KHR_materials_sheen implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * The order in which this extension is applied
     */
    readonly order: number;

    /**
     * Whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new KHR_materials_sheen extension instance
     * @param loader - The glTF loader
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases resources
     */
    dispose(): void;

    /**
     * Loads material properties from the extension
     * @param context - The context when loading the asset
     * @param material - The glTF material property
     * @param babylonMaterial - The Babylon material instance
     * @returns A promise that resolves when the load is complete
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads sheen properties from the extension data
     * @param context - The context when loading the asset
     * @param extension - The sheen extension data
     * @param babylonMaterial - The Babylon material instance
     * @returns A promise that resolves when all sheen properties are loaded
     * @throws Error if the material type is not PBRMaterial
     */
    private _loadSheenPropertiesAsync(
        context: string,
        extension: IKHRMaterialsSheen,
        babylonMaterial: Material
    ): Promise<void>;
}

/**
 * Interface for glTF material
 */
export interface IMaterial extends IProperty {
    /**
     * The material's name
     */
    name?: string;

    /**
     * Extensions applied to this material
     */
    extensions?: {
        [key: string]: unknown;
    };
}