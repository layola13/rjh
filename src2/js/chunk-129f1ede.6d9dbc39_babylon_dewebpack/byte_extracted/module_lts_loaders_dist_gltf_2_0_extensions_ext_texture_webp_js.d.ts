/**
 * EXT_texture_webp extension for glTF 2.0
 * Enables loading WebP format textures in glTF assets
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_texture_webp
 */

import { GLTFLoader, ITextureInfo, ITexture, ISampler, IImage } from "./glTFLoader";
import { BaseTexture } from "@babylonjs/core";

/**
 * Extension name constant
 */
export declare const EXT_TEXTURE_WEBP_NAME = "EXT_texture_webp";

/**
 * WebP texture source definition
 */
export interface IEXTTextureWebP {
  /**
   * Index of the image in the glTF images array that contains the WebP data
   */
  source: number;
}

/**
 * glTF Extension: EXT_texture_webp
 * 
 * This extension adds the ability to use WebP images as textures in glTF assets.
 * WebP provides superior compression compared to PNG and JPEG formats.
 * 
 * @remarks
 * When this extension is present in a texture, the loader should prioritize
 * loading the WebP source over the fallback texture source.
 */
export declare class EXT_texture_webp {
  /**
   * The name of this extension
   */
  readonly name: string;

  /**
   * Indicates whether this extension is enabled
   * Set to true if the extension is listed in extensionsUsed
   */
  enabled: boolean;

  /**
   * Reference to the parent glTF loader
   */
  private _loader: GLTFLoader | null;

  /**
   * Creates an instance of the EXT_texture_webp extension
   * @param loader - The parent glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes the extension and releases resources
   */
  dispose(): void;

  /**
   * Loads a texture with WebP format support
   * 
   * @param context - The context path for error reporting (e.g., "/textures/0")
   * @param texture - The glTF texture definition
   * @param assign - Callback to assign the loaded Babylon.js texture
   * @returns Promise that resolves when the texture is loaded
   * 
   * @remarks
   * This method:
   * 1. Loads the extension data containing the WebP source index
   * 2. Retrieves the sampler settings (or uses default)
   * 3. Gets the WebP image data from the images array
   * 4. Creates a Babylon.js texture with appropriate color space handling
   */
  private _loadTextureAsync(
    context: string,
    texture: ITexture,
    assign: (babylonTexture: BaseTexture) => void
  ): Promise<void>;
}

/**
 * Module augmentation for glTF loader extension registration
 */
declare module "./glTFLoader" {
  interface GLTFLoader {
    /**
     * Registers the EXT_texture_webp extension with the glTF loader
     */
    registerExtension(name: typeof EXT_TEXTURE_WEBP_NAME, factory: (loader: GLTFLoader) => EXT_texture_webp): void;
  }
}