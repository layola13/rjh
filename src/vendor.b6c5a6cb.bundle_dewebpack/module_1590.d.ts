/**
 * Color matrix filter for advanced color transformations.
 * Applies a 5x4 color matrix to each pixel, allowing complex color manipulations
 * including brightness, contrast, saturation, hue rotation, and various preset effects.
 * 
 * @remarks
 * Based on @pixi/filter-color-matrix v5.2.4
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license
 */
export class ColorMatrixFilter extends Filter {
  /**
   * The 5x4 color transformation matrix.
   * Layout: [R, G, B, A, offset] for each output channel (RGBA).
   * Values [0-3] are multipliers, value [4] is the offset for each row.
   */
  matrix: Float32Array;

  /**
   * The alpha (opacity) blending factor for the filter effect.
   * - 0: Original image (no effect)
   * - 1: Full filter effect
   * @default 1
   */
  alpha: number;

  /**
   * Internal uniforms passed to the shader.
   * @internal
   */
  uniforms: {
    /** The color matrix array (20 elements) */
    m: Float32Array;
    /** Alpha blending factor */
    uAlpha: number;
  };

  constructor();

  /**
   * Loads a new color matrix, optionally multiplying it with the current matrix.
   * 
   * @param matrix - The 5x4 color matrix (20 elements: 4 channels × 5 values each)
   * @param multiply - If true, multiplies with the existing matrix; otherwise replaces it
   */
  private _loadMatrix(matrix: Float32Array | number[], multiply?: boolean): void;

  /**
   * Multiplies two 5x4 color matrices.
   * 
   * @param out - Output matrix to store the result
   * @param matrixA - First matrix
   * @param matrixB - Second matrix
   * @returns The resulting multiplied matrix
   */
  private _multiply(
    out: Float32Array,
    matrixA: Float32Array | number[],
    matrixB: Float32Array | number[]
  ): Float32Array;

  /**
   * Normalizes a color matrix by converting offset values from 0-255 range to 0-1 range.
   * 
   * @param matrix - The matrix to normalize
   * @returns A new normalized matrix
   */
  private _colorMatrix(matrix: Float32Array | number[]): Float32Array;

  /**
   * Adjusts the brightness of the image.
   * 
   * @param value - Brightness multiplier (1 = no change, >1 = brighter, <1 = darker)
   * @param multiply - If true, multiplies with existing matrix
   */
  brightness(value: number, multiply?: boolean): void;

  /**
   * Converts the image to greyscale with adjustable intensity.
   * 
   * @param scale - Greyscale intensity (0 = no effect, 1 = full greyscale)
   * @param multiply - If true, multiplies with existing matrix
   */
  greyscale(scale: number, multiply?: boolean): void;

  /**
   * Alias for greyscale method (American spelling).
   * 
   * @param scale - Greyscale intensity (0 = no effect, 1 = full greyscale)
   * @param multiply - If true, multiplies with existing matrix
   */
  grayscale(scale: number, multiply?: boolean): void;

  /**
   * Converts the image to pure black and white (no grey tones).
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  blackAndWhite(multiply?: boolean): void;

  /**
   * Rotates the hue of the image.
   * 
   * @param degrees - Rotation angle in degrees (0-360)
   * @param multiply - If true, multiplies with existing matrix
   */
  hue(degrees: number, multiply?: boolean): void;

  /**
   * Adjusts the contrast of the image.
   * 
   * @param amount - Contrast adjustment (0 = no change, >0 = more contrast, <0 = less contrast)
   * @param multiply - If true, multiplies with existing matrix
   */
  contrast(amount: number, multiply?: boolean): void;

  /**
   * Adjusts the saturation of the image.
   * 
   * @param amount - Saturation adjustment (0 = no change, >0 = more saturated, <0 = less saturated)
   * @param multiply - If true, multiplies with existing matrix
   * @default 0
   */
  saturate(amount?: number, multiply?: boolean): void;

  /**
   * Completely desaturates the image (equivalent to saturate(-1)).
   */
  desaturate(): void;

  /**
   * Inverts the colors of the image (negative effect).
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  negative(multiply?: boolean): void;

  /**
   * Applies a sepia tone effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  sepia(multiply?: boolean): void;

  /**
   * Applies a Technicolor film effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  technicolor(multiply?: boolean): void;

  /**
   * Applies a Polaroid camera effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  polaroid(multiply?: boolean): void;

  /**
   * Swaps red and blue channels (RGB to BGR).
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  toBGR(multiply?: boolean): void;

  /**
   * Applies a Kodachrome film effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  kodachrome(multiply?: boolean): void;

  /**
   * Applies a Browni vintage effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  browni(multiply?: boolean): void;

  /**
   * Applies a vintage photograph effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  vintage(multiply?: boolean): void;

  /**
   * Applies a two-tone color effect.
   * 
   * @param desaturation - Amount of desaturation for shadows
   * @param toned - Amount of toning
   * @param lightColor - Color for highlights (hex format)
   * @param darkColor - Color for shadows (hex format)
   * @param multiply - If true, multiplies with existing matrix
   * @default desaturation=0.2, toned=0.15, lightColor=0xFFE580, darkColor=0x338000
   */
  colorTone(
    desaturation?: number,
    toned?: number,
    lightColor?: number,
    darkColor?: number,
    multiply?: boolean
  ): void;

  /**
   * Applies a night vision effect.
   * 
   * @param intensity - Effect intensity
   * @param multiply - If true, multiplies with existing matrix
   * @default 0.1
   */
  night(intensity?: number, multiply?: boolean): void;

  /**
   * Applies a Predator thermal vision effect.
   * 
   * @param amount - Effect intensity
   * @param multiply - If true, multiplies with existing matrix
   */
  predator(amount: number, multiply?: boolean): void;

  /**
   * Applies a psychedelic LSD-like effect.
   * 
   * @param multiply - If true, multiplies with existing matrix
   */
  lsd(multiply?: boolean): void;

  /**
   * Resets the color matrix to identity (no effect).
   */
  reset(): void;
}

/**
 * Base Filter class from the rendering engine.
 * @internal
 */
declare class Filter {
  constructor(
    vertexShader: string,
    fragmentShader: string,
    uniforms?: Record<string, unknown>
  );
}