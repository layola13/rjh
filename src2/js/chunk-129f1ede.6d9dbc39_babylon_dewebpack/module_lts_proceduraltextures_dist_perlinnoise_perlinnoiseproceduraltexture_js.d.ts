/**
 * Perlin noise procedural texture module
 * Generates procedural textures using Perlin noise algorithm
 */

import { ProceduralTexture } from 'core/Materials/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Nullable } from 'core/types';

/**
 * Procedural texture that generates Perlin noise patterns
 * Used for creating natural-looking random textures like clouds, terrain, etc.
 */
export declare class PerlinNoiseProceduralTexture extends ProceduralTexture {
  /**
   * Current time value used for animation (in milliseconds)
   * @default 0
   */
  time: number;

  /**
   * Scale factor applied to time progression
   * Higher values make the animation faster
   * @default 1
   */
  timeScale: number;

  /**
   * Speed of texture translation/movement
   * Controls how fast the noise pattern shifts
   * @default 1
   */
  translationSpeed: number;

  /**
   * Internal accumulator for current translation offset
   * @internal
   */
  private _currentTranslation: number;

  /**
   * Creates a new Perlin noise procedural texture
   * @param name - Name of the texture
   * @param size - Size of the generated texture (width/height in pixels)
   * @param scene - Scene the texture belongs to (null for last created scene)
   * @param fallbackTexture - Fallback texture if WebGL is not supported
   * @param generateMipMaps - Whether to generate mip maps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Nullable<Scene>,
    fallbackTexture?: ProceduralTexture,
    generateMipMaps?: boolean
  );

  /**
   * Updates shader uniforms with current property values
   * Called internally before rendering to sync CPU-side properties to GPU
   * @internal
   */
  updateShaderUniforms(): void;

  /**
   * Renders the procedural texture
   * @param useCameraPostProcess - Whether to apply camera post-processing effects
   */
  render(useCameraPostProcess?: boolean): void;

  /**
   * Resizes the procedural texture
   * @param width - New width in pixels
   * @param height - New height in pixels
   */
  resize(width: number, height: number): void;

  /**
   * Serializes the texture to a JSON object
   * @returns Serialized texture data including all properties and settings
   */
  serialize(): Record<string, unknown>;

  /**
   * Parses a serialized Perlin noise procedural texture
   * @param parsedTexture - Serialized texture data
   * @param scene - Scene to create the texture in
   * @param rootUrl - Root URL for loading resources
   * @returns Reconstructed PerlinNoiseProceduralTexture instance
   */
  static Parse(
    parsedTexture: Record<string, unknown>,
    scene: Scene,
    rootUrl: string
  ): PerlinNoiseProceduralTexture;
}