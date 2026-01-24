/**
 * MTL (Material Template Library) file loader for OBJ models
 * Parses MTL files and creates Babylon.js StandardMaterial instances
 */

import { Scene } from '@babylonjs/core/scene';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { AssetContainer } from '@babylonjs/core/assetContainer';

/**
 * Loader for MTL (Material Template Library) files
 * Converts MTL material definitions into Babylon.js StandardMaterial objects
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
   * Parses MTL file content and creates corresponding materials
   * 
   * @param scene - The Babylon.js scene to add materials to
   * @param data - MTL file content as string or ArrayBuffer
   * @param rootUrl - Base URL for resolving relative texture paths
   * @param assetContainer - Optional asset container for material management
   * 
   * @remarks
   * Supported MTL directives:
   * - newmtl: Define new material
   * - Kd: Diffuse color (RGB)
   * - Ka: Ambient color (RGB)
   * - Ks: Specular color (RGB)
   * - Ke: Emissive color (RGB)
   * - Ns: Specular exponent (shininess)
   * - d: Dissolve (alpha/transparency)
   * - map_Ka: Ambient texture map
   * - map_Kd: Diffuse texture map
   * - map_Ks: Specular texture map
   * - map_Ns: Specular highlight map
   * - map_bump: Bump/normal map (supports -bm strength parameter)
   * - map_d: Alpha/opacity map
   */
  parseMTL(
    scene: Scene,
    data: string | ArrayBuffer,
    rootUrl: string,
    assetContainer?: AssetContainer
  ): void;

  /**
   * Internal helper to load and configure textures
   * 
   * @param rootUrl - Base URL for texture path resolution
   * @param texturePath - Relative or absolute texture file path
   * @param scene - Scene to attach texture to
   * @returns Configured Texture instance or null if path is invalid
   * 
   * @internal
   */
  private static _GetTexture(
    rootUrl: string,
    texturePath: string,
    scene: Scene
  ): Texture | null;
}