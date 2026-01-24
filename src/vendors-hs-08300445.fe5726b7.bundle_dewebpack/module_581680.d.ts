/**
 * Common color picker components module
 * Provides reusable UI components for building color pickers
 * @module ColorPickerCommon
 */

/**
 * Alpha component - Controls transparency/opacity selection
 * Typically renders as a horizontal or vertical slider for adjusting alpha channel
 */
export { default as Alpha } from './Alpha';

/**
 * Checkboard component - Displays transparent background pattern
 * Shows a checkerboard pattern to visualize transparency behind colors
 */
export { default as Checkboard } from './Checkboard';

/**
 * EditableInput component - Text input for color values
 * Allows direct text entry of color values (hex, rgb, hsl, etc.)
 */
export { default as EditableInput } from './EditableInput';

/**
 * Hue component - Controls hue selection
 * Typically renders as a gradient slider spanning the full color spectrum (0-360°)
 */
export { default as Hue } from './Hue';

/**
 * Raised component - Container with elevation/shadow effect
 * Provides material design-style raised appearance for wrapping other components
 */
export { default as Raised } from './Raised';

/**
 * Saturation component - 2D saturation/brightness picker
 * Interactive area for selecting color saturation and brightness/value
 * Usually displayed as a square gradient from white to full saturation
 */
export { default as Saturation } from './Saturation';

/**
 * ColorWrap component - Higher-order component wrapper
 * Wraps color picker components with common functionality like:
 * - Color state management
 * - Format conversion
 * - Change handlers
 */
export { default as ColorWrap } from './ColorWrap';

/**
 * Swatch component - Displays a single color sample
 * Clickable color tile that can trigger color selection or display current color
 */
export { default as Swatch } from './Swatch';