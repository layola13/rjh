/**
 * Text rendering module for PixiJS
 * Provides text rendering capabilities with advanced styling options
 */

/**
 * Text gradient fill types
 * Defines the direction of gradient fills for text
 */
export enum TEXT_GRADIENT {
  /** Vertical gradient from top to bottom */
  LINEAR_VERTICAL = 0,
  /** Horizontal gradient from left to right */
  LINEAR_HORIZONTAL = 1
}

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Font style options
 */
export type FontStyle = 'normal' | 'italic' | 'oblique';

/**
 * Font weight options
 */
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Text baseline options for vertical text alignment
 */
export type TextBaseline = 'alphabetic' | 'top' | 'hanging' | 'middle' | 'ideographic' | 'bottom';

/**
 * Line join style options
 */
export type LineJoin = 'miter' | 'round' | 'bevel';

/**
 * White space handling options
 */
export type WhiteSpace = 'normal' | 'pre' | 'pre-line' | 'nowrap';

/**
 * Fill color type - can be a string, number (hex), or gradient array
 */
export type TextFillStyle = string | number | string[] | number[] | CanvasGradient | CanvasPattern;

/**
 * Text style configuration interface
 * Defines all visual properties for text rendering
 */
export interface ITextStyle {
  /** Horizontal text alignment */
  align?: TextAlign;
  /** Whether to break words when wrapping */
  breakWords?: boolean;
  /** Enable drop shadow effect */
  dropShadow?: boolean;
  /** Drop shadow opacity (0-1) */
  dropShadowAlpha?: number;
  /** Drop shadow angle in radians */
  dropShadowAngle?: number;
  /** Drop shadow blur radius */
  dropShadowBlur?: number;
  /** Drop shadow color */
  dropShadowColor?: string | number;
  /** Drop shadow offset distance */
  dropShadowDistance?: number;
  /** Text fill color or gradient */
  fill?: TextFillStyle;
  /** Type of gradient fill */
  fillGradientType?: TEXT_GRADIENT;
  /** Gradient color stop positions (0-1) */
  fillGradientStops?: number[];
  /** Font family name(s) */
  fontFamily?: string | string[];
  /** Font size in pixels or CSS string */
  fontSize?: number | string;
  /** Font style (normal, italic, etc.) */
  fontStyle?: FontStyle;
  /** Font variant */
  fontVariant?: string;
  /** Font weight */
  fontWeight?: FontWeight;
  /** Letter spacing in pixels */
  letterSpacing?: number;
  /** Line height in pixels (0 = auto) */
  lineHeight?: number;
  /** Additional line spacing (leading) */
  leading?: number;
  /** Line join style for stroke */
  lineJoin?: LineJoin;
  /** Miter limit for stroke joins */
  miterLimit?: number;
  /** Padding around text in pixels */
  padding?: number;
  /** Stroke color */
  stroke?: string | number;
  /** Stroke thickness in pixels */
  strokeThickness?: number;
  /** Text baseline alignment */
  textBaseline?: TextBaseline;
  /** Whether to trim transparent pixels */
  trim?: boolean;
  /** White space handling mode */
  whiteSpace?: WhiteSpace;
  /** Enable word wrapping */
  wordWrap?: boolean;
  /** Maximum line width for word wrapping */
  wordWrapWidth?: number;
}

/**
 * Text style class that manages text rendering appearance
 * Handles all visual properties and generates canvas font strings
 */
export class TextStyle implements ITextStyle {
  /** Internal style version ID for change tracking */
  styleID: number;

  align: TextAlign;
  breakWords: boolean;
  dropShadow: boolean;
  dropShadowAlpha: number;
  dropShadowAngle: number;
  dropShadowBlur: number;
  dropShadowColor: string | number;
  dropShadowDistance: number;
  fill: TextFillStyle;
  fillGradientType: TEXT_GRADIENT;
  fillGradientStops: number[];
  fontFamily: string | string[];
  fontSize: number | string;
  fontStyle: FontStyle;
  fontVariant: string;
  fontWeight: FontWeight;
  letterSpacing: number;
  lineHeight: number;
  leading: number;
  lineJoin: LineJoin;
  miterLimit: number;
  padding: number;
  stroke: string | number;
  strokeThickness: number;
  textBaseline: TextBaseline;
  trim: boolean;
  whiteSpace: WhiteSpace;
  wordWrap: boolean;
  wordWrapWidth: number;

  /**
   * Creates a new TextStyle instance
   * @param style - Initial style properties
   */
  constructor(style?: Partial<ITextStyle>);

  /**
   * Creates a deep clone of this text style
   * @returns A new TextStyle instance with identical properties
   */
  clone(): TextStyle;

  /**
   * Resets all style properties to their default values
   */
  reset(): void;

  /**
   * Generates a CSS font string for canvas context
   * @returns CSS font string (e.g., "italic bold 26px Arial")
   */
  toFontString(): string;
}

/**
 * Font metrics calculated from measured text
 */
export interface IFontMetrics {
  /** Ascent height in pixels */
  ascent: number;
  /** Descent height in pixels */
  descent: number;
  /** Total font size (ascent + descent) */
  fontSize: number;
}

/**
 * Text metrics class that measures and stores text dimensions
 * Provides detailed information about rendered text layout
 */
export class TextMetrics {
  /** The measured text string */
  text: string;
  /** The style used for measurement */
  style: TextStyle;
  /** Total text width in pixels */
  width: number;
  /** Total text height in pixels */
  height: number;
  /** Array of text lines after wrapping */
  lines: string[];
  /** Width of each line in pixels */
  lineWidths: number[];
  /** Height of each line in pixels */
  lineHeight: number;
  /** Width of the longest line */
  maxLineWidth: number;
  /** Font metrics (ascent, descent, etc.) */
  fontProperties: IFontMetrics;

  /**
   * Shared canvas for text measurement
   * @internal
   */
  static _canvas: HTMLCanvasElement | OffscreenCanvas;
  
  /**
   * Shared 2D context for text measurement
   * @internal
   */
  static _context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  
  /**
   * Font metrics cache
   * @internal
   */
  static _fonts: Record<string, IFontMetrics>;
  
  /** String used for font metrics measurement */
  static METRICS_STRING: string;
  /** Character used for baseline calculation */
  static BASELINE_SYMBOL: string;
  /** Multiplier for baseline calculation */
  static BASELINE_MULTIPLIER: number;

  /**
   * Creates a TextMetrics instance
   * @param text - The measured text
   * @param style - The text style
   * @param width - Total width
   * @param height - Total height
   * @param lines - Text lines array
   * @param lineWidths - Width of each line
   * @param lineHeight - Height per line
   * @param maxLineWidth - Maximum line width
   * @param fontProperties - Font metrics
   */
  constructor(
    text: string,
    style: TextStyle,
    width: number,
    height: number,
    lines: string[],
    lineWidths: number[],
    lineHeight: number,
    maxLineWidth: number,
    fontProperties: IFontMetrics
  );

  /**
   * Measures text dimensions using the provided style
   * @param text - Text to measure
   * @param style - Text style to use
   * @param wordWrap - Override word wrap setting
   * @param canvas - Canvas to use for measurement
   * @returns TextMetrics instance with measurement results
   */
  static measureText(
    text: string,
    style: TextStyle,
    wordWrap?: boolean,
    canvas?: HTMLCanvasElement | OffscreenCanvas
  ): TextMetrics;

  /**
   * Applies word wrapping to text based on style settings
   * @param text - Text to wrap
   * @param style - Text style with wrap settings
   * @param canvas - Canvas for text measurement
   * @returns Wrapped text with newlines
   */
  static wordWrap(
    text: string,
    style: TextStyle,
    canvas?: HTMLCanvasElement | OffscreenCanvas
  ): string;

  /**
   * Measures font metrics for a given font string
   * @param font - CSS font string
   * @returns Font metrics (ascent, descent, fontSize)
   */
  static measureFont(font: string): IFontMetrics;

  /**
   * Clears the font metrics cache
   * @param font - Specific font to clear, or empty to clear all
   */
  static clearMetrics(font?: string): void;

  /**
   * Checks if a character is a newline
   * @internal
   */
  static isNewline(char: string): boolean;

  /**
   * Checks if a character is a breaking space
   * @internal
   */
  static isBreakingSpace(char: string): boolean;

  /**
   * Tokenizes text into words and spaces
   * @internal
   */
  static tokenize(text: string): string[];

  /**
   * Checks if words can be broken
   * @internal
   */
  static canBreakWords(text: string, breakWords: boolean): boolean;

  /**
   * Checks if characters can be broken between
   * @internal
   */
  static canBreakChars(
    char: string,
    nextChar: string,
    token: string,
    index: number,
    breakWords: boolean
  ): boolean;

  /**
   * Splits a word into breakable segments
   * @internal
   */
  static wordWrapSplit(text: string): string[];
}

/**
 * Text sprite class that renders text using canvas
 * Extends Sprite to display rendered text as a texture
 */
export class Text extends PIXI.Sprite {
  /**
   * The canvas element used for text rendering
   */
  canvas: HTMLCanvasElement;

  /**
   * The 2D rendering context for the canvas
   */
  context: CanvasRenderingContext2D;

  /**
   * The resolution / device pixel ratio for text rendering
   */
  resolution: number;

  /**
   * The text content to display
   */
  text: string;

  /**
   * The text style configuration
   */
  style: TextStyle | Partial<ITextStyle>;

  /**
   * Creates a new Text instance
   * @param text - The text to display
   * @param style - Text style options
   * @param canvas - Optional canvas element (creates one if not provided)
   */
  constructor(
    text?: string,
    style?: Partial<ITextStyle> | TextStyle,
    canvas?: HTMLCanvasElement
  );

  /**
   * Gets the width of the Text object
   */
  get width(): number;
  set width(value: number);

  /**
   * Gets the height of the Text object
   */
  get height(): number;
  set height(value: number);

  /**
   * Renders the text to the canvas texture
   * @param respectDirty - Whether to skip rendering if not dirty
   */
  updateText(respectDirty?: boolean): void;

  /**
   * Updates the texture from the canvas
   */
  updateTexture(): void;

  /**
   * Draws text with letter spacing applied
   * @param text - Text to draw
   * @param x - X position
   * @param y - Y position
   * @param isStroke - Whether this is a stroke pass
   * @internal
   */
  drawLetterSpacing(
    text: string,
    x: number,
    y: number,
    isStroke?: boolean
  ): void;

  /**
   * Generates a canvas gradient for multi-color fills
   * @internal
   */
  private _generateFillStyle(
    style: TextStyle,
    lines: string[],
    metrics: TextMetrics
  ): string | CanvasGradient;

  /**
   * Style change event handler
   * @internal
   */
  private _onStyleChange(): void;
}