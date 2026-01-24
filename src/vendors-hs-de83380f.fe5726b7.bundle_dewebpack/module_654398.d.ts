/**
 * Color readability and contrast utilities
 * Provides functions to calculate and validate WCAG color contrast ratios
 */

import { TinyColor } from './TinyColor';

/**
 * WCAG conformance levels
 */
type WCAGLevel = 'AA' | 'AAA';

/**
 * Text size categories for WCAG compliance
 */
type TextSize = 'small' | 'large';

/**
 * Options for readability checking
 */
interface ReadabilityOptions {
  /** WCAG conformance level (default: 'AA') */
  level?: WCAGLevel;
  /** Text size category (default: 'small') */
  size?: TextSize;
}

/**
 * Options for finding the most readable color
 */
interface MostReadableOptions extends ReadabilityOptions {
  /** Whether to include black/white fallback colors if no color passes (default: false) */
  includeFallbackColors?: boolean;
}

/**
 * Calculates the contrast ratio between two colors according to WCAG guidelines
 * 
 * @param color1 - First color (any valid color format)
 * @param color2 - Second color (any valid color format)
 * @returns Contrast ratio ranging from 1 to 21
 * 
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function readability(color1: any, color2: any): number {
  const firstColor = new TinyColor(color1);
  const secondColor = new TinyColor(color2);
  
  const luminance1 = firstColor.getLuminance();
  const luminance2 = secondColor.getLuminance();
  
  const lighterLuminance = Math.max(luminance1, luminance2);
  const darkerLuminance = Math.min(luminance1, luminance2);
  
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
}

/**
 * Checks if two colors meet WCAG readability standards
 * 
 * @param color1 - First color (typically background)
 * @param color2 - Second color (typically foreground/text)
 * @param options - Readability requirements
 * @returns True if the color combination passes WCAG standards
 * 
 * @example
 * isReadable('#000', '#fff', { level: 'AA', size: 'small' }); // true
 */
export function isReadable(
  color1: any,
  color2: any,
  options: ReadabilityOptions = { level: 'AA', size: 'small' }
): boolean {
  const contrastRatio = readability(color1, color2);
  
  const level = options.level ?? 'AA';
  const size = options.size ?? 'small';
  
  const combinedKey = `${level}${size}`;
  
  switch (combinedKey) {
    case 'AAsmall':
    case 'AAAlarge':
      return contrastRatio >= 4.5;
    
    case 'AAlarge':
      return contrastRatio >= 3;
    
    case 'AAAsmall':
      return contrastRatio >= 7;
    
    default:
      return false;
  }
}

/**
 * Finds the most readable color from a list against a base color
 * 
 * @param baseColor - The base color to compare against
 * @param colorList - Array of candidate colors
 * @param options - Options for readability checking and fallback behavior
 * @returns The most readable color, or black/white fallback if enabled
 * 
 * @example
 * mostReadable('#000', ['#fff', '#f00', '#0f0']); // Returns TinyColor('#fff')
 */
export function mostReadable(
  baseColor: any,
  colorList: any[],
  options: MostReadableOptions = {
    includeFallbackColors: false,
    level: 'AA',
    size: 'small'
  }
): TinyColor | null {
  let bestColor: TinyColor | null = null;
  let bestRatio = 0;
  
  const { includeFallbackColors, level, size } = options;
  
  for (const candidateColor of colorList) {
    const contrastRatio = readability(baseColor, candidateColor);
    
    if (contrastRatio > bestRatio) {
      bestRatio = contrastRatio;
      bestColor = new TinyColor(candidateColor);
    }
  }
  
  // Check if the best color meets readability standards
  if (isReadable(baseColor, bestColor, { level, size }) || !includeFallbackColors) {
    return bestColor;
  }
  
  // Recursively try with black and white fallbacks
  return mostReadable(baseColor, ['#fff', '#000'], {
    ...options,
    includeFallbackColors: false
  });
}