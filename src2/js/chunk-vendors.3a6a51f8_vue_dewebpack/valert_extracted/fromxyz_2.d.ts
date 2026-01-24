/**
 * Transformation matrices and functions for converting between sRGB and XYZ color spaces.
 * 
 * The XYZ color space is a device-independent representation of color defined by the
 * International Commission on Illumination (CIE). This module provides bidirectional
 * conversion between sRGB (packed as 24-bit integers) and XYZ tristimulus values.
 * 
 * @module transformSRGB
 */

/**
 * Represents a color in XYZ color space as an array of three numbers [X, Y, Z].
 * Each component typically ranges from 0 to 1, representing tristimulus values.
 */
type XYZColor = [number, number, number];

/**
 * Represents a color in sRGB color space as a packed 24-bit integer.
 * Format: 0xRRGGBB where RR, GG, BB are 8-bit color channels (0-255).
 */
type RGBInteger = number;

/**
 * Converts a color from XYZ color space to sRGB color space (packed integer format).
 * 
 * Applies the XYZ to linear RGB transformation matrix, then applies the sRGB
 * gamma correction curve, and finally packs the result into a 24-bit integer.
 * 
 * @param xyz - The input color in XYZ color space [X, Y, Z]
 * @returns The color as a packed 24-bit integer in format 0xRRGGBB
 * 
 * @example
 *