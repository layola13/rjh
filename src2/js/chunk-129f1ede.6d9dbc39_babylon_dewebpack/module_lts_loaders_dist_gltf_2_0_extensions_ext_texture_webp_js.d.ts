/**
 * glTF Extension: EXT_texture_webp
 * Provides support for WebP texture format in glTF 2.0 assets.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_texture_webp
 */

import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { GLTFLoader } from '../glTFLoader';
import type { ITexture, ISampler, IImage } from '../glTFLoaderInterfaces';
import type { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "EXT_texture_webp";

/**
 * Interface for EXT_texture_webp extension data
 */
export interface IEXTTextureWebP {
    /**
     * Index of the WebP image source
     */
    source: number;
}

/**
 * Loader extension for handling WebP textures in glTF assets.
 * This extension allows glTF files to reference WebP images as texture sources,
 * providing better compression than traditional PNG/JPEG formats.
 */
export declare class EXT_texture_webp implements IGLTFLoaderExtension {
    /**
     * The name of this extension.
     */
    readonly name: string;

    /**
     * Defines whether this extension is enabled.
     */
    enabled: boolean;

    /**
     * Reference to the glTF loader instance
     */
    private _loader: GLTFLoader | null;

    /**
     * Creates a new instance of the EXT_texture_webp extension.
     * @param loader - The glTF loader instance
     */
    constructor(loader: GLTFLoader);

    /**
     * Disposes the extension and releases associated resources.
     */
    dispose(): void;

    /**
     * Loads a texture asynchronously using the WebP extension data.
     * @param context - The context string for error reporting
     * @param texture - The glTF texture definition
     * @param assign - Callback function to assign the loaded texture
     * @returns A promise that resolves when the texture is loaded
     */
    _loadTextureAsync(
        context: string,
        texture: ITexture,
        assign: (babylonTexture: BaseTexture) => void
    ): Promise<BaseTexture>;
}