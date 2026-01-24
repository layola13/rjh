/**
 * ASCII Art and Digital Rain Post-Processing Effects Module
 * Provides texture generators and post-processing effects for ASCII art and digital rain (Matrix-style) visual effects
 */

import { BaseTexture, PostProcess, Texture, Scene, Engine, SerializationHelper, ShaderStore, Matrix } from '@babylonjs/core';

// ============================================================================
// Shader Definitions
// ============================================================================

/** ASCII Art fragment shader source code */
declare const ASCII_ART_PIXEL_SHADER: string;

/** Digital Rain fragment shader source code */
declare const DIGITAL_RAIN_PIXEL_SHADER: string;

// ============================================================================
// Types and Interfaces
// ============================================================================

/**
 * Configuration options for ASCII Art post-processing effect
 */
export interface AsciiArtPostProcessOptions {
  /** Font specification (e.g., "40px Monospace") */
  font?: string;
  
  /** Character set used for ASCII art rendering, ordered from darkest to brightest */
  characterSet?: string;
  
  /** Blend factor between ASCII art and tiled colors (0.0 = pure ASCII, 1.0 = pure tiles) */
  mixToTile?: number;
  
  /** Blend factor between effect and original image (0.0 = full effect, 1.0 = original) */
  mixToNormal?: number;
}

/**
 * Configuration options for Digital Rain post-processing effect
 */
export interface DigitalRainPostProcessOptions {
  /** Font specification (e.g., "15px Monospace") */
  font?: string;
  
  /** Blend factor between digital rain and tiled colors (0.0 = pure rain, 1.0 = pure tiles) */
  mixToTile?: number;
  
  /** Blend factor between effect and original image (0.0 = full effect, 1.0 = original) */
  mixToNormal?: number;
}

/**
 * Font measurement result containing height and vertical offset
 */
interface FontHeightInfo {
  /** Measured height of the font in pixels */
  height: number;
  
  /** Vertical offset from baseline in pixels */
  offset: number;
}

/**
 * Texture size dimensions
 */
interface TextureSize {
  /** Width in pixels */
  width: number;
  
  /** Height in pixels */
  height: number;
}

/**
 * Sampling mode constants for texture filtering
 */
declare enum SamplingMode {
  NEAREST_SAMPLINGMODE = 1,
  TRILINEAR_SAMPLINGMODE = 3
}

/**
 * Texture addressing mode constants
 */
declare enum AddressMode {
  CLAMP_ADDRESSMODE = 0
}

// ============================================================================
// ASCII Art Font Texture
// ============================================================================

/**
 * Generates a texture containing rendered characters for ASCII art effects.
 * Characters are arranged horizontally in a single row, rendered using specified font.
 */
export declare class AsciiArtFontTexture extends BaseTexture {
  /**
   * Font specification string (e.g., "40px Monospace")
   * @internal
   */
  private _font: string;
  
  /**
   * Character set string containing all characters to render
   * @internal
   */
  private _text: string;
  
  /**
   * Size of each character cell in pixels (width and height)
   * @internal
   */
  private _charSize: number;
  
  /**
   * Gets the character cell size in pixels
   */
  get charSize(): number;
  
  /**
   * Creates an ASCII art font texture
   * @param name - Unique identifier for the texture
   * @param font - Font specification string (e.g., "40px Monospace")
   * @param text - Character set to render in the texture
   * @param scene - Scene to attach the texture to
   */
  constructor(name: string, font: string, text: string, scene: Scene | null);
  
  /**
   * Measures the width of a character using the specified font
   * @param font - Font specification string
   * @returns Width in pixels
   * @internal
   */
  private _getFontWidth(font: string): number;
  
  /**
   * Measures the height and baseline offset of a font
   * @param font - Font specification string
   * @returns Font height information
   * @internal
   */
  private _getFontHeight(font: string): FontHeightInfo;
  
  /**
   * Creates a copy of this texture
   * @returns Cloned texture instance
   */
  clone(): AsciiArtFontTexture;
  
  /**
   * Deserializes a texture from JSON data
   * @param parsedTexture - Serialized texture data
   * @param scene - Scene to create the texture in
   * @returns Parsed texture instance
   */
  static Parse(parsedTexture: any, scene: Scene): AsciiArtFontTexture;
}

// ============================================================================
// ASCII Art Post Process
// ============================================================================

/**
 * Post-processing effect that converts rendered scene into ASCII art.
 * Analyzes luminance of tiles and maps them to characters based on brightness.
 */
export declare class AsciiArtPostProcess extends PostProcess {
  /**
   * Font texture containing rendered character set
   * @internal
   */
  private _asciiArtFontTexture: AsciiArtFontTexture;
  
  /**
   * Blend factor between ASCII art and tiled colors (0.0-1.0)
   */
  mixToTile: number;
  
  /**
   * Blend factor between effect and original image (0.0-1.0)
   */
  mixToNormal: number;
  
  /**
   * Creates an ASCII art post-processing effect
   * @param name - Unique identifier for the post-process
   * @param camera - Camera or render target to apply the effect to
   * @param options - Configuration options (font, character set, mix ratios) or font string
   */
  constructor(
    name: string,
    camera: any, // Camera or PostProcessOptions
    options?: AsciiArtPostProcessOptions | string
  );
}

// ============================================================================
// Digital Rain Font Texture
// ============================================================================

/**
 * Generates a texture containing rendered characters for digital rain effects.
 * Characters are arranged vertically in a single column (Matrix-style).
 */
export declare class DigitalRainFontTexture extends BaseTexture {
  /**
   * Font specification string (e.g., "15px Monospace")
   * @internal
   */
  private _font: string;
  
  /**
   * Character set string containing all characters to render
   * @internal
   */
  private _text: string;
  
  /**
   * Size of each character cell in pixels (width and height)
   * @internal
   */
  private _charSize: number;
  
  /**
   * Gets the character cell size in pixels
   */
  get charSize(): number;
  
  /**
   * Creates a digital rain font texture
   * @param name - Unique identifier for the texture
   * @param font - Font specification string (e.g., "15px Monospace")
   * @param text - Character set to render in the texture (typically Japanese characters)
   * @param scene - Scene to attach the texture to
   */
  constructor(name: string, font: string, text: string, scene: Scene | null);
  
  /**
   * Measures the width of a character using the specified font
   * @param font - Font specification string
   * @returns Width in pixels
   * @internal
   */
  private _getFontWidth(font: string): number;
  
  /**
   * Measures the height and baseline offset of a font
   * @param font - Font specification string
   * @returns Font height information
   * @internal
   */
  private _getFontHeight(font: string): FontHeightInfo;
  
  /**
   * Creates a copy of this texture
   * @returns Cloned texture instance
   */
  clone(): DigitalRainFontTexture;
  
  /**
   * Deserializes a texture from JSON data
   * @param parsedTexture - Serialized texture data
   * @param scene - Scene to create the texture in
   * @returns Parsed texture instance
   */
  static Parse(parsedTexture: any, scene: Scene): DigitalRainFontTexture;
}

// ============================================================================
// Digital Rain Post Process
// ============================================================================

/**
 * Post-processing effect that creates a Matrix-style "digital rain" effect.
 * Characters fall down the screen with green color gradient and glow.
 */
export declare class DigitalRainPostProcess extends PostProcess {
  /**
   * Font texture containing rendered character set
   * @internal
   */
  private _digitalRainFontTexture: DigitalRainFontTexture;
  
  /**
   * Blend factor between digital rain and tiled colors (0.0-1.0)
   */
  mixToTile: number;
  
  /**
   * Blend factor between effect and original image (0.0-1.0)
   */
  mixToNormal: number;
  
  /**
   * Animation speed multiplier (default: 0.003)
   */
  speed: number;
  
  /**
   * Creates a digital rain post-processing effect
   * @param name - Unique identifier for the post-process
   * @param camera - Camera or render target to apply the effect to
   * @param options - Configuration options (font, mix ratios) or font string
   */
  constructor(
    name: string,
    camera: any, // Camera or PostProcessOptions
    options?: DigitalRainPostProcessOptions | string
  );
}

// ============================================================================
// Module Exports
// ============================================================================

/**
 * Main module export containing all ASCII art and digital rain classes
 */
declare const PostProcessesLibrary: {
  AsciiArtFontTexture: typeof AsciiArtFontTexture;
  AsciiArtPostProcess: typeof AsciiArtPostProcess;
  DigitalRainFontTexture: typeof DigitalRainFontTexture;
  DigitalRainPostProcess: typeof DigitalRainPostProcess;
};

export default PostProcessesLibrary;

export {
  AsciiArtFontTexture,
  AsciiArtPostProcess,
  DigitalRainFontTexture,
  DigitalRainPostProcess
};