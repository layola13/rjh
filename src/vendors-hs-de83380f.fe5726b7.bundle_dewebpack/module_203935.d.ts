/**
 * Legacy IE gradient filter utilities for color conversion
 * @module toMsFilter
 */

import type { TinyColor } from './TinyColor';
import type { rgbaToArgbHex } from './colorConversion';

/**
 * Converts color(s) to a legacy Microsoft DirectX filter string for IE gradients.
 * 
 * @param startColor - The starting color of the gradient (or solid color)
 * @param endColor - Optional ending color for the gradient
 * @returns A DXImageTransform.Microsoft.gradient filter string
 * 
 * @example
 *