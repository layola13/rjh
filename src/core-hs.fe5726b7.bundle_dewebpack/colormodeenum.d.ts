/**
 * ColorModeEnum type definition
 * 
 * Re-exports the ColorModeEnum from HSConstants.
 * This module provides color mode enumeration values for UI theming.
 */

/**
 * Enumeration representing available color modes
 * Typically includes values like 'light', 'dark', 'auto', etc.
 */
export declare const ColorModeEnum: typeof import('HSConstants').ColorModeEnum;

/**
 * Type alias for the ColorModeEnum values
 */
export declare type ColorModeEnum = typeof ColorModeEnum[keyof typeof ColorModeEnum];