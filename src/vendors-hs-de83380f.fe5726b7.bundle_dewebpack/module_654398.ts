import { TinyColor } from './TinyColor';

interface ReadabilityOptions {
  level?: 'AA' | 'AAA';
  size?: 'small' | 'large';
}

interface MostReadableOptions extends ReadabilityOptions {
  includeFallbackColors?: boolean;
}

/**
 * Calculate the contrast ratio between two colors
 * @param color1 - First color
 * @param color2 - Second color
 * @returns Contrast ratio between 1 and 21
 */
export function readability(color1: string | TinyColor, color2: string | TinyColor): number {
  const firstColor = new TinyColor(color1);
  const secondColor = new TinyColor(color2);
  
  const maxLuminance = Math.max(firstColor.getLuminance(), secondColor.getLuminance());
  const minLuminance = Math.min(firstColor.getLuminance(), secondColor.getLuminance());
  
  return (maxLuminance + 0.05) / (minLuminance + 0.05);
}

/**
 * Check if two colors meet WCAG readability standards
 * @param color1 - First color
 * @param color2 - Second color
 * @param options - Readability options (level: AA/AAA, size: small/large)
 * @returns True if colors meet the specified standard
 */
export function isReadable(
  color1: string | TinyColor,
  color2: string | TinyColor,
  options: ReadabilityOptions = { level: 'AA', size: 'small' }
): boolean {
  const contrastRatio = readability(color1, color2);
  const level = options.level ?? 'AA';
  const size = options.size ?? 'small';
  const key = level + size;

  switch (key) {
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
 * Find the most readable color from a list against a base color
 * @param baseColor - Base color to compare against
 * @param colorList - List of colors to test
 * @param options - Options including WCAG level, size, and fallback behavior
 * @returns The most readable color from the list
 */
export function mostReadable(
  baseColor: string | TinyColor,
  colorList: Array<string | TinyColor>,
  options: MostReadableOptions = {
    includeFallbackColors: false,
    level: 'AA',
    size: 'small'
  }
): TinyColor | null {
  let bestColor: TinyColor | null = null;
  let bestRatio = 0;
  const { includeFallbackColors, level, size } = options;

  for (const color of colorList) {
    const contrastRatio = readability(baseColor, color);
    if (contrastRatio > bestRatio) {
      bestRatio = contrastRatio;
      bestColor = new TinyColor(color);
    }
  }

  if (isReadable(baseColor, bestColor, { level, size }) || !includeFallbackColors) {
    return bestColor;
  }

  return mostReadable(baseColor, ['#fff', '#000'], {
    ...options,
    includeFallbackColors: false
  });
}