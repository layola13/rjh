/**
 * glTF Exporter extension for KHR_materials_sheen
 * Exports PBR material sheen properties to glTF 2.0 format
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */

import type { IExportMaterialAdditionalTextures, IExportMaterialAsync, IGLTFExporterExtension } from '../glTFExporterExtension';
import type { IMaterial } from '../glTFExporter';
import type { PBRMaterial } from 'core/Materials/PBR/pbrMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Nullable } from 'core/types';

/** Extension name constant */
export const KHR_MATERIALS_SHEEN_NAME = 'KHR_materials_sheen';

/**
 * glTF material sheen color texture info
 */
export interface IKHRMaterialsSheenColorTextureInfo {
    /** Texture index */
    index: number;
    /** Texture coordinate set */
    texCoord?: number;
}

/**
 * glTF material sheen roughness texture info
 */
export interface IKHRMaterialsSheenRoughnessTextureInfo {
    /** Texture index */
    index: number;
    /** Texture coordinate set */
    texCoord?: number;
}

/**
 * KHR_materials_sheen extension data
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */
export interface IKHRMaterialsSheen {
    /** 
     * The sheen color in linear space
     * Default: [0.0, 0.0, 0.0]
     */
    sheenColorFactor: [number, number, number];
    
    /** 
     * The sheen roughness
     * Default: 0.0
     */
    sheenRoughnessFactor: number;
    
    /** 
     * The sheen color (RGB) texture
     */
    sheenColorTexture?: IKHRMaterialsSheenColorTextureInfo;
    
    /** 
     * The sheen roughness (Alpha) texture
     */
    sheenRoughnessTexture?: IKHRMaterialsSheenRoughnessTextureInfo;
}

/**
 * glTF material with extensions
 */
export interface IMaterialWithExtensions extends IMaterial {
    /** Material extensions */
    extensions?: {
        [KHR_MATERIALS_SHEEN_NAME]?: IKHRMaterialsSheen;
        [key: string]: unknown;
    };
}

/**
 * glTF Exporter interface
 */
export interface IGLTFExporter {
    /** Material exporter instance */
    _glTFMaterialExporter: {
        /**
         * Get texture info for a given texture
         * @param texture - The texture to export
         * @returns Texture info or null
         */
        _getTextureInfo(texture: BaseTexture): Nullable<IKHRMaterialsSheenColorTextureInfo | IKHRMaterialsSheenRoughnessTextureInfo>;
    };
}

/**
 * Exporter with extension registration
 */
export interface IExporterWithRegistration {
    /**
     * Register a glTF exporter extension
     * @param name - Extension name
     * @param factory - Factory function to create extension instance
     */
    RegisterExtension(
        name: string,
        factory: (exporter: IGLTFExporter) => IGLTFExporterExtension
    ): void;
}

/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1688)
 * KHR_materials_sheen extension for glTF 2.0 exporter
 * Adds support for exporting sheen properties from Babylon.js PBR materials
 */
export declare class KHR_materials_sheen implements IGLTFExporterExtension {
    /** Extension name */
    readonly name: string;
    
    /** Whether this extension is enabled */
    enabled: boolean;
    
    /** Whether this extension is required */
    required: boolean;
    
    /** Internal flag tracking if extension was used */
    private _wasUsed: boolean;
    
    /** Reference to the glTF exporter */
    private _exporter: IGLTFExporter;
    
    /**
     * Creates a new KHR_materials_sheen extension
     * @param exporter - The glTF exporter instance
     */
    constructor(exporter: IGLTFExporter);
    
    /**
     * Dispose of the extension
     */
    dispose(): void;
    
    /**
     * Whether the extension was used during export
     */
    get wasUsed(): boolean;
    
    /**
     * Collect additional textures used by sheen
     * @param context - Export context identifier
     * @param material - glTF material definition
     * @param babylonMaterial - Babylon material instance
     * @returns Array of additional textures to export
     */
    postExportMaterialAdditionalTextures(
        context: string,
        material: IMaterial,
        babylonMaterial: unknown
    ): BaseTexture[];
    
    /**
     * Export sheen material properties
     * @param context - Export context identifier
     * @param material - glTF material definition to augment
     * @param babylonMaterial - Babylon material instance
     * @returns Promise resolving to the modified material
     */
    postExportMaterialAsync(
        context: string,
        material: IMaterialWithExtensions,
        babylonMaterial: unknown
    ): Promise<IMaterialWithExtensions>;
}

/**
 * Type guard to check if material is a PBR material with sheen
 * @param material - Material to check
 * @returns True if material is PBRMaterial
 */
declare function isPBRMaterial(material: unknown): material is PBRMaterial;

/**
 * Register the KHR_materials_sheen extension with the exporter
 */
declare const _registerExtension: void;

export { KHR_materials_sheen };