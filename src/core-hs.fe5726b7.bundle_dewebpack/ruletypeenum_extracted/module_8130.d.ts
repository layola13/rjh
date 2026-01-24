/**
 * Color temperature to RGBA color mapping utilities
 * Provides conversion from Kelvin temperature values to corresponding RGBA color arrays
 */

/**
 * RGBA color array: [Red, Green, Blue, Alpha]
 * Each component ranges from 0-255
 */
type RGBAColor = [number, number, number, number];

/**
 * Color temperature in Kelvin (K)
 * Valid range: 2000K - 6500K
 */
type TemperatureKelvin = number;

/**
 * Lookup table mapping color temperature (in Kelvin) to RGBA color values
 * Based on blackbody radiation color temperature standards
 * 
 * @remarks
 * - Range: 2000K (warm/red) to 6500K (cool/white)
 * - Step: 100K increments
 * - Alpha channel is always 255 (fully opaque)
 */
declare const COLOR_TEMPERATURE_MAP: Record<TemperatureKelvin, RGBAColor>;

/**
 * Array of available temperature values in ascending order
 * Used for finding the nearest temperature match
 */
declare const TEMPERATURE_VALUES: ReadonlyArray<TemperatureKelvin>;

/**
 * Finds the nearest color temperature and returns its corresponding RGBA color
 * 
 * @param temperature - Target color temperature in Kelvin (can be string or number)
 * @returns RGBA color array [R, G, B, A] corresponding to the nearest temperature
 * 
 * @remarks
 * - If exact temperature not found, returns closest available temperature
 * - Input can be string (will be parsed) or number
 * - Falls back to 2000K color if parsing fails
 * - Supports temperatures outside range by clamping to nearest boundary
 * 
 * @example
 *