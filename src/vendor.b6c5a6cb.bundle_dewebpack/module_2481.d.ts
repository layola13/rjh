/**
 * Bitmap font and text rendering module
 * Provides functionality for rendering text using bitmap fonts loaded from font descriptor files
 */

import { Texture } from './texture';
import { Container } from './container';
import { ObservablePoint, Point, Rectangle } from './geometry';
import { Sprite } from './sprite';
import { LoaderResource } from './loader';

/**
 * Font alignment options
 */
export type BitmapFontAlign = 'left' | 'center' | 'right';

/**
 * Tint color value (24-bit RGB)
 */
export type TintColor = number;

/**
 * Character kerning information mapping character codes to offset values
 */
export interface CharacterKerning {
  [charCode: number]: number;
}

/**
 * Individual character glyph data within a bitmap font
 */
export interface BitmapFontCharacter {
  /** Horizontal offset when rendering the character */
  xOffset: number;
  /** Vertical offset when rendering the character */
  yOffset: number;
  /** Horizontal advance after rendering the character */
  xAdvance: number;
  /** Kerning adjustments for character pairs */
  kerning: CharacterKerning;
  /** Texture region containing the character glyph */
  texture: Texture;
  /** Font atlas page index containing this character */
  page: string | number;
}

/**
 * Character data dictionary mapping character codes to glyph information
 */
export interface BitmapFontCharacters {
  [charCode: number]: BitmapFontCharacter;
}

/**
 * Complete bitmap font data structure
 */
export interface BitmapFontData {
  /** Font face name */
  font: string;
  /** Base font size in pixels */
  size: number;
  /** Line height in pixels */
  lineHeight: number;
  /** Dictionary of all characters in the font */
  chars: BitmapFontCharacters;
}

/**
 * Font registry mapping font names to font data
 */
export interface BitmapFontRegistry {
  [fontName: string]: BitmapFontData;
}

/**
 * Font configuration options
 */
export interface BitmapFontOptions {
  /** Font name, optionally with size prefix (e.g., "32px FontName") */
  font?: string | BitmapFontDescriptor;
  /** Text alignment */
  align?: BitmapFontAlign;
  /** Tint color applied to text */
  tint?: TintColor;
}

/**
 * Font descriptor object
 */
export interface BitmapFontDescriptor {
  /** Font face name */
  name: string;
  /** Font size (number or parseable string) */
  size: number | string;
}

/**
 * Internal font configuration state
 */
interface FontState {
  /** Tint color */
  tint: TintColor;
  /** Text alignment */
  align: BitmapFontAlign;
  /** Font face name */
  name: string | null;
  /** Font size in pixels */
  size: number;
}

/**
 * Positioned glyph instance for text layout
 */
interface PositionedGlyph {
  /** Texture containing the glyph */
  texture: Texture;
  /** Line index in multi-line text */
  line: number;
  /** Character code */
  charCode: number;
  /** Position in text layout space */
  position: Point;
}

/**
 * A BitmapText displays text using a bitmap font.
 * Bitmap fonts consist of pre-rendered character glyphs stored in texture atlases.
 * 
 * @example
 *