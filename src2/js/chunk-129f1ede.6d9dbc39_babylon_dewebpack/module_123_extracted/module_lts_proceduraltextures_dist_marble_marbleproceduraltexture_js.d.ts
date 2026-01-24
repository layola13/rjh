import { ProceduralTexture } from 'core/Materials/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { Engine } from 'core/Engines/engine';

/**
 * Marble procedural texture class for generating realistic marble patterns
 * Extends ProceduralTexture to create dynamic marble textures using shader-based generation
 */
export declare class MarbleProceduralTexture extends ProceduralTexture {
  /**
   * Internal storage for the number of tiles in the height direction
   * @internal
   */
  private _numberOfTilesHeight: number;

  /**
   * Internal storage for the number of tiles in the width direction
   * @internal
   */
  private _numberOfTilesWidth: number;

  /**
   * Internal storage for the amplitude of the marble pattern
   * Controls the intensity of the marble veining effect
   * @internal
   */
  private _amplitude: number;

  /**
   * Internal storage for the color of the joints between marble tiles
   * @internal
   */
  private _jointColor: Color3;

  /**
   * Creates a new MarbleProceduralTexture instance
   * @param name - The name of the texture
   * @param size - The size of the texture (width and height)
   * @param scene - The scene the texture belongs to
   * @param fallbackTexture - Optional fallback texture if generation fails
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
   * Gets the number of tiles in the height direction
   * @returns The number of tiles vertically
   */
  get numberOfTilesHeight(): number;

  /**
   * Sets the number of tiles in the height direction
   * Automatically updates shader uniforms when changed
   * @param value - The new number of tiles vertically
   */
  set numberOfTilesHeight(value: number);

  /**
   * Gets the number of tiles in the width direction
   * @returns The number of tiles horizontally
   */
  get numberOfTilesWidth(): number;

  /**
   * Sets the number of tiles in the width direction
   * Automatically updates shader uniforms when changed
   * @param value - The new number of tiles horizontally
   */
  set numberOfTilesWidth(value: number);

  /**
   * Gets the amplitude of the marble pattern
   * Higher values create more pronounced veining
   * @returns The current amplitude value
   */
  get amplitude(): number;

  /**
   * Sets the amplitude of the marble pattern
   * Automatically updates shader uniforms when changed
   * @param value - The new amplitude value
   */
  set amplitude(value: number);

  /**
   * Gets the color of the joints between marble tiles
   * @returns The current joint color
   */
  get jointColor(): Color3;

  /**
   * Sets the color of the joints between marble tiles
   * Automatically updates shader uniforms when changed
   * @param value - The new joint color
   */
  set jointColor(value: Color3);

  /**
   * Updates all shader uniforms with current property values
   * Called automatically when properties change
   * @internal
   */
  updateShaderUniforms(): void;

  /**
   * Serializes the texture to a JSON object
   * @returns A serialized representation of the texture including all properties
   */
  serialize(): object;

  /**
   * Parses a serialized MarbleProceduralTexture and recreates the instance
   * @param parsedTexture - The serialized texture data
   * @param scene - The scene to create the texture in
   * @param rootUrl - The root URL for loading resources
   * @returns A new MarbleProceduralTexture instance
   */
  static Parse(
    parsedTexture: unknown,
    scene: Scene,
    rootUrl: string
  ): MarbleProceduralTexture;
}