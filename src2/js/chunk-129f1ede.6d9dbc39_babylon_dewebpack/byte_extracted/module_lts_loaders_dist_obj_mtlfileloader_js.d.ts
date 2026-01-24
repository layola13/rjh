/**
 * MTL (Material Template Library) file loader for OBJ models
 * Parses MTL files to create Babylon.js StandardMaterial instances
 */

import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { AssetContainer } from '@babylonjs/core/assetContainer';

/**
 * Loader for MTL (Material Template Library) files
 * Used to parse material definitions for OBJ 3D models
 */
export declare class MTLFileLoader {
  /**
   * Collection of parsed materials from the MTL file
   */
  materials: StandardMaterial[];

  /**
   * Controls whether texture Y coordinates should be inverted
   * @default true
   */
  static INVERT_TEXTURE_Y: boolean;

  /**
   * Creates a new MTL file loader instance
   */
  constructor();

  /**
   * Parses MTL file content and creates StandardMaterial instances
   * 
   * @param scene - The Babylon.js scene to add materials to
   * @param data - MTL file content as string or ArrayBuffer
   * @param rootUrl - Root URL for resolving texture paths
   * @param assetContainer - Optional asset container for material management
   * 
   * @remarks
   * Supported MTL properties:
   * - newmtl: Material name
   * - Ka: Ambient color (RGB)
   * - Kd: Diffuse color (RGB)
   * - Ks: Specular color (RGB)
   * - Ke: Emissive color (RGB)
   * - Ns: Specular exponent (shininess)
   * - d: Dissolve (opacity, 0.0-1.0)
   * - map_Ka: Ambient texture map
   * - map_Kd: Diffuse texture map
   * - map_Ks: Specular texture map
   * - map_Ns: Specular highlight texture map
   * - map_bump: Bump/normal map (supports -bm multiplier)
   * - map_d: Opacity/alpha texture map
   */
  parseMTL(
    scene: Scene,
    data: string | ArrayBuffer,
    rootUrl: string,
    assetContainer?: AssetContainer
  ): void;

  /**
   * Creates a Babylon.js Texture from a texture file path
   * 
   * @param rootUrl - Base URL for texture resolution
   * @param textureFileName - Relative or absolute texture file path
   * @param scene - The scene to create the texture in
   * @returns The created Texture instance, or null if textureFileName is empty
   * 
   * @remarks
   * Handles file:// protocol URLs and extracts filename from full paths
   */
  private static _GetTexture(
    rootUrl: string,
    textureFileName: string,
    scene: Scene
  ): Texture | null;
}