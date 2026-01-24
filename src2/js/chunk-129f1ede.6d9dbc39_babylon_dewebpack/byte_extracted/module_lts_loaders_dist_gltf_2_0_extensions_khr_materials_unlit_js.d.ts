/**
 * KHR_materials_unlit extension for glTF 2.0 loader
 * Implements the KHR_materials_unlit extension which defines an unlit shading model
 * @see https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 */

import { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import { GLTFLoader } from "../glTFLoader";
import { IMaterial } from "../glTFLoaderInterfaces";
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { Color3 } from "core/Maths/math.color";
import { BaseTexture } from "core/Materials/Textures/baseTexture";

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_materials_unlit";

/**
 * glTF extension that implements the KHR_materials_unlit extension
 * This extension defines an unlit shading model that ignores all lighting
 */
export declare class KHR_materials_unlit implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    readonly name: string;

    /**
     * Defines the order of this extension
     * Lower numbers are processed first
     */
    readonly order: number;

    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the KHR_materials_unlit extension
     * @param loader - The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Dispose of this extension and release resources
     */
    dispose(): void;

    /**
     * Loads material properties from the glTF material definition
     * @param context - The context string for error messages
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon material instance to configure
     * @returns A promise that resolves when the material properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void> | null;

    /**
     * Internal method to load unlit material properties
     * @param context - The context string for error messages
     * @param material - The glTF material definition
     * @param babylonMaterial - The Babylon PBR material instance to configure
     * @returns A promise that resolves when the unlit properties are loaded
     * @throws Error if the material is not a PBRMaterial
     */
    private _loadUnlitPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: PBRMaterial
    ): Promise<void>;
}

/**
 * Interface for glTF material definition with PBR metallic roughness properties
 */
interface IMaterial {
    /**
     * PBR metallic roughness material properties
     */
    pbrMetallicRoughness?: {
        /**
         * Base color factor (RGBA)
         */
        baseColorFactor?: [number, number, number, number];

        /**
         * Base color texture info
         */
        baseColorTexture?: ITextureInfo;
    };

    /**
     * Indicates whether the material is double-sided
     */
    doubleSided?: boolean;
}

/**
 * Interface for glTF texture info
 */
interface ITextureInfo {
    /**
     * The index of the texture
     */
    index: number;

    /**
     * The texture coordinate set index
     */
    texCoord?: number;
}