/**
 * glTF Exporter Extension for KHR_texture_transform
 * 
 * This extension allows for transforming texture coordinates including:
 * - Offset: UV coordinate offset
 * - Scale: UV coordinate scale
 * - Rotation: Texture rotation around origin
 * - texCoord: Alternative texture coordinate set index
 * 
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform
 */

import type { Nullable } from "core/types";
import type { Texture } from "core/Materials/Textures/texture";
import type { ITextureInfo } from "../glTFExporterInterfaces";

/**
 * Configuration for texture coordinate transformation
 */
export interface IKHRTextureTransform {
  /**
   * UV coordinate offset [u, v]
   * @default [0, 0]
   */
  offset?: [number, number];

  /**
   * UV coordinate scale [u, v]
   * @default [1, 1]
   */
  scale?: [number, number];

  /**
   * Rotation of texture coordinates in radians (counterclockwise around origin)
   * @default 0
   */
  rotation?: number;

  /**
   * The texture coordinate set index
   * @default 0
   */
  texCoord?: number;
}

/**
 * glTF Exporter Extension implementing KHR_texture_transform
 * 
 * Exports Babylon.js texture transformations (offset, scale, rotation) to glTF format.
 * 
 * Limitations:
 * - Rotation around non-origin centers is not supported
 * - U-axis and V-axis rotations are not supported (only W-axis rotation)
 */
export declare class KHR_texture_transform {
  /**
   * Name of this extension
   */
  readonly name: "KHR_texture_transform";

  /**
   * Whether this extension is enabled
   */
  enabled: boolean;

  /**
   * Whether this extension is required for the glTF file
   */
  required: boolean;

  /**
   * Internal flag tracking if the extension was actually used during export
   */
  private _wasUsed: boolean;

  /**
   * Creates a new KHR_texture_transform extension instance
   */
  constructor();

  /**
   * Indicates whether this extension was used during the export process
   */
  get wasUsed(): boolean;

  /**
   * Disposes resources used by this extension
   */
  dispose(): void;

  /**
   * Post-process exported texture to add transformation data
   * 
   * @param exporterContext - Context string for logging (e.g., material name)
   * @param textureInfo - glTF texture info object to modify
   * @param babylonTexture - Source Babylon.js texture with transformation properties
   * @remarks Adds KHR_texture_transform extension data if any non-default transformations exist
   */
  postExportTexture(
    exporterContext: string,
    textureInfo: ITextureInfo,
    babylonTexture: Texture
  ): void;

  /**
   * Pre-process texture before export to validate transformation support
   * 
   * @param exporterContext - Context string for logging
   * @param babylonTexture - Babylon.js texture to validate
   * @returns Promise resolving to the texture if valid, or null if unsupported transformations detected
   * @throws Error if the texture has no associated scene
   * @remarks Logs warnings for unsupported rotation configurations
   */
  preExportTextureAsync(
    exporterContext: string,
    babylonTexture: Texture
  ): Promise<Nullable<Texture>>;
}