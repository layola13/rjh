import { Point, Transform, Rectangle, Matrix } from '@pixi/math';
import { Texture, TextureMatrix, Shader, QuadUv, State, ObjectRenderer } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { WRAP_MODES } from '@pixi/constants';
import { TextureCache, premultiplyTintToRgba, correctBlendMode } from '@pixi/utils';

/**
 * A tiling sprite is a fast way of rendering a tiling image
 */
export declare class TilingSprite extends Sprite {
  /**
   * Tile transform
   */
  tileTransform: Transform;

  /**
   * Matrix that is applied to UV to get the coordinates to sample from the texture
   */
  uvMatrix: TextureMatrix;

  /**
   * Plugin name for the renderer
   */
  pluginName: string;

  /**
   * Whether the anchor position affects the texture coordinates
   */
  uvRespectAnchor: boolean;

  /**
   * The width of the tiling sprite
   */
  private _width: number;

  /**
   * The height of the tiling sprite
   */
  private _height: number;

  /**
   * Canvas pattern (used for canvas rendering)
   */
  private _canvasPattern: CanvasPattern | null;

  /**
   * Cached tint value for optimization
   */
  private _cachedTint: number;

  /**
   * @param texture - The texture of the tiling sprite
   * @param width - The width of the tiling sprite
   * @param height - The height of the tiling sprite
   */
  constructor(texture: Texture, width?: number, height?: number);

  /**
   * Changes frame clamping in corresponding textureMatrix
   * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
   */
  get clampMargin(): number;
  set clampMargin(value: number);

  /**
   * The scaling of the image that is being tiled
   */
  get tileScale(): Point;
  set tileScale(value: Point);

  /**
   * The offset of the image that is being tiled
   */
  get tilePosition(): Point;
  set tilePosition(value: Point);

  /**
   * The width of the sprite, setting this will actually modify the scale to achieve the value set
   */
  get width(): number;
  set width(value: number);

  /**
   * The height of the sprite, setting this will actually modify the scale to achieve the value set
   */
  get height(): number;
  set height(value: number);

  /**
   * Called when the texture is updated
   */
  protected _onTextureUpdate(): void;

  /**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */
  protected _render(renderer: any): void;

  /**
   * Updates the bounds of the tiling sprite
   */
  protected _calculateBounds(): void;

  /**
   * Gets the local bounds of the sprite object
   * @param rect - Optional rectangle to store the bounds in
   */
  getLocalBounds(rect?: Rectangle): Rectangle;

  /**
   * Checks whether the point is inside this tiling sprite
   * @param point - The point to check
   */
  containsPoint(point: Point): boolean;

  /**
   * Destroys this sprite and optionally its texture and children
   * @param options - Options parameter or boolean to destroy texture
   */
  destroy(options?: any): void;

  /**
   * Helper function that creates a new tiling sprite based on the source you provide
   * @param source - Source to create texture from
   * @param width - Width of the tiling sprite
   * @param height - Height of the tiling sprite
   */
  static from(source: string | Texture, width?: number, height?: number): TilingSprite;

  /**
   * Helper function that creates a tiling sprite from a frame id
   * @param frameId - The frame id of the texture in the cache
   * @param width - Width of the tiling sprite
   * @param height - Height of the tiling sprite
   */
  static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;

  /**
   * Helper function that creates a tiling sprite from an image url
   * @param imageId - The image url of the texture
   * @param width - Width of the tiling sprite
   * @param height - Height of the tiling sprite
   * @param options - Options for texture loading
   */
  static fromImage(
    imageId: string,
    width?: number,
    height?: number,
    options?: any
  ): TilingSprite;
}

/**
 * WebGL renderer plugin for tiling sprites
 */
export declare class TilingSpriteRenderer extends ObjectRenderer {
  /**
   * The shader used for complex tiling (with clamping)
   */
  shader: Shader;

  /**
   * The shader used for simple tiling (power of two textures)
   */
  simpleShader: Shader;

  /**
   * The quad geometry used for rendering
   */
  quad: QuadUv;

  /**
   * The WebGL state used for rendering
   */
  state: State;

  /**
   * @param renderer - The renderer this plugin works for
   */
  constructor(renderer: any);

  /**
   * Renders the tiling sprite
   * @param tilingSprite - The tiling sprite to render
   */
  render(tilingSprite: TilingSprite): void;
}