/**
 * CIE LAB color space transformation utilities.
 * Provides conversion between XYZ and LAB color spaces.
 */

/** D65 standard illuminant X reference value */
declare const D65_X: 0.95047;

/** D65 standard illuminant Y reference value */
declare const D65_Y: 1.0;

/** D65 standard illuminant Z reference value */
declare const D65_Z: 1.08883;

/** CIE LAB epsilon constant (216/24389) */
declare const EPSILON: 0.20689655172413793;

/** CIE LAB kappa constant (24389/27) */
declare const KAPPA: 903.2962962962963;

/**
 * XYZ tristimulus values array [X, Y, Z]
 * Values typically normalized to D65 illuminant (Y = 1.0)
 */
export type XYZ = [x: number, y: number, z: number];

/**
 * CIE LAB color values array [L*, a*, b*]
 * - L*: Lightness (0-100)
 * - a*: Green-Red axis
 * - b*: Blue-Yellow axis
 */
export type LAB = [l: number, a: number, b: number];

/**
 * Converts XYZ tristimulus values to CIE LAB color space.
 * 
 * @param xyz - XYZ color values normalized to D65 illuminant
 * @returns LAB color values [L*, a*, b*]
 * 
 * @remarks
 * Uses D65 standard illuminant reference white point:
 * - X: 0.95047
 * - Y: 1.0
 * - Z: 1.08883
 * 
 * @example
 *