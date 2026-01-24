/**
 * Two-tone color management module for icon systems.
 * Provides utilities to get and set primary/secondary colors for two-tone icons.
 * 
 * @module TwoToneColorUtils
 */

/**
 * Retrieves the current two-tone color configuration.
 * 
 * If colors have not been explicitly calculated/set, returns only the primary color as a string.
 * Otherwise, returns a tuple containing both primary and secondary colors.
 * 
 * @returns The primary color string if not calculated, or a tuple of [primaryColor, secondaryColor]
 * 
 * @example
 *