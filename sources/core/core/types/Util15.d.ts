/**
 * Color temperature utility module
 * Provides temperature to RGBA color mapping functionality
 */

/**
 * Temperature values in Kelvin
 */
type TemperatureValue = 2000 | 2500 | 3000 | 3500 | 4000 | 4500 | 5000 | 5500 | 6000 | 6500;

/**
 * RGBA color array [red, green, blue, alpha]
 */
type RGBAColor = [number, number, number, number];

/**
 * Color temperature mapping interface
 */
interface ColorTemperatureMap {
  [key: number]: RGBAColor;
}

/**
 * Color temperature lookup table
 * Maps Kelvin temperature values to RGBA color arrays
 */
declare const COLOR_TEMPERATURE_MAP: ColorTemperatureMap;

/**
 * Array of supported temperature values
 */
declare const TEMPERATURE_VALUES: TemperatureValue[];

/**
 * Converts color temperature to RGBA color
 * 
 * @param temperature - Temperature in Kelvin (2000K - 6500K)
 * @returns RGBA color array corresponding to the temperature
 * 
 * @remarks
 * This function maps color temperature values to their corresponding RGBA representations.
 * Values outside the supported range will be clamped to the nearest valid temperature.
 * 
 * @example
 * ```typescript
 * // Get color for 3000K (warm white)
 * const warmWhite = getNearestTemperatureColor(3000);
 * // Returns: [255, 180, 107, 255]
 * 
 * // Get color for 4000K (neutral white)
 * const neutralWhite = getNearestTemperatureColor(4000);
 * // Returns: [255, 209, 163, 255]
 * 
 * // Get color for 6500K (daylight)
 * const daylight = getNearestTemperatureColor(6500);
 * // Returns: [255, 249, 253, 255]
 * 
 * // String input will be parsed
 * const color = getNearestTemperatureColor("5000");
 * 
 * // Out of range values are clamped
 * const clamped = getNearestTemperatureColor(1000); // Clamps to 2000K
 * ```
 */
declare function getNearestTemperatureColor(temperature: number | string): RGBAColor;

export { getNearestTemperatureColor, ColorTemperatureMap, RGBAColor, TemperatureValue, COLOR_TEMPERATURE_MAP, TEMPERATURE_VALUES };