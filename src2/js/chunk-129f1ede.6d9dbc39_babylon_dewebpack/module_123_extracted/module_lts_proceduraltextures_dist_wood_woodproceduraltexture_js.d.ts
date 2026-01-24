import { ProceduralTexture } from 'core/Textures/Procedurals/proceduralTexture';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Nullable } from 'core/types';
import { Engine } from 'core/Engines/engine';

/**
 * Class used to generate wood procedural textures
 * This texture uses a shader to simulate realistic wood grain patterns
 */
export declare class WoodProceduralTexture extends ProceduralTexture {
  /**
   * Internal amplitude scale value for wood grain intensity
   * @internal
   */
  private _ampScale: number;

  /**
   * Internal wood base color value
   * @internal
   */
  private _woodColor: Color3;

  /**
   * Gets or sets the amplitude scale of the wood grain pattern
   * Controls the intensity and depth of the wood grain effect
   * @defaultValue 100
   */
  ampScale: number;

  /**
   * Gets or sets the base color of the wood texture
   * Typically a brown tone representing the wood species
   * @defaultValue Color3(0.32, 0.17, 0.09)
   */
  woodColor: Color3;

  /**
   * Creates a new WoodProceduralTexture
   * @param name - Defines the name of the texture
   * @param size - Defines the size of the texture (width and height)
   * @param scene - Defines the scene the texture belongs to
   * @param fallbackTexture - Defines the fallback texture to use if the procedural texture can't be rendered
   * @param generateMipMaps - Defines whether to generate mipmaps for the texture
   */
  constructor(
    name: string,
    size: number,
    scene: Nullable<Scene>,
    fallbackTexture?: ProceduralTexture,
    generateMipMaps?: boolean
  );

  /**
   * Updates the shader uniforms with current property values
   * Called internally when ampScale or woodColor properties change
   * @internal
   */
  updateShaderUniforms(): void;

  /**
   * Serializes this wood procedural texture to a JSON representation
   * @returns The serialized texture object
   */
  serialize(): any;

  /**
   * Creates a WoodProceduralTexture from parsed data
   * @param parsedTexture - Defines the parsed texture data
   * @param scene - Defines the scene the texture belongs to
   * @param rootUrl - Defines the root URL for relative paths
   * @returns The newly created WoodProceduralTexture
   */
  static Parse(
    parsedTexture: any,
    scene: Scene,
    rootUrl: string
  ): WoodProceduralTexture;
}