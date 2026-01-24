import { Vector2, TObject, TransferDLayout, TransferDType, ObjectManager } from './core';

/**
 * Represents an instance of a 2D texture with transformation properties.
 * Extends TObject to support serialization and object management.
 * 
 * This class wraps a Texture2D and adds UV transformation capabilities
 * including offset, repeat (tiling), rotation, and center point for transforms.
 */
export declare class Texture2DInstance extends TObject {
  /**
   * The underlying texture resource
   * @private
   */
  private mTexture: Texture2D;

  /**
   * UV offset for texture coordinates (translation)
   * @private
   */
  private mOffset: Vector2;

  /**
   * UV repeat/scale for texture tiling
   * @private
   */
  private mRepeat: Vector2;

  /**
   * Rotation angle in radians for UV transformation
   * @private
   */
  private mRotation: number;

  /**
   * Center point for rotation and scaling transformations
   * @private
   */
  private mCenter: Vector2;

  /**
   * Creates a new Texture2DInstance wrapping the given texture
   * @param texture - The Texture2D to wrap
   */
  constructor(texture: Texture2D);

  /**
   * Whether this texture is a normal map (affects sampling/interpretation)
   */
  get mIsNormalMap(): boolean;
  set mIsNormalMap(value: boolean);

  /**
   * Whether texture data is in linear color space
   */
  get mIsLinearSpace(): boolean;
  set mIsLinearSpace(value: boolean);

  /**
   * Whether texture uses sRGB color space encoding
   */
  get mIsSRGB(): boolean;
  set mIsSRGB(value: boolean);

  /**
   * Whether texture uses RGBM encoding (RGB + multiplier in alpha)
   */
  get mIsRGBM(): boolean;
  set mIsRGBM(value: boolean);

  /**
   * Whether to automatically generate mipmap levels
   */
  get mAutoGenerateMipmaps(): boolean;
  set mAutoGenerateMipmaps(value: boolean);

  /**
   * Intensity/brightness multiplier for the texture
   */
  get mIntensityScale(): number;
  set mIntensityScale(value: number);

  /**
   * File path or URL where texture was loaded from
   */
  get mSourcePath(): string;
  set mSourcePath(value: string);

  /**
   * Raw texture data (pixel buffer)
   */
  get mTextureData(): TextureData;
  set mTextureData(value: TextureData);

  /**
   * Texture wrapping mode for horizontal (U) coordinate
   */
  get mSamplerAddressX(): SamplerAddressMode;
  set mSamplerAddressX(value: SamplerAddressMode);

  /**
   * Texture wrapping mode for vertical (V) coordinate
   */
  get mSamplerAddressY(): SamplerAddressMode;
  set mSamplerAddressY(value: SamplerAddressMode);

  /**
   * Texture filtering mode (point, bilinear, trilinear, etc.)
   */
  get mSamplerFilter(): SamplerFilter;
  set mSamplerFilter(value: SamplerFilter);

  /**
   * Comparison function for depth/shadow textures
   */
  get mSamplerCompareFunc(): CompareFunction;
  set mSamplerCompareFunc(value: CompareFunction);

  /**
   * Gets the underlying GPU texture resource
   * @returns The native texture resource handle
   */
  getTextureResource(): TextureResource;

  /**
   * Updates the texture's pixel data
   * @param data - New texture data to upload
   */
  setTextureData(data: TextureData): void;

  /**
   * Gets the wrapped Texture2D object
   * @returns The underlying Texture2D
   */
  getTexture(): Texture2D;

  /**
   * Replaces the wrapped texture
   * @param texture - New Texture2D to wrap
   */
  setTexture(texture: Texture2D): void;

  /**
   * Gets the UV offset vector
   * @returns Current offset (translation) applied to UVs
   */
  getOffset(): Vector2;

  /**
   * Sets the UV offset by copying from another vector
   * @param offset - New offset to apply
   */
  setOffset(offset: Vector2): void;

  /**
   * Gets the UV repeat/tiling factor
   * @returns Current repeat (scale) applied to UVs
   */
  getRepeat(): Vector2;

  /**
   * Sets the UV repeat by copying from another vector
   * @param repeat - New tiling factor to apply
   */
  setRepeat(repeat: Vector2): void;

  /**
   * Gets the transformation center point
   * @returns Center used for rotation and scaling
   */
  getCenter(): Vector2;

  /**
   * Sets the transformation center by copying from another vector
   * @param center - New center point
   */
  setCenter(center: Vector2): void;

  /**
   * Gets the UV rotation angle
   * @returns Rotation in radians
   */
  getRotation(): number;

  /**
   * Sets the UV rotation angle
   * @param rotation - New rotation in radians
   */
  setRotation(rotation: number): void;

  /**
   * Applies this texture's UV transform to a material
   * @param material - Target material to configure
   */
  setTransformToMaterial(material: Material): void;

  /**
   * Serialization entry point - transfers object state
   * @param transferContext - Serialization context
   */
  Transfer(transferContext: TransferContext): void;

  /**
   * Internal serialization implementation
   * @param transferContext - Serialization context
   * @protected
   */
  protected TransferInternal(transferContext: TransferContext): void;
}

/**
 * Base texture class (referenced by Texture2DInstance)
 */
interface Texture2D {
  mIsNormalMap: boolean;
  mIsLinearSpace: boolean;
  mIsSRGB: boolean;
  mIsRGBM: boolean;
  mAutoGenerateMipmaps: boolean;
  mIntensityScale: number;
  mSourcePath: string;
  mTextureData: TextureData;
  mSamplerAddressX: SamplerAddressMode;
  mSamplerAddressY: SamplerAddressMode;
  mSamplerFilter: SamplerFilter;
  mSamplerCompareFunc: CompareFunction;
  getTextureResource(): TextureResource;
}

/**
 * Material interface supporting UV transform configuration
 */
interface Material {
  setUVTransform?(transform: UVTransform): void;
}

/**
 * UV transformation parameters
 */
interface UVTransform {
  /** UV coordinate offset (translation) */
  offset: Vector2;
  /** UV coordinate scale (tiling) */
  repeat: Vector2;
  /** Rotation angle in radians */
  rotation: number;
  /** Center point for rotation/scale */
  center: Vector2;
}

/**
 * Serialization context for Transfer operations
 */
interface TransferContext {
  TransferInternal<T>(
    descriptor: TransferDescriptor,
    value: T,
    fieldName: string
  ): T;
}

/**
 * Descriptor for field serialization
 */
interface TransferDescriptor {
  layout: TransferDLayout;
  dataType: TransferDType;
  typeString?: string;
}

/**
 * Opaque type for GPU texture resources
 */
type TextureResource = unknown;

/**
 * Opaque type for texture pixel data
 */
type TextureData = unknown;

/**
 * Texture coordinate wrapping modes
 */
type SamplerAddressMode = unknown;

/**
 * Texture filtering modes
 */
type SamplerFilter = unknown;

/**
 * Depth comparison functions
 */
type CompareFunction = unknown;