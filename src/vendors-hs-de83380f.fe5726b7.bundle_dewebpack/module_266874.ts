import { bound01, pad2 } from './util';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

/**
 * Converts a decimal alpha value (0-1) to a hexadecimal string (00-FF)
 */
export function convertDecimalToHex(decimal: number): string {
  return Math.round(255 * parseFloat(String(decimal))).toString(16);
}

/**
 * Converts a hexadecimal string to a decimal value (0-1)
 */
export function convertHexToDecimal(hex: string): number {
  return parseIntFromHex(hex) / 255;
}

/**
 * Converts HSL color values to RGB
 * @param hue - Hue value (0-360)
 * @param saturation - Saturation value (0-100)
 * @param lightness - Lightness value (0-100)
 * @returns RGB color object with values 0-255
 */
export function hslToRgb(hue: number, saturation: number, lightness: number): RGB {
  let red: number;
  let green: number;
  let blue: number;

  const normalizedHue = bound01(hue, 360);
  const normalizedSaturation = bound01(saturation, 100);
  const normalizedLightness = bound01(lightness, 100);

  if (normalizedSaturation === 0) {
    red = normalizedLightness;
    green = normalizedLightness;
    blue = normalizedLightness;
  } else {
    const q = normalizedLightness < 0.5
      ? normalizedLightness * (1 + normalizedSaturation)
      : normalizedLightness + normalizedSaturation - normalizedLightness * normalizedSaturation;
    const p = 2 * normalizedLightness - q;

    red = hueToRgb(p, q, normalizedHue + 1 / 3);
    green = hueToRgb(p, q, normalizedHue);
    blue = hueToRgb(p, q, normalizedHue - 1 / 3);
  }

  return {
    r: 255 * red,
    g: 255 * green,
    b: 255 * blue
  };
}

/**
 * Converts HSV color values to RGB
 * @param hue - Hue value (0-360)
 * @param saturation - Saturation value (0-100)
 * @param value - Value/Brightness (0-100)
 * @returns RGB color object with values 0-255
 */
export function hsvToRgb(hue: number, saturation: number, value: number): RGB {
  const normalizedHue = 6 * bound01(hue, 360);
  const normalizedSaturation = bound01(saturation, 100);
  const normalizedValue = bound01(value, 100);

  const hueFloor = Math.floor(normalizedHue);
  const hueFraction = normalizedHue - hueFloor;
  const p = normalizedValue * (1 - normalizedSaturation);
  const q = normalizedValue * (1 - hueFraction * normalizedSaturation);
  const t = normalizedValue * (1 - (1 - hueFraction) * normalizedSaturation);
  const sector = hueFloor % 6;

  const rValues = [normalizedValue, q, p, p, t, normalizedValue];
  const gValues = [t, normalizedValue, normalizedValue, q, p, p];
  const bValues = [p, p, t, normalizedValue, normalizedValue, q];

  return {
    r: 255 * rValues[sector],
    g: 255 * gValues[sector],
    b: 255 * bValues[sector]
  };
}

/**
 * Converts a packed 24-bit RGB number to an RGB object
 * @param packedColor - RGB color packed as integer (0xRRGGBB)
 */
export function numberInputToObject(packedColor: number): RGB {
  return {
    r: packedColor >> 16,
    g: (packedColor & 0xFF00) >> 8,
    b: packedColor & 0xFF
  };
}

/**
 * Parses a hexadecimal string to an integer
 */
export function parseIntFromHex(hex: string): number {
  return parseInt(hex, 16);
}

/**
 * Converts RGB values to a hexadecimal color string
 * @param red - Red value (0-255)
 * @param green - Green value (0-255)
 * @param blue - Blue value (0-255)
 * @param allow3Char - Whether to allow 3-character hex shorthand
 * @returns Hexadecimal color string without # prefix
 */
export function rgbToHex(red: number, green: number, blue: number, allow3Char?: boolean): string {
  const hexComponents = [
    pad2(Math.round(red).toString(16)),
    pad2(Math.round(green).toString(16)),
    pad2(Math.round(blue).toString(16))
  ];

  if (
    allow3Char &&
    hexComponents[0].startsWith(hexComponents[0].charAt(1)) &&
    hexComponents[1].startsWith(hexComponents[1].charAt(1)) &&
    hexComponents[2].startsWith(hexComponents[2].charAt(1))
  ) {
    return hexComponents[0].charAt(0) + hexComponents[1].charAt(0) + hexComponents[2].charAt(0);
  }

  return hexComponents.join('');
}

/**
 * Converts RGB values to HSL
 * @param red - Red value (0-255)
 * @param green - Green value (0-255)
 * @param blue - Blue value (0-255)
 * @returns HSL color object with h (0-1), s (0-1), l (0-1)
 */
export function rgbToHsl(red: number, green: number, blue: number): HSL {
  const normalizedRed = bound01(red, 255);
  const normalizedGreen = bound01(green, 255);
  const normalizedBlue = bound01(blue, 255);

  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  if (max === min) {
    hue = 0;
    saturation = 0;
  } else {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case normalizedRed:
        hue = (normalizedGreen - normalizedBlue) / delta + (normalizedGreen < normalizedBlue ? 6 : 0);
        break;
      case normalizedGreen:
        hue = (normalizedBlue - normalizedRed) / delta + 2;
        break;
      case normalizedBlue:
        hue = (normalizedRed - normalizedGreen) / delta + 4;
        break;
    }
    hue /= 6;
  }

  return { h: hue, s: saturation, l: lightness };
}

/**
 * Converts RGB values to HSV
 * @param red - Red value (0-255)
 * @param green - Green value (0-255)
 * @param blue - Blue value (0-255)
 * @returns HSV color object with h (0-1), s (0-1), v (0-1)
 */
export function rgbToHsv(red: number, green: number, blue: number): HSV {
  const normalizedRed = bound01(red, 255);
  const normalizedGreen = bound01(green, 255);
  const normalizedBlue = bound01(blue, 255);

  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  let hue = 0;
  const value = max;
  const delta = max - min;
  const saturation = max === 0 ? 0 : delta / max;

  if (max === min) {
    hue = 0;
  } else {
    switch (max) {
      case normalizedRed:
        hue = (normalizedGreen - normalizedBlue) / delta + (normalizedGreen < normalizedBlue ? 6 : 0);
        break;
      case normalizedGreen:
        hue = (normalizedBlue - normalizedRed) / delta + 2;
        break;
      case normalizedBlue:
        hue = (normalizedRed - normalizedGreen) / delta + 4;
        break;
    }
    hue /= 6;
  }

  return { h: hue, s: saturation, v: value };
}

/**
 * Normalizes RGB values to 0-255 range
 */
export function rgbToRgb(red: number, green: number, blue: number): RGB {
  return {
    r: 255 * bound01(red, 255),
    g: 255 * bound01(green, 255),
    b: 255 * bound01(blue, 255)
  };
}

/**
 * Converts RGBA values to ARGB hexadecimal format
 * @param red - Red value (0-255)
 * @param green - Green value (0-255)
 * @param blue - Blue value (0-255)
 * @param alpha - Alpha value (0-1)
 * @returns ARGB hexadecimal string
 */
export function rgbaToArgbHex(red: number, green: number, blue: number, alpha: number): string {
  return [
    pad2(convertDecimalToHex(alpha)),
    pad2(Math.round(red).toString(16)),
    pad2(Math.round(green).toString(16)),
    pad2(Math.round(blue).toString(16))
  ].join('');
}

/**
 * Converts RGBA values to hexadecimal color string
 * @param red - Red value (0-255)
 * @param green - Green value (0-255)
 * @param blue - Blue value (0-255)
 * @param alpha - Alpha value (0-1)
 * @param allow4Char - Whether to allow 4-character hex shorthand
 * @returns RGBA hexadecimal string without # prefix
 */
export function rgbaToHex(
  red: number,
  green: number,
  blue: number,
  alpha: number,
  allow4Char?: boolean
): string {
  const hexComponents = [
    pad2(Math.round(red).toString(16)),
    pad2(Math.round(green).toString(16)),
    pad2(Math.round(blue).toString(16)),
    pad2(convertDecimalToHex(alpha))
  ];

  if (
    allow4Char &&
    hexComponents[0].startsWith(hexComponents[0].charAt(1)) &&
    hexComponents[1].startsWith(hexComponents[1].charAt(1)) &&
    hexComponents[2].startsWith(hexComponents[2].charAt(1)) &&
    hexComponents[3].startsWith(hexComponents[3].charAt(1))
  ) {
    return (
      hexComponents[0].charAt(0) +
      hexComponents[1].charAt(0) +
      hexComponents[2].charAt(0) +
      hexComponents[3].charAt(0)
    );
  }

  return hexComponents.join('');
}

/**
 * Helper function to convert hue to RGB component
 */
function hueToRgb(p: number, q: number, t: number): number {
  let normalizedT = t;

  if (normalizedT < 0) {
    normalizedT += 1;
  }
  if (normalizedT > 1) {
    normalizedT -= 1;
  }
  if (normalizedT < 1 / 6) {
    return p + 6 * normalizedT * (q - p);
  }
  if (normalizedT < 0.5) {
    return q;
  }
  if (normalizedT < 2 / 3) {
    return p + (q - p) * (2 / 3 - normalizedT) * 6;
  }
  return p;
}