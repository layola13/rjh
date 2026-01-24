/**
 * KHR_texture_basisu extension for glTF loader
 * Provides support for Basis Universal compressed textures in glTF 2.0
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu
 */

import type { GLTFLoader, ITextureInfo, IGLTFLoaderExtension } from './glTFLoader';
import type { ITexture, ISampler, IImage } from './glTFLoaderInterfaces';

/**
 * Extension name constant
 */
export declare const KHR_TEXTURE_BASISU_NAME = "KHR_texture_basisu";

/**
 * Basis Universal texture extension data structure
 */
export interface IKHR_texture_basisu {
  /** Index of the image containing the Basis Universal compressed texture */
  source: number;
}

/**
 * Texture creation options for Basis Universal textures
 */
export interface IBasisTextureOptions {
  /** 
   * Use RGBA fallback if ASTC/BC7 is not available when decoding UASTC format
   * @default false
   */
  useRGBAIfASTCBC7NotAvailableWhenUASTC?: boolean;
}

/**
 * Extended texture info with non-color data flag
 */
export interface IExtendedTextureInfo extends ITextureInfo {
  /** Indicates if the texture contains non-color data (e.g., normal maps, roughness) */
  nonColorData?: boolean;
}

/**
 * Extended ITexture with internal texture info
 */
export interface ITextureWithInfo extends ITexture {
  /** @internal */
  _textureInfo: IExtendedTextureInfo;
}

/**
 * glTF loader extension for KHR_texture_basisu
 * 
 * This extension allows glTF models to reference Basis Universal compressed textures,
 * which provide efficient GPU texture compression with wide platform support.
 * 
 * @example
 *