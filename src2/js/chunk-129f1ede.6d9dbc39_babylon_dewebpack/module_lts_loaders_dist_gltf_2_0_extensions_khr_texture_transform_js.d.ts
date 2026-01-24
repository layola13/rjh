/**
 * KHR_texture_transform extension for glTF 2.0
 * Implements texture coordinate transformations including offset, rotation, and scale.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform
 */

import type { Nullable } from "core/types";
import type { Texture } from "core/Materials/Textures/texture";
import type { IGLTFLoaderExtension } from "../glTFLoaderExtension";
import type { ITextureInfo } from "../glTFLoaderInterfaces";
import type { GLTFLoader } from "../glTFLoader";

/**
 * Extension name constant
 */
export declare const EXTENSION_NAME = "KHR_texture_transform";

/**
 * Texture transform data as defined by the KHR_texture_transform extension
 */
export interface IKHRTextureTransform {
  /**
   * The offset of the UV coordinate origin as a factor of the texture dimensions.
   * Default: [0, 0]
   */
  offset?: [number, number];

  /**
   * Rotate the UVs by this many radians counter-clockwise around the origin.
   * Default: 0
   */
  rotation?: number;

  /**
   * The scale factor applied to the components of the UV coordinates.
   * Default: [1, 1]
   */
  scale?: [number, number];

  /**
   * Overrides the textureInfo texCoord value if supplied, and if this value is >= 0.
   */
  texCoord?: number;
}

/**
 * glTF loader extension for KHR_texture_transform
 * Allows textures to be transformed with offset, rotation, and scale
 */
export declare class KHR_texture_transform implements IGLTFLoaderExtension {
  /**
   * The name of this extension
   */
  readonly name: string;

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Reference to the glTF loader
   */
  private _loader: Nullable<GLTFLoader>;

  /**
   * Creates a new instance of the KHR_texture_transform extension
   * @param loader - The glTF loader instance
   */
  constructor(loader: GLTFLoader);

  /**
   * Disposes of the extension and cleans up resources
   */
  dispose(): void;

  /**
   * Loads a texture info with transform applied
   * @param context - The context path for error messages
   * @param textureInfo - The texture info to load
   * @param assign - Callback function to assign the loaded texture
   * @returns Promise that resolves when the texture is loaded
   */
  loadTextureInfoAsync(
    context: string,
    textureInfo: ITextureInfo,
    assign: (babylonTexture: Texture) => void
  ): Promise<void>;
}