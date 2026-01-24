/**
 * KHR_texture_transform extension for glTF 2.0 exporter
 * Handles texture transformation properties (offset, scale, rotation) during glTF export
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform
 */

import type { ITextureInfo } from 'babylonjs-gltf2interface';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { Nullable } from 'core/types';
import type { IGLTFExporterExtensionV2 } from '../glTFExporterExtension';

/**
 * Extension name constant
 */
declare const EXTENSION_NAME = "KHR_texture_transform";

/**
 * Interface representing the KHR_texture_transform extension data
 */
interface IKHRTextureTransform {
    /** UV offset [u, v] */
    offset?: [number, number];
    
    /** UV scale [u, v] */
    scale?: [number, number];
    
    /** Rotation in radians (counter-clockwise around origin) */
    rotation?: number;
    
    /** Texture coordinate set index */
    texCoord?: number;
}

/**
 * Extended texture info with KHR_texture_transform extension
 */
interface ITextureInfoWithTransform extends ITextureInfo {
    extensions?: {
        KHR_texture_transform?: IKHRTextureTransform;
    };
}

/**
 * KHR_texture_transform extension implementation
 * Exports texture transformation properties (offset, scale, rotation) to glTF
 */
export declare class KHR_texture_transform implements IGLTFExporterExtensionV2 {
    /** Extension name */
    readonly name: string;
    
    /** Whether the extension is enabled */
    enabled: boolean;
    
    /** Whether the extension is required in the glTF output */
    required: boolean;
    
    /** Internal flag tracking if the extension was used during export */
    private _wasUsed: boolean;
    
    /**
     * Constructor
     */
    constructor();
    
    /**
     * Dispose of the extension resources
     */
    dispose(): void;
    
    /**
     * Gets whether the extension was used during the export process
     */
    get wasUsed(): boolean;
    
    /**
     * Post-processes a texture after export to add transformation extension data
     * @param context - Export context string for logging
     * @param textureInfo - The glTF texture info object to modify
     * @param babylonTexture - The source Babylon texture with transformation properties
     */
    postExportTexture(
        context: string,
        textureInfo: ITextureInfo,
        babylonTexture: Nullable<BaseTexture>
    ): void;
    
    /**
     * Pre-processes a texture before export to validate transformation support
     * Warns about unsupported transformation scenarios (u/v rotation, non-centered rotation)
     * @param context - Export context string for logging
     * @param babylonTexture - The source Babylon texture to validate
     * @returns Promise resolving to the texture if valid, or null if unsupported
     */
    preExportTextureAsync(
        context: string,
        babylonTexture: BaseTexture
    ): Promise<Nullable<BaseTexture>>;
}