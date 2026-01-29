import { rgbaToArgbHex } from './rgbaToArgbHex';
import { TinyColor } from './TinyColor';

interface TinyColorInstance {
  r: number;
  g: number;
  b: number;
  a: number;
  gradientType?: number;
}

/**
 * Converts color values to Microsoft filter format for legacy IE support
 * @param startColor - The starting color
 * @param endColor - Optional ending color for gradients
 * @returns MS filter string
 */
export function toMsFilter(startColor: string, endColor?: string): string {
  const startColorInstance: TinyColorInstance = new TinyColor(startColor);
  const startColorHex = `#${rgbaToArgbHex(
    startColorInstance.r,
    startColorInstance.g,
    startColorInstance.b,
    startColorInstance.a
  )}`;
  
  let endColorHex = startColorHex;
  const gradientType = startColorInstance.gradientType 
    ? 'GradientType = 1, ' 
    : '';

  if (endColor) {
    const endColorInstance: TinyColorInstance = new TinyColor(endColor);
    endColorHex = `#${rgbaToArgbHex(
      endColorInstance.r,
      endColorInstance.g,
      endColorInstance.b,
      endColorInstance.a
    )}`;
  }

  return `progid:DXImageTransform.Microsoft.gradient(${gradientType}startColorstr=${startColorHex}, endColorstr=${endColorHex})`;
}