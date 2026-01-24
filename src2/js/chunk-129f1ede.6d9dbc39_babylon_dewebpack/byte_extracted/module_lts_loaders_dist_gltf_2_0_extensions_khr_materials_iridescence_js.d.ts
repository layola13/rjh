/**
 * glTF extension loader for KHR_materials_iridescence
 * Implements support for iridescence (thin-film interference) material effects in glTF 2.0
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */

import type { Nullable } from "core/types";
import type { Material } from "core/Materials/material";
import type { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { ITextureInfo } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Interface representing the KHR_materials_iridescence extension data structure
 */
export interface IKHRMaterialsIridescence {
    /** 
     * The iridescence intensity factor (0.0 - 1.0)
     * @default 0.0
     */
    iridescenceFactor?: number;

    /** 
     * Texture containing iridescence intensity in the R channel
     */
    iridescenceTexture?: ITextureInfo;

    /** 
     * Index of refraction of the thin-film layer
     * @default 1.3
     */
    iridescenceIor?: number;

    /**
     * @deprecated Legacy spelling, use iridescenceIor instead
     */
    iridescenceIOR?: number;

    /** 
     * Minimum thickness of the thin-film layer in nanometers
     * @default 100
     */
    iridescenceThicknessMinimum?: number;

    /** 
     * Maximum thickness of the thin-film layer in nanometers
     * @default 400
     */
    iridescenceThicknessMaximum?: number;

    /** 
     * Texture containing thickness values in the G channel (nanometers)
     * Maps values between iridescenceThicknessMinimum and iridescenceThicknessMaximum
     */
    iridescenceThicknessTexture?: ITextureInfo;
}

/**
 * glTF loader extension for KHR_materials_iridescence
 * Adds thin-film iridescence effects to PBR materials
 */
export declare class KHR_materials_iridescence implements IGLTFLoaderExtension {
    /** 
     * Extension name as defined in the glTF specification
     */
    readonly name: "KHR_materials_iridescence";

    /** 
     * Loading priority order (lower values load first)
     * @default 195
     */
    readonly order: number;

    /** 
     * Whether this extension is enabled for the current glTF asset
     */
    enabled: boolean;

    /**
     * Reference to the parent glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates an instance of the KHR_materials_iridescence extension
     * @param loader - The parent glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes of extension resources
     */
    dispose(): void;

    /**
     * Loads material properties including iridescence extension data
     * @param context - glTF context path for error reporting
     * @param material - glTF material definition
     * @param babylonMaterial - Target Babylon.js material instance
     * @returns Promise that resolves when all properties are loaded
     */
    loadMaterialPropertiesAsync(
        context: string,
        material: IMaterial,
        babylonMaterial: Material
    ): Promise<void>;

    /**
     * Loads iridescence-specific material properties
     * @param context - glTF context path for error reporting
     * @param extension - The KHR_materials_iridescence extension data
     * @param babylonMaterial - Target PBR material instance
     * @returns Promise that resolves when iridescence properties are loaded
     * @throws Error if material is not a PBRMaterial
     * @internal
     */
    private _loadIridescencePropertiesAsync(
        context: string,
        extension: IKHRMaterialsIridescence,
        babylonMaterial: PBRMaterial
    ): Promise<void>;
}

/**
 * glTF material definition interface
 */
interface IMaterial {
    name?: string;
    extensions?: {
        [key: string]: unknown;
    };
}