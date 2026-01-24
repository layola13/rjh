/**
 * Color management module for handling textures, colors, and visual properties
 * of UI elements like bars, beads, glass, and hardware components.
 */

/**
 * Serialized color data structure for persistence
 */
interface ColorDataJSON {
  /** Bar normal texture (URL or color string) */
  bn: string;
  /** Bead normal texture (URL or color string) */
  ben: string;
  /** Glass color or texture */
  g: string | HTMLImageElement;
  /** Hardware color or texture */
  hd: string | HTMLImageElement;
}

/**
 * Shape color configuration interface
 */
interface ShapeColor {
  /** Default bar normal texture */
  barNormal: string | HTMLImageElement;
  /** Default bead normal texture */
  beadNormal: string | HTMLImageElement;
  /** Default glass color/texture */
  glass: string | HTMLImageElement;
  /** Default hardware/handle color/texture */
  handle: string | HTMLImageElement;
}

/**
 * Manages color properties and textures for visual components.
 * Handles serialization, deserialization, and color manipulation.
 */
export declare class ColorManager {
  /** Bar normal texture (color string or image) */
  barNormal: string | HTMLImageElement;
  
  /** Bead normal texture (color string or image) */
  beadNormal: string | HTMLImageElement;
  
  /** Glass color or texture */
  glass: string | HTMLImageElement;
  
  /** Hardware component color or texture */
  hardware: string | HTMLImageElement;

  /**
   * Constructs a new ColorManager with default ShapeColor values
   */
  constructor();

  /**
   * Computed bar shadow color.
   * Returns a darkened version of barNormal color or fallback to #DDD for images.
   * @readonly
   */
  get barShadow(): string;

  /**
   * Serializes the color manager state to a JSON-compatible object
   * @returns Serialized color data
   */
  toJSON(): ColorDataJSON;

  /**
   * Deserializes color data from a JSON object
   * @param data - Serialized color data
   * @param context - Context object passed to callback
   * @param callback - Optional callback invoked after texture loading
   */
  deserialize(
    data: ColorDataJSON | undefined,
    context: unknown,
    callback?: (context: unknown) => void
  ): void;

  /**
   * Converts a string (URL or color code) to a texture.
   * If the string is a URL, loads it as an HTMLImageElement with cache-busting.
   * @param textureString - URL or color string
   * @param onLoad - Callback invoked when image loads
   * @returns Original string or loaded HTMLImageElement
   */
  strToTexture(
    textureString: string,
    onLoad: () => void
  ): string | HTMLImageElement;

  /**
   * Converts a texture to its string representation.
   * Strips cache-busting query parameters from image URLs.
   * @param texture - Texture to convert
   * @returns String representation (URL without timestamp or color string)
   */
  textureToStr(texture: string | HTMLImageElement): string;

  /**
   * Lightens or darkens a hex color by a specified amount.
   * @param colorHex - Hex color string (with or without # prefix)
   * @param amount - Amount to adjust (-255 to 255, negative darkens, positive lightens)
   * @returns Adjusted hex color string
   */
  lightenDarkenColor(colorHex: string, amount: number): string;
}