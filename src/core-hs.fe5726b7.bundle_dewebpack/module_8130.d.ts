/**
 * Color temperature to RGBA color mapping utility
 * Converts temperature values (in Kelvin) to corresponding RGBA color values
 */

/**
 * RGBA color represented as a tuple of four values [R, G, B, A]
 * Each value ranges from 0-255
 */
export type RGBAColor = [number, number, number, number];

/**
 * Temperature value in Kelvin
 * Valid range: 2000K - 6500K
 */
export type TemperatureKelvin = number;

/**
 * Mapping of temperature values (in Kelvin) to their corresponding RGBA colors
 * Covers the range from warm (2000K) to cool white (6500K) in 100K increments
 */
export interface TemperatureColorMap {
  [temperature: number]: RGBAColor;
}

/**
 * Finds the nearest temperature value in the color map and returns its corresponding RGBA color
 * 
 * @param temperature - Temperature value in Kelvin (can be string or number)
 * @returns RGBA color array corresponding to the nearest temperature value
 * 
 * @remarks
 * - If the input temperature falls between two mapped values, returns the color of the closest temperature
 * - If parsing fails or input is invalid, returns the default color for 2000K
 * - Temperature range: 2000K (warm orange) to 6500K (pure white)
 * 
 * @example
 *