/**
 * KHR_texture_basisu Extension for glTF 2.0 Loader
 * 
 * This extension enables loading of Basis Universal compressed textures in glTF assets.
 * Basis Universal is a "supercompressed" GPU texture compression system that outputs
 * a highly compressed intermediate file format (.basis) that can be quickly transcoded
 * to a wide variety of GPU compressed texture formats.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu
 */

import type { GLTFLoader, ITexture, ISampler, IImage, ITextureInfo } from '../glTFLoader';
import type { IGLTFLoaderExtension } from '../glTFLoaderExtension';
import type { Nullable } from 'babylonjs';

/**
 * Extension name constant
 */
export const EXTENSION_NAME = 'KHR_texture_basisu';

/**
 * Interface for the KHR_texture_basisu extension data
 */
interface IKHRTextureBasisU {
    /**
     * The index of the image which contains the Basis Universal compressed texture
     */
    source: number;
}

/**
 * Options for creating Basis Universal textures
 */
interface IBasisTextureOptions {
    /**
     * Whether to use RGBA format if ASTC/BC7 is not available when transcoding UASTC
     */
    useRGBAIfASTCBC7NotAvailableWhenUASTC?: boolean;
}

/**
 * KHR_texture_basisu Extension
 * 
 * Loader extension for handling Basis Universal compressed textures in glTF files.
 * This extension allows glTF assets to reference .basis texture files which provide
 * superior compression compared to traditional formats like PNG or JPEG.
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu
 */
export class KHR_texture_basisu implements IGLTFLoaderExtension {
    /**
     * The name of this extension
     */
    public readonly name: string = EXTENSION_NAME;

    /**
     * Whether this extension is enabled
     */
    public enabled: boolean;

    /**
     * Reference to the glTF loader
     */
    private _loader: Nullable<GLTFLoader>;

    /**
     * Creates a new instance of the KHR_texture_basisu extension
     * @param loader The glTF loader instance
     */
    constructor(loader: GLTFLoader) {
        this._loader = loader;
        this.enabled = loader.isExtensionUsed(EXTENSION_NAME);
    }

    /**
     * Disposes of this extension and releases resources
     */
    public dispose(): void {
        this._loader = null;
    }

    /**
     * Loads a texture using the Basis Universal extension
     * 
     * @param context The context path for error reporting
     * @param texture The glTF texture definition
     * @param assign Callback to assign the loaded texture
     * @returns Promise that resolves when the texture is loaded
     */
    private _loadTextureAsync(
        context: string,
        texture: ITexture,
        assign: (babylonTexture: any) => void
    ): Promise<void> {
        return GLTFLoader.LoadExtensionAsync<IKHRTextureBasisU>(
            context,
            texture,
            this.name,
            (extensionContext: string, extension: IKHRTextureBasisU) => {
                // Get the sampler, or use default if not specified
                const sampler: ISampler = texture.sampler == null
                    ? GLTFLoader.DefaultSampler
                    : this._loader!.gltf.samplers![texture.sampler];

                // Get the image source from the extension data
                const image: IImage = this._loader!.gltf.images![extension.source];

                // Determine texture options based on whether this is color or non-color data
                const textureOptions: IBasisTextureOptions | undefined = 
                    texture._textureInfo?.nonColorData
                        ? { useRGBAIfASTCBC7NotAvailableWhenUASTC: true }
                        : undefined;

                // Whether to use sRGB color space (true for color data, false for non-color data)
                const useSRGBBuffer: boolean = !texture._textureInfo?.nonColorData;

                // Create and load the texture
                return this._loader!._createTextureAsync(
                    context,
                    sampler,
                    image,
                    assign,
                    textureOptions,
                    useSRGBBuffer
                );
            }
        );
    }
}

/**
 * Register the KHR_texture_basisu extension with the glTF loader
 */
GLTFLoader.RegisterExtension(EXTENSION_NAME, (loader: GLTFLoader) => {
    return new KHR_texture_basisu(loader);
});