import { ProceduralTexture } from "core/Materials/Textures/Procedurals/proceduralTexture";
import { Color3 } from "core/Maths/math.color";
import { Scene } from "core/scene";
import { Texture } from "core/Materials/Textures/texture";
import { Nullable } from "core/types";

/**
 * Options for creating a BrickProceduralTexture
 */
export interface BrickProceduralTextureOptions {
  /**
   * Whether to generate mipmaps for the texture
   * @defaultValue true
   */
  generateMipMaps?: boolean;
  
  /**
   * Sampling mode for the texture
   */
  samplingMode?: number;
}

/**
 * Serialized representation of a BrickProceduralTexture
 */
export interface SerializedBrickProceduralTexture {
  /**
   * The name of the texture
   */
  name: string;
  
  /**
   * The size of the texture
   */
  _size: number;
  
  /**
   * Whether mipmaps are generated
   */
  _generateMipMaps: boolean;
  
  /**
   * The custom type identifier
   */
  customType: string;
  
  /**
   * The number of bricks in height
   */
  numberOfBricksHeight: number;
  
  /**
   * The number of bricks in width
   */
  numberOfBricksWidth: number;
  
  /**
   * The color of the joints between bricks
   */
  jointColor: Color3;
  
  /**
   * The color of the bricks
   */
  brickColor: Color3;
}

/**
 * Class used to generate procedural brick textures
 * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/proceduralTextures
 */
export declare class BrickProceduralTexture extends ProceduralTexture {
  /**
   * Number of bricks in the height direction
   */
  private _numberOfBricksHeight: number;
  
  /**
   * Number of bricks in the width direction
   */
  private _numberOfBricksWidth: number;
  
  /**
   * Color of the joints between bricks
   */
  private _jointColor: Color3;
  
  /**
   * Color of the bricks themselves
   */
  private _brickColor: Color3;

  /**
   * Creates a new BrickProceduralTexture
   * @param name - The name of the texture
   * @param size - The size of the texture (width and height)
   * @param scene - The scene the texture belongs to
   * @param fallbackTexture - Fallback texture if the procedural texture can't be created
   * @param generateMipMaps - Whether to generate mipmaps
   */
  constructor(
    name: string,
    size: number,
    scene: Nullable<Scene>,
    fallbackTexture?: Texture,
    generateMipMaps?: boolean
  );

  /**
   * Updates the shader uniforms with current property values
   */
  updateShaderUniforms(): void;

  /**
   * Gets the number of bricks in the height direction
   */
  get numberOfBricksHeight(): number;

  /**
   * Sets the number of bricks in the height direction
   * @param value - The new number of bricks in height
   */
  set numberOfBricksHeight(value: number);

  /**
   * Gets the number of bricks in the width direction
   */
  get numberOfBricksWidth(): number;

  /**
   * Sets the number of bricks in the width direction
   * @param value - The new number of bricks in width
   */
  set numberOfBricksWidth(value: number);

  /**
   * Gets the color of the joints between bricks
   */
  get jointColor(): Color3;

  /**
   * Sets the color of the joints between bricks
   * @param value - The new joint color
   */
  set jointColor(value: Color3);

  /**
   * Gets the color of the bricks
   */
  get brickColor(): Color3;

  /**
   * Sets the color of the bricks
   * @param value - The new brick color
   */
  set brickColor(value: Color3);

  /**
   * Serializes the texture to a JSON representation
   * @returns The serialized texture data
   */
  serialize(): SerializedBrickProceduralTexture;

  /**
   * Creates a BrickProceduralTexture from parsed data
   * @param parsedTexture - The parsed texture data
   * @param scene - The scene to create the texture in
   * @param rootUrl - The root URL for loading resources
   * @returns The created BrickProceduralTexture instance
   */
  static Parse(
    parsedTexture: SerializedBrickProceduralTexture,
    scene: Scene,
    rootUrl: string
  ): BrickProceduralTexture;
}